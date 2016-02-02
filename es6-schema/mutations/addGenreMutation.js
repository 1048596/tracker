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
import { genreEdge } from '../types/genreType.js';

export const addGenreMutation = mutationWithClientMutationId({
  name: 'AddGenre',
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
    newGenreEdge: {
      type: genreEdge,
      resolve: ({ manga_id, genre_id }) => {
        return new Promise((resolve, reject) => {
          mysql.getGenresByMangaId(fromGlobalId(manga_id).id).then((genres) => {
            resolve(genres);
          });
        }).then((genres) => {
          //mysql.getAuthorById(fromGlobalId(creator_id).id).then((author) => {
          //});
          let offset;

          // Find offset to get cursor
          for (let i = 0; i < genres.length; i++) {
            if (genres[i].id == fromGlobalId(genre_id).id) {
              offset = i;
              break;
            }
          }

          return {
            cursor: cursorForObjectInConnection(genres, genres[offset]),
            node: genres[offset]
          };
        });
      }
    }
  },
  mutateAndGetPayload: ({ manga_id, genre_id }) => {
    return mysql.addGenre(fromGlobalId(manga_id).id, fromGlobalId(genre_id).id).then((value) => {
      return {
        manga_id: manga_id,
        genre_id: genre_id
      };
    })
  }
});
