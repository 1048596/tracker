import {
  fromGlobalId,
  toGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

import mysql from '../config/mysql.js';

import { idFetcher, typeResolver } from './registry.js';

export const { nodeInterface, nodeField } = nodeDefinitions(
  idFetcher, typeResolver
);
