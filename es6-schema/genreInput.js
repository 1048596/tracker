import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType
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

import {registerType} from './registry';
/*
export const genreType = registerType(new GraphQLInputObjectType({
  name: 'Genre',
  fields: () => ({
    genre: {
      type: GraphQLString
    }
  })
}));*/
export const genreInput = new GraphQLInputObjectType({
  name: 'GenreInput',
  fields: () => ({
    __dataID__: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    }
  })
});
