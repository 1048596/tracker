import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import path from 'path';

import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';

import ChapterItem from '../components/ChapterItem.js';


class GroupPage extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

var Container = Relay.createContainer(GroupPage, {
  initialVariables: {
    id: null,
    page: null
  },
  fragments: {
    node: () => Relay.QL`
      fragment on Node {
        id,
        ... on Group {
          group_name,
          descript,
          created,
          owner,
          permission,
          mangas (first: 100) {
            edges {
              node {
                id,
                manga_title
              }
            }
          },
          chapters (first: 100, page: $page) {
            edges {
              node {
                id,
                chapter_title,
                chapter_number,
                manga {
                  id,
                  manga_title
                },
                groups (first: 10) {
                  edges {
                    node {
                      id,
                      group_name
                    }
                  }
                }
              }
            },
          }
        }
      }
    `
  }
});

module.exports = Container;
