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
    }
  }),
  interfaces: [nodeInterface]
}));

export const {connectionType: userConnection, edgeType: userEdge} =
  connectionDefinitions({name: 'User', nodeType: userType});
