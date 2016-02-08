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

export const permissionType = registerType(new GraphQLObjectType({
  name: 'Permission',
  fields: () => ({
    permission_initial: {
      type: GraphQLString
    },
    permission_value: {
      type: GraphQLString
    }
  })
}));
