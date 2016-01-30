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

import mysql from '../../config/mysql.js';
import { mangaType } from '../types/mangaType.js';

export const deleteAuthorMutation = mutationWithClientMutationId({
  name: 'DeleteAuthor',
  inputFields: {
    manga_id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    creator_id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    vertex: {
      type: mangaType,
      resolve: ({ manga_id }) => {
        return mysql.getMangaById(fromGlobalId(manga_id).id).then((value) => {
          return value[0];
        });
      }
    },
    deletedAuthorId: {
      type: GraphQLInt,
      resolve: ({ creator_id }) => creator_id,
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
