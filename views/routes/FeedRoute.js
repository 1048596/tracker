import queryString from 'query-string';
import cookie from 'cookie';

export const FeedQueries = {
  allChapters: () => Relay.QL`
    query {
      allChapters
    }
  `,
};

exports.prepareFeedParams = function (params, route) {
  let limit;

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
    page: params.page ? parseInt(params.page, 10) : 0,
    limit: limit
  };
}
