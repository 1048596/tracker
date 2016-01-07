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

import mysql from '../config/mysql';

import {registerType} from './registry';

import {nodeInterface} from './node';
import {mangaType} from './mangaType';
import {groupConnection} from './groupType';

export const chapterType = registerType(new GraphQLObjectType({
  name: 'Chapter',
  fields: () => ({
    id: globalIdField('Chapter'),
    chapter_title: {
      type: GraphQLString,
    },
    chapter_number: {
      type: GraphQLInt,
    },
    manga_id: {
      type: GraphQLInt,
    },
    created: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    manga: {
      type: mangaType,
      resolve: (root) => {
        return mysql.getMangaById(root.manga_id).then((value) => {
          return value[0];
        });
      }
    },
    groups: {
      type: groupConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return mysql.getGroupsByChapterId(root.id).then((value) => {
          return connectionFromArray(value, args);
        });
      }
    }
  }),
  interfaces: [nodeInterface]
}));

export const {connectionType: chapterConnection, edgeType: chapterEdge} =
  connectionDefinitions({name: 'Chapter', nodeType: chapterType});
