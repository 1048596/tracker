export const MangaIndexQueries = {
  node: (Component, { id, page, limit }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('node', { id, page, limit }) }
      }
    }
  `,
};

exports.prepareMangaIndexParams = function (params, route) {
  let limit;

  // Set the limit cookie
  if (params.limit) {
    document.cookie = cookie.serialize('usr', 'limit=' + params.limit);
    limit = parseInt(params.limit, 10);
  } else if (document.cookie) {
    limit = parseInt(queryString.parse(cookie.parse(document.cookie).usr).limit, 10);
    console.log(limit);
  } else {
    document.cookie = cookie.serialize('usr', 'limit=50');
    limit = 50;
  }

  return {
    id: toGlobalId('Manga', parseInt(params.id, 10)),
    page: params.page ? parseInt(params.page, 10) : 0,
    limit: limit
  };
}
