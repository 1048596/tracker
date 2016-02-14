import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';

class ProfileIndex extends React.Component {
  render() {
    return (
      <div>
        <div className="side-bar">
        </div>
        <div></div>
      </div>
    );
  }
}

var Container = Relay.createContainer(ProfileIndex, {
  initialVariables: {
    id: null,
  },
  fragments: {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on User {
          username,
          permissions {
            id,
            permission
          }
        }
      }
    `
  }
});

module.exports = Container;
