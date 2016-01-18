import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  fromGlobalId,
  toGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  nodeDefinitions
} from 'graphql-relay';

import util from 'util';

import mysql from '../config/mysql.js';

import { nodeField }  from './node.js';

import { mangaConnection, mangaType } from './mangaType.js';
import { chapterConnection, chapterType, chapterEdge } from './chapterType.js';
import { groupConnection, groupType } from './groupType.js';
import { authorType } from './authorType.js';
import { artistType } from './artistType.js';
import { genreType } from './genreType.js';

import { authorInput} from './authorInput.js';
import { artistInput } from './artistInput.js';
import { genreInput } from './genreInput.js';

//All types, lists
var allChaptersType = new GraphQLObjectType({
  name: 'AllChapters',
  fields: () => ({
    _id: {
      type: GraphQLInt,
      resolve: ({_id}) => {
        return _id;
      }
    },
    chapters: {
      type: chapterConnection,
      args: {
        ...connectionArgs,
        page: {
          type: new GraphQLNonNull(GraphQLInt),
          defaultValue: 0
        },
      },
      resolve: ({ rootValue }, args) => {
        console.log('Get latest chapters.');
        return mysql.getLatestChaptersByPageAndLimit(args.page, args.first).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    }
  }),
});

var allMangasType = new GraphQLObjectType({
  name: 'AllMangas',
  fields: () => ({
    _id: {
      type: GraphQLInt,
      resolve: ({_id}) => {
        return _id;
      }
    },
    mangas: {
      type: mangaConnection,
      args: {
        ...connectionArgs,
        page: {
          type: new GraphQLNonNull(GraphQLInt),
          defaultValue: 0
        },
      },
      resolve: ({ rootValue }, args) => {
        console.log('Get mangas.');
        return mysql.getMangasByPage(args.page).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    }
  }),
});

var subscriptionChapters = new GraphQLObjectType({
  name: 'SubscriptionChapters',
  fields:() => ({
    _id: {
      type: GraphQLInt,
      resolve: ({ _id }) => {
        return _id;
      }
    },
    chapters: {
      type: chapterConnection,
      args: {
        ...connectionArgs,
        page: {
          type: new GraphQLNonNull(GraphQLInt),
          defaultValue: 0
        }
      },
      resolve: ({ rootValue }, args) => {
        if (rootValue.user) {
          return mysql.getSubChaptersByUsernameAndPage(rootValue.user.username, args.page).then((value) => {
            return connectionFromArray(value, args);
          });
        }
      }
    }
  })
});

var userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    username: {
      type: GraphQLString,
    },
  })
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    allChapters: {
      type: allChaptersType,
      resolve: (rootValue) => {
        return {
          _id: 1,
          rootValue: rootValue
        };
      }
    },
    subscriptionChapters: {
      type: subscriptionChapters,
      resolve: (rootValue) => {
        return {
          _id: 2,
          rootValue: rootValue
        };
      }
    },
    allMangas: {
      type: allMangasType,
      resolve: (rootValue) => {
        return {
          _id: 1,
          rootValue: rootValue
        }
      }
    },
    authenticate: {
      type: userType,
      resolve: (rootValue, args) => {
        if (rootValue.user) {
          console.log(rootValue);
          return { username: rootValue.user.username };
        } else {
          return { username: 'Not logged in'};
        }
      }
    },
  })
});

// Mutation
var addChapterMutation = mutationWithClientMutationId({
  name: 'AddChapter',
  inputFields: {
    chapter_title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    chapter_number: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    manga_title: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {/*
    newChapterEdge: {
      type: chapterEdge,
      resolve: ({ insertId, chapter_title, chapter_number, manga_title }) => {
        return mysql.getChaptersByMangaAndPage(manga_title, 0).then((chapters) => {
          return mysql.getChapterById(insertId).then((chapter) => {
            var position;

            console.log(chapter_title);
            console.log(chapter[0].manga_id);

            for (var i = 0; i < chapter.length; i++) {
              if (chapter[0].id == chapters[i].id) {
                position = i;
                console.log(position);
                break;
              }
            }

            return {
              cursor: cursorForObjectInConnection(chapters, chapters[position]),
              node: {
                id: insertId,
                chapter_title: chapter_title,
                chapter_number: parseInt(chapter_number),
                manga_id: chapter[0].manga_id,
                created: chapter[0].created,
                type: chapter[0].type
              }
            }
          });
        });
      }
    },
    allChapters: {
      type: allChaptersType,
      resolve: () => {
        return {_id: 1};
      }
    }*/
    uploadedChapter: {
      type: chapterType,
      resolve: ({ insertId, chapter_title, chapter_number }) => {
        return {
          id: insertId,
          chapter_title: chapter_title,
          chapter_number: chapter_number
        };
      }
    },
    allChapters: {
      type: allChaptersType,
      resolve: () => {
        return {_id: 1};
      }
    },
  },
  mutateAndGetPayload: (payload) => {
    return mysql.addChapter(payload.chapter_title, payload.chapter_number, payload.manga_title).then((value) => {
      console.log('Addded! ' + value.insertId);
      return {
        insertId: value.insertId,
        chapter_title: payload.chapter_title,
        chapter_number: payload.chapter_number,
      };
    });
  }
});

var updateMangaMutation = mutationWithClientMutationId({
  name: 'UpdateManga',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    manga_title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    descript: {
      type: GraphQLString
    },
    authors: {
      type: new GraphQLList(authorInput)
    },
    artists: {
      type: new GraphQLList(artistInput)
    },
    status: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    genres: {
      type: new GraphQLList(genreInput)
    },
  },
  outputFields: {
    updatedManga: {
      type: mangaType,
      resolve: ({ id, manga_title, descript, authors, artists, status, type, genres }) => {
        console.log('Output fields on updatedManga returning!');
        return {
          id: id,
          manga_title: manga_title,
          descript: descript,
          authors: authors,
          artists: artists,
          status: status,
          type: type,
          genres: genres
        };
      }
    }
  },
  mutateAndGetPayload: ({ id, manga_title, descript, authors, artists, status, type, genres }) => {
    return mysql.updateManga(id, manga_title, descript, authors, artists, status, type, genres).then((value) => {
      console.log('Updated: ' + manga_title);
      console.log(util.inspect(authors[0], false, null));
      return {
        id: id,
        manga_title: manga_title,
        descript: descript,
        authors: authors,
        artists: artists,
        status: status,
        type: type,
        genres: genres
      };
    });
  }
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChapter: addChapterMutation,
    updateManga: updateMangaMutation,
  },
});

var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = Schema;
