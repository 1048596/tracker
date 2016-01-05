import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
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
} from 'graphql-relay';

import { registerType } from './registry';

import { nodeInterface } from './node.js';

export const creatorType = registerType(new GraphQLObjectType({
  name: 'Creator',
  fields: () => ({
    id: globalIdField('Creator'),
    creator_name: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    birthdate: {
      type: GraphQLString,
    },
    descript: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
}));

export const { connectionType: creatorConnection, edgeType: creatorEdge } =
  connectionDefinitions({ name: 'Creator', nodeType: creatorType });
