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

export const deleteGenreMutation = mutationWithClientMutationId({
  name: 'DeleteGenre',
  inputFields: {
    manga_id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    genre_id: {
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
    deletedGenreId: {
      type: GraphQLString,
      resolve: ({ genre_id }) => genre_id,
    }
  },
  mutateAndGetPayload: ({ manga_id, genre_id }) => {
    return mysql.deleteGenre(fromGlobalId(manga_id).id, fromGlobalId(genre_id).id).then((value) => {
      return {
        manga_id: manga_id,
        genre_id: genre_id
      };
    })
  }
});
