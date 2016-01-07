import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import Relay from 'react-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import queryString from 'query-string';
import { RelayRouter } from 'react-router-relay';
import cookie from 'cookie';

import { toGlobalId } from 'graphql-relay';

import Schell from './Schell.js';
import LatestFeed from './pages/LatestChaptersPage.js';
import SubscriptionsFeed from './pages/SubscriptionsPage.js';
import GroupPage from './pages/GroupPage.js';
import Upload from './Upload.js';
import Login from './Login.js';
import Register from './Register.js';
import Authenticate from './Authenticate.js';
import MangaPage from './MangaPage.js';
import ChapterPage from './ChapterPage.js';

import GroupInfo from './components/GroupInfo.js';


/*
function createRelayContainer(Component, props) {
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    return (
      <Relay.RootContainer
        Component={Component}
        renderFetched={(data) => <Component {...props} {...data} />}
        route={props.route.queries}
      />
    );
  } else {
    return <Component {...props}/>;
  }
}*/

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

function prepareMangaParams(params, route) {
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
  <RelayRouter history={createBrowserHistory()}>
    <Route path="/" component={Schell}>
      <IndexRoute
        component={LatestChaptersPage}
        queries={chapterRoute}
        queryParams={['page', 'limit']}
        prepareParams={prepareLatestChapterAndSubscriptionsParams}
      />
      <Route path="feed"
        component={LatestChaptersPage}
        queries={chapterRoute}
        queryParams={['page', 'limit']}
        prepareParams={prepareLatestChapterAndSubscriptionsParams}
      />
      <Route path="subscriptions"
        component={SubscriptionsFeed}
        queries={subscriptionChapterRoute}
        queryParams={['page', 'limit']}
        prepareParams={prepareLatestChapterAndSubscriptionsParams}
      />
      <Route path="upload" component={Upload} queries={chapterRoute}/>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="authenticate" component={Authenticate} queries={userRoute}/>
      <Route path="manga/:id" component={MangaPage}>
        <IndexRoute
          component={MangaInfo}
          queries={nodeIdPageAndLimitRoute}
          queryParams={['page', 'limit']}
          prepareParams={prepareMangaParams}
        />
        <Route path="edit"
          component={MangaEdit}
          
        />
      </Route>
      <Route path="chapter/:id"
        component={ChapterPage}
        queries={nodeIdRoute}
        prepareParams={prepareChapterParams}
      />
      <Route path="group/:id" component={GroupPage}>
        <IndexRoute
          component={GroupInfo}
          queries={nodeIdAndPageRoute}
          queryParams={['page', 'limit']}
          prepareParams={prepareGroupParams}
        />
      </Route>
    </Route>
  </RelayRouter>,
  document.getElementById('wrap')
);
