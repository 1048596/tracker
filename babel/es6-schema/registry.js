import mysql from '../config/mysql.js';

import { fromGlobalId } from 'graphql-relay';

const types = {};

export function registerType(type, endpoint, getItemOverride) {
  types[type.name] = type;
  return type;
}

export async function idFetcher(globalId, info) {
  const { type, id } = fromGlobalId(globalId);

  console.log(info.rootValue);

  let item;
  if (type === 'Chapter') {
    console.log(type);
    item = await mysql.getChapterById(id).then((value) => value[0]);
  } else if (type === 'Manga') {
    console.log(type);
    item = await mysql.getMangaById(id).then((value) => value[0]);
  } else if (type === 'Group') {
    console.log(type);
    item = await mysql.getGroupById(id).then((value) => value[0]);
  } else if (type === 'Creator') {
    console.log(type);
    item = await mysql.getArtistById(id).then((value) => value[0]);
  } else {
    console.log('Error: Type not detected.');
  }

  console.log({ graphql_type: type, ...item });
  return { graphql_type: type, ...item, rootValue: info.rootValue };
}

export function typeResolver(obj) {
  return types[obj.graphql_type];
}
