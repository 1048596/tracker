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
    owner: {
      type: GraphQLString
    },
    permission: {
      type: GraphQLString,
      resolve: (root) => {
        if (root.rootValue.user) {
          return mysql.getPermissionByGroupIdAndUsername(root.id, root.rootValue.user.username).then((value) => {
            return value[0].permission;
          });
        }
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
        return mysql.getChaptersByGroupIdAndPage(root.id, args.page).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    }
  }),
  interfaces: [nodeInterface]
}));

export const {connectionType: groupConnection, edgeType: groupEdge} =
  connectionDefinitions({name: 'Group', nodeType: groupType});
