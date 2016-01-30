import Relay from 'react-relay';
import { toGlobalId } from 'graphql-relay';

export const MangaEditQueries = {
  vertex: (Component, { id }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('vertex', { id })}
      }
    }
  `,
  searchCreators: (Component) => Relay.QL`
    query {
      search {
        ${Component.getFragment('searchCreators')}
      }
    }
  `,
  searchGenres: (Component) => Relay.QL`
    query {
      search {
        ${Component.getFragment('searchGenres')}
      }
    }
  `
};

exports.prepareMangaEditParams = function (params, route) {
  return {
    id: toGlobalId('Manga', parseInt(params.id, 10)),
  };
}
