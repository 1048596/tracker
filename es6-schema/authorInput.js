import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
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
} from 'graphql-relay';

import { registerType } from './registry';
/*
export const authorType = registerType(new GraphQLInputObjectType({
  name: 'Author',
  fields: () => ({
    creator_id: {
      type: GraphQLInt,
    },
    author_name: {
      type: GraphQLString,
    },
  }),
}));*/
export const authorInput = new GraphQLInputObjectType({
  name: 'AuthorInput',
  fields: () => ({
    __dataID__: {
      type: GraphQLString
    },
    creator_id: {
      type: GraphQLInt,
    },
    author_name: {
      type: GraphQLString,
    },
  }),
});
