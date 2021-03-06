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

import mysql from '../../config/mysql.js';

import { registerType } from '../registry';

import { nodeInterface } from '../node.js';
import { chapterConnection } from './chapterType';
import { groupConnection } from './groupType';
import { genreType, genreConnection } from './genreType';
import { creatorType, creatorConnection } from './creatorType';
import { typeType } from './typeType';
import { statusType } from './statusType';

export const mangaType = registerType(new GraphQLObjectType({
  name: 'Manga',
  fields: () => ({
    id: globalIdField('Manga'),
    manga_title: {
      type: GraphQLString
    },
    descript: {
      type: GraphQLString
    },
    created: {
      type: GraphQLString
    },
    edited: {
      type: GraphQLString
    },
    genres: {
      type: genreConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return mysql.getGenresByMangaId(root.id).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    },
    type: {
      type: typeType,
      resolve: (root) => {
        return mysql.getTypeByMangaId(root.id).then((value) => {
          return value[0];
        });
      }
    },
    status: {
      type: statusType,
      resolve: (root) => {
        return mysql.getStatusByMangaId(root.id).then((value) => {
          return value[0];
        });
      }
    },
    chapter_count: {
      type: GraphQLInt,
      resolve: (root) => {
        return mysql.getChapterCountByMangaId(root.id).then((value) => {
          return value[0].chapter_count;
        });
      }
    },
    authors: {
      type: creatorConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return mysql.getAuthorsByMangaId(root.id).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    },
    artists: {
      type: creatorConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return mysql.getArtistsByMangaId(root.id).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    },
    chapters: {
      type: chapterConnection,
      args: {
        ...connectionArgs,
        page: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, args) => {
        return mysql.getChaptersByMangaIdPageAndLimit(root.id, args.page, args.first).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    },
    groups: {
      type: groupConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return mysql.getGroupsByMangaId(root.id).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    }
  }),
  interfaces: [nodeInterface]
}));

export const {connectionType: mangaConnection, edgeType: mangaEdge} =
  connectionDefinitions({name: 'Manga', nodeType: mangaType});
