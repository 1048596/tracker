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
//import { creatorEdge } from '../types/creatorType.js';

export const updateMangaMutation = mutationWithClientMutationId({
  name: 'UpdateManga',
  inputFields: {
    manga_id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    manga_title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    descript: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    updatedManga: {
      type: GraphQLString,
      resolve: ({ manga_id }) => manga_id
    }
  },
  mutateAndGetPayload: ({ manga_id, manga_title, descript, status, type }) => {
    return mysql.updateManga(fromGlobalId(manga_id).id, manga_title, descript, status, type).then((value) => {
      return {
        manga_id: manga_id,
        manga_title: manga_title,
        descript: descript,
        status: status,
        type: type
      };
    })
  }
});
