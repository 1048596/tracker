import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import path from 'path';

import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';

import ChapterItem from './ChapterItem';

class GroupPage extends React.Component {


  render() {
    let editLink;

    if (this.props.node.permission) {
      editLink = <Link to={this.props.location.pathname + '/edit'}>Edit</Link>
    }

    console.log(this.props.relay.variables);
    return (
      <div>
        {editLink}
        <table className="chapter-list">
          <tbody>
            {this.props.node.chapters.edges.map((edge, i) => {
              return (
                <ChapterItem key={i} {...edge.node} />
              );
            })}
          </tbody>
        </table>
        {this.props.node.id}: {this.props.node.group_name}

        <br></br>{this.props.node.descript}
        <br></br>Created on: {this.props.node.created}
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
