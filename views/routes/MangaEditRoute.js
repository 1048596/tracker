export const MangaEditQueries = {
  node: (Component, { id }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('viewer', { id })}
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

expots.prepareMangaEditParams = function (params, route) {
  return {
    id: toGlobalId('Manga', parseInt(params.id, 10)),
  };
}
