import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

//test

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  fromGlobalId,
  toGlobalId,
  globalIdField,
} from 'graphql-relay';

import mysql from '../config/mysql.js';

import { registerType } from './registry';

export const authorType = registerType(new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    creator_id: {
      type: GraphQLInt,
    },
    author_name: {
      type: GraphQLString,
    },
  }),
}));
