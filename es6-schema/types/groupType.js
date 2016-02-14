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
import { mangaConnection } from './mangaType';
import { chapterConnection } from './chapterType';
import { permissionType } from './permissionType';
import { userConnection } from './userType';

export const groupType = registerType(new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: globalIdField('Group'),
    group_name: {
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
    chapter_count: {
      type: GraphQLInt,
      resolve: (root) => {
        return mysql.getChapterCountByGroupId(root.id).then((value) => {
          return value[0].chapter_count;
        });
      }
    },
    manga_count: {
      type: GraphQLInt,
      resolve: (root) => {
        return mysql.getMangaCountByGroupId(root.id).then((value) => {
          return value[0].manga_count;
        });
      }
    },
    member_count: {
      type: GraphQLInt,
      resolve: (root) => {
        return mysql.getMemberCountByGroupId(root.id).then((value) => {
          return value[0].member_count;
        });
      }
    },
    members: {
      type: userConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return mysql.getUsersByGroupId(root.id).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    },
    mangas: {
      type: mangaConnection,
      args: connectionArgs,
        resolve: (root, args) => {
          return mysql.getMangasByGroupId(root.id).then((value) => {
            return connectionFromArray(value, args);
          });
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
      resolve: (root, args) => {
        return mysql.getChaptersByGroupIdAndPage(root.id, args.page, args.first).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    }
  }),
  interfaces: [nodeInterface]
}));

export const {connectionType: groupConnection, edgeType: groupEdge} =
  connectionDefinitions({name: 'Group', nodeType: groupType});
