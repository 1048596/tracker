import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import path from 'path';
import moment from 'moment';

import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';

import ChapterItem from './ChapterItem.js';

class GroupIndex extends React.Component {
  render() {
    return (
      <div>
        <div className="info clearfix">
          <table className="info-column-left">
            <tbody>
              <tr>
                <td>Name: </td>
                <td className="info-row">{this.props.vertex.group_name}</td>
              </tr>
              <tr>
                <td>Description: </td>
                <td className="info-row">{this.props.vertex.descript}</td>
              </tr>
              <tr>
                <td>Created: </td>
                <td className="info-row">{moment(moment.utc(this.props.vertex.created).toDate()).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
            </tbody>
          </table>
          <table className="info-column-right">
            <tbody>
              <tr>
                <td>Total manga: </td>
                <td className="info-row">
                  {this.props.vertex.manga_count}
                </td>
              </tr>
              <tr>
                <td>Total chapters: </td>
                <td className="info-row">
                  {this.props.vertex.chapter_count}
                </td>
              </tr>
              <tr>
                <td>Total members: </td>
                <td className="info-row">
                  {this.props.vertex.member_count}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="chapter-list">
          <tbody>
            {this.props.vertex.chapters.edges.map((edge, i) => {
              return (
                <ChapterItem key={i} {...edge.node} />
              );
            })}
          </tbody>
        </table>
        {this.props.vertex.id}: {this.props.vertex.group_name}

        <br></br>{this.props.vertex.descript}
        <br></br>Created on: {this.props.vertex.created}
      </div>
    );
  }
}

var Container = Relay.createContainer(GroupIndex, {
  initialVariables: {
    id: null,
    page: null,
    limit: null
  },
  fragments: {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Group {
          group_name,
          descript,
          created,
          edited,
          chapter_count,
          manga_count,
          member_count,
          members (first: 100) {
            edges {
              node {
                id,
                username
              }
            }
          }
          currentPermission {
            permission_initial,
            permission_value
          },
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
                created,
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
