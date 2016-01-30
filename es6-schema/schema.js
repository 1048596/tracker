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

// Types and connections
import { mangaConnection, mangaType } from './types/mangaType.js';
import { chapterConnection, chapterType, chapterEdge } from './types/chapterType.js';
import { groupConnection, groupType } from './types/groupType.js';
import { authorType } from './types/authorType.js';
import { artistType } from './types/artistType.js';
import { genreType } from './types/genreType.js';
import { creatorType, creatorConnection } from './types/creatorType.js';

// Mutations
import { deleteAuthorMutation } from './deleteAuthorMutation.js';

// All types, lists
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

var subscriptionChaptersType = new GraphQLObjectType({
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

var searchType = new GraphQLObjectType({
  name: 'Search',
  fields: () => ({
    creators: {
      type: new GraphQLList(creatorType),
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: (rootValue, args) => {
        return mysql.searchCreatorsByName(args.name).then((value) => {
          return value;
        });
      }
    },
    genres: {
      type: new GraphQLList(genreType),
      args: {
        genre: {
          type: GraphQLString
        }
      },
      resolve: (rootValue, args) => {
        return mysql.searchGenresByGenre(args.genre).then((value) => {
          return value
        });
      }
    }
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
      type: subscriptionChaptersType,
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
    search: {
      type: searchType,
      resolve: (rootValue) => {
        return {
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

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteAuthor: deleteAuthorMutation,
  },
});

var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = Schema;
