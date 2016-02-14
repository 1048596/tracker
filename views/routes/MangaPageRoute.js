import Relay from 'react-relay';
import { toGlobalId } from 'graphql-relay';

export const MangaPageQueries = {
  vertex: (Component, { id }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('vertex', { id }) }
      }
    }
  `,
};

exports.prepareMangaPageParams = function (params, route) {
  return {
    id: toGlobalId('Manga', parseInt(params.id, 10)),
  };
}
