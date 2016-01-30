import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Relay from 'react-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import queryString from 'query-string';
import { RelayRouter } from 'react-router-relay';
import cookie from 'cookie';
import { toGlobalId } from 'graphql-relay';

// Solo-pages
import Schell from './Schell.js';
import FeedPage from './pages/FeedPage.js';
import SubscriptionsPage from './pages/SubscriptionsPage.js';

// Manga page
import MangaPage from './pages/MangaPage.js';
import MangaIndex from './components/MangaIndex.js';
import MangaEdit from './components/MangaEdit.js';

// Group page
import GroupPage from './pages/GroupPage.js';

// Chapter page
import ChapterPage from './pages/ChapterPage.js';

// Tiny-pages
import Upload from './pages/Upload.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Authenticate from './pages/Authenticate.js';

// Test-page
import Test from './components/Test.js';

// Routes
import { MangaIndexQueries, prepareMangaIndexParams } from './routes/MangaIndexRoute.js';
import { FeedQueries, prepareFeedParams } from './routes/FeedRoute.js';
import { SubscriptionQueries, prepareSubscriptionParams } from './routes/SubscriptionRoute.js';
import { MangaEditQueries, prepareMangaEditParams } from './routes/MangaEditRoute.js';
import { UploadQueries } from './routes/UploadRoute.js';
import { AuthenticateQueries } from './routes/AuthenticateRoute.js';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:1337/graphql', {
    credentials: 'same-origin',
  })
);

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route path="/" component={Schell}>
      <IndexRoute
        component={FeedPage}
        queries={FeedQueries}
        queryParams={['page', 'limit']}
        prepareParams={prepareFeedParams}
      />
      <Route
        path="feed"
        component={FeedPage}
        queries={FeedQueries}
        queryParams={['page', 'limit']}
        prepareParams={prepareFeedParams}
      />
      <Route
        path="subscriptions"
        component={SubscriptionsPage}
        queries={SubscriptionQueries}
        queryParams={['page', 'limit']}
        prepareParams={prepareSubscriptionParams}
      />
    <Route path="upload" component={Upload} queries={UploadQueries}/>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="authenticate" component={Authenticate} queries={AuthenticateQueries}/>
      <Route
        path="manga/:id"
        component={MangaPage}
      >
        <IndexRoute
          component={MangaIndex}
          queries={MangaIndexQueries}
          queryParams={['page', 'limit']}
          prepareParams={prepareMangaIndexParams}
        />
        <Route
          path="edit"
          component={MangaEdit}
          queries={MangaEditQueries}
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
