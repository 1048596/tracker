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
import { creatorEdge } from '../types/creatorType.js';

export const addArtistMutation = mutationWithClientMutationId({
  name: 'AddArtist',
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
    newArtistEdge: {
      type: creatorEdge,
      resolve: ({ manga_id, creator_id }) => {
        return new Promise((resolve, reject) => {
          mysql.getArtistsByMangaId(fromGlobalId(manga_id).id).then((artists) => {
            resolve(artists);
          });
        }).then((artists) => {
          //mysql.getAuthorById(fromGlobalId(creator_id).id).then((author) => {
          //});
          let offset;

          // Find offset to get cursor
          for (let i = 0; i < artists.length; i++) {
            if (artists[i].id == fromGlobalId(creator_id).id) {
              offset = i;
              break;
            }
          }

          return {
            cursor: cursorForObjectInConnection(artists, artists[offset]),
            node: artists[offset]
          };
        });
      }
    }
  },
  mutateAndGetPayload: ({ manga_id, creator_id }) => {
    return mysql.addArtist(fromGlobalId(manga_id).id, fromGlobalId(creator_id).id).then((value) => {
      return {
        manga_id: manga_id,
        creator_id: creator_id
      };
    })
  }
});
