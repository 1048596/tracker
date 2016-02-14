import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import path from 'path';
import moment from 'moment';

import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';
import PermissionTag from './PermissionTag';

class GroupMembers extends React.Component {
  render() {
    return (
      <div>
        <ul className="member-list">
          {this.props.vertex.members.edges.map((edge) => {
            return (
              <li className="member-item clearfix">
                <span className="member-avatar-container left">
                  <img className="member-avatar" src={'http://localhost:8080/avatar/uid_' + fromGlobalId(edge.node.id).id + '_profile'} />
                </span>
                <span className="member-username left">{edge.node.username}</span>
                <PermissionTag
                  permission={edge.node.permissions[0].permission}
                  />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

var Container = Relay.createContainer(GroupMembers, {
  initialVariables: {
    id: null,
    unbasedId: null
  },
  fragments: {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Group {
          group_name,
          member_count,
          members (first: 100) {
            edges {
              node {
                id,
                username,
                permissions (group_id: $unbasedId) {
                  id,
                  permission,
                  group {
                    id,
                    group_name
                  }
                }
              }
            }
          }
        }
      }
    `
  }
});

module.exports = Container;
