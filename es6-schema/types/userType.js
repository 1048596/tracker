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
import { nodeInterface } from '../node';

import { permissionType } from './permissionType';

export const userType = registerType(new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: GraphQLString
    },
    permissions: {
      type: new GraphQLList(permissionType),
      args: {
        group_id: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        if (args.group_id.length > 0) {
          console.log('Get single permission');
          return mysql.getPermissionByUserIdAndGroupId(root.id, args.group_id).then((value) => {
            return value;
          });
        } else {
          console.log('Get all permissions');
          return mysql.getPermissionsByUserId(root.id).then((value) => {
            return value;
          });
        }
      }
    }
  }),
  interfaces: [nodeInterface]
}));

export const {connectionType: userConnection, edgeType: userEdge} =
  connectionDefinitions({name: 'User', nodeType: userType});
