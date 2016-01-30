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

import util from 'util';

import mysql from '../config/mysql.js';

export const deleteAuthorMutation = mutationWithClientMutationId({
  name: 'DeleteAuthor',
  inputFields: {
    manga_id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    creator_id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  outputFields: {
    viewer: {
      type: mangaType,
      args: {
        id: new GraphQLNonNull(GraphQLID)
      },
      resolve: (rootValue, args) => {
        return mysql.getMangaById()
      }
    }
  },
  mutateAndGetPayload: ({ manga_id, creator_id }) => {
    return mysql.deleteAuthor(fromGlobalId(manga_id).id, fromGlobalId(creator_id).id).then((value) => {
      return {
        manga_id: manga_id,
        creator_id: creator_id
      };
    })
  }
});
