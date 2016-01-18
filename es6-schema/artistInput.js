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

import { registerType } from './registry';
/*
export const artistInputType = registerType(new GraphQLInputObjectType({
  name: 'Artist',
  fields: () => ({
    creator_id: {
      type: GraphQLInt,
    },
    artist_name: {
      type: GraphQLString,
    },
  }),
}));*/
export const artistInput = new GraphQLInputObjectType({
  name: 'ArtistInput',
  fields: () => ({
    __dataID__: {
      type: GraphQLString
    },
    creator_id: {
      type: GraphQLInt,
    },
    artist_name: {
      type: GraphQLString,
    },
  }),
});
