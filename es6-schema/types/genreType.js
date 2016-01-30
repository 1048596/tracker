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

import {registerType} from '../registry';

export const genreType = registerType(new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    }
  })
}));
