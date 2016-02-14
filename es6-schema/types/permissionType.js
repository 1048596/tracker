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
//import { nodeInterface } from '../node.js';
import { groupType } from './groupType';

export const permissionType = registerType(new GraphQLObjectType({
  name: 'Permission',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (root) => root.permission_id
    },
    permission: {
      type: GraphQLString,
      resolve: (root) => {
        return mysql.getPermissionById(root.permission_id).then((value) => {
          return value[0].permission;
        });
      }
    },
    group: {
      type: groupType,
      resolve: (root) => {
        return mysql.getGroupById(root.group_id).then((value) => {
          return value[0];
        });
      }
    }
  })
}));
