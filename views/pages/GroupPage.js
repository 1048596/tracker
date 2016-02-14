import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';

class GroupPage extends React.Component {
  render() {
    return (
      <div>
        <Link to={{pathname: '/group/' + this.props.params.id + '/edit'}} activeClassName="active">Edit</Link>
        <Link to={{pathname: '/group/' + this.props.params.id + '/members'}} activeClassName="active">Members</Link>
        {this.props.children}
      </div>
    );
  }
}

module.exports = GroupPage;
