import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Relay from 'react-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import queryString from 'query-string';
import { RelayRouter } from 'react-router-relay';
import cookie from 'cookie';
import { toGlobalId } from 'graphql-relay';

// Views
import Schell from './Schell.js';
import LatestChaptersPage from './pages/LatestChaptersPage.js';
import SubscriptionsPage from './pages/SubscriptionsPage.js';

// Manga page
import MangaPage from './pages/MangaPage.js';
import MangaIndex from './components/MangaIndex.js';
import MangaEdit from './components/MangaEdit.js';

//Group page
import GroupPage from './pages/GroupPage.js';

//Chapter page
import ChapterPage from './pages/ChapterPage.js';

import Upload from './pages/Upload.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Authenticate from './pages/Authenticate.js';

import Test from './components/Test.js';

const chapterRoute = {
  allChapters: () => Relay.QL`
    query {
      allChapters
    }
  `,
};

const subscriptionChapterRoute = {
  subscriptionChapters: () => Relay.QL`
    query {
      subscriptionChapters
    }
  `,
};

const mangaRoute = {
  allMangas: (Component, { id, page }) => Relay.QL`
    query {
      allMangas {
        ${Component.getFragment('allMangas', { id, page }) }
      }
    }
  `,
};

const userRoute = {
  authenticate: () => Relay.QL`
    query {
      authenticate
    }
  `,
};

const nodeIdAndPageRoute = {
  node: (Component, { id, page }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('node', { id, page })}
      }
    }
  `,
};

const nodeIdPageAndLimitRoute = {
  node: (Component, { id, page, limit }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('node', { id, page, limit }) }
      }
    }
  `,
};

const nodeIdRoute = {
  node: (Component, { id }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('node', { id })}
      }
    }
  `,
};

const nodeIdAndSearchRoute = {
  node: (Component, { id }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('node', { id })}
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

function prepareMangaParams(params, route) {
  let limit;

  console.log(params);
  console.log('-----Route-----');
  console.log(route);
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

function prepareChapterParams(params, route) {
  console.log(params);
  return {
    id: toGlobalId('Chapter', parseInt(params.id, 10))
  };
}

function prepareGroupParams(params, route) {
  console.log(params);
  return {
    id: toGlobalId('Group', parseInt(params.id, 10)),
    page: params.page ? parseInt(params.page, 10) : 0,
  };
}
function prepareMangaEditParams(params, route) {
  console.log(params.id);
  return {
    id: toGlobalId('Manga', parseInt(params.id, 10)),
  };
}

function prepareLatestChapterAndSubscriptionsParams(params, route) {
  let limit;

  console.log(params);
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

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:1337/graphql', {
    credentials: 'same-origin',
  })
);

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route path="/" component={Schell}>
      <IndexRoute
        component={LatestChaptersPage}
        queries={chapterRoute}
        queryParams={['page', 'limit']}
        prepareParams={prepareLatestChapterAndSubscriptionsParams}
      />
      <Route
        path="feed"
        component={LatestChaptersPage}
        queries={chapterRoute}
        queryParams={['page', 'limit']}
        prepareParams={prepareLatestChapterAndSubscriptionsParams}
      />
      <Route
        path="subscriptions"
        component={SubscriptionsPage}
        queries={subscriptionChapterRoute}
        queryParams={['page', 'limit']}
        prepareParams={prepareLatestChapterAndSubscriptionsParams}
      />
      <Route path="upload" component={Upload} queries={chapterRoute}/>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="authenticate" component={Authenticate} queries={userRoute}/>
      <Route
        path="manga/:id"
        component={MangaPage}
      >
        <IndexRoute
          component={MangaIndex}
          queries={nodeIdPageAndLimitRoute}
          queryParams={['page', 'limit']}
          prepareParams={prepareMangaParams}
        />
        <Route
          path="edit"
          component={MangaEdit}
          queries={nodeIdAndSearchRoute}
          prepareParams={prepareMangaEditParams}
        />
      </Route>
      <Route
        path="test"
        component={Test}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('wrap')
);
