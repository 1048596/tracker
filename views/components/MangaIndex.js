import React from 'react';
import Relay from 'react-relay';
import { Link, IndexLink } from 'react-router';
import queryString from 'query-string';

import { fromGlobalId } from 'graphql-relay';

import ChapterItem from '../components/ChapterItem.js';
import PaginationButton from '../components/PaginationButton.js';

import { FIRST_MAXIMUM } from '../../config/config.js';


class MangaIndex extends React.Component {
  nextPage(event) {
    try {
      this.props.relay.setVariables({
        page: this.props.relay.variables.page + 1
      });
    }
    catch(err) {
      console.log(err);
    }
  }
  previousPage(event) {
    try {
      this.props.relay.setVariables({
        page: this.props.relay.variables.page - 1
      });
    }
    catch(err) {
      console.log(err);
    }
  }
  render() {
    let paginationButtonPreivous;
    let paginationButtonNext;
    let mapChapters;
    let groups;

    if (this.props.location.query.page > 0) {
      paginationButtonPreivous = <PaginationButton
          nextPage={false}
          onClick={this.previousPage.bind(this)}
          text="Previous page"
          pathname={this.props.location.pathname}
          query={this.props.location.query}
        />;
    }

    if (this.props.vertex.chapters) {
      if (this.props.vertex.chapters.pageInfo.hasNextPage) {
        paginationButtonNext = <PaginationButton
            nextPage={true}
            onClick={this.nextPage.bind(this)}
            text="Next page"
            pathname={this.props.location.pathname}
            query={this.props.location.query}
          />;
      }

      mapChapters = this.props.vertex.chapters.edges.map((edge, i) => {
          return (
            <ChapterItem key={i} {...edge.node} />
          );
        });
    } else {
      console.log('This manga has no chapters :(.');
      mapChapters = <div>This manga has no chapters :(.</div>;
    }

    if (this.props.vertex.groups.edges.length > 0) {
      groups = this.props.vertex.groups.edges.map((edge, i) => {
          return <span className="info-row-item">{edge.node.group_name}</span>;
          });
    } else {
      groups = 'null';
    }

    //Render this shit
    return (
      <div>
        <div className="info clearfix">
          <table className="info-column-left">
            <tbody>
              <tr>
                <td>Title: </td>
                <td className="info-row">{this.props.vertex.manga_title}</td>
              </tr>
              <tr>
                <td>Author(s): </td>
                <td className="info-row">
                  {this.props.vertex.authors.edges.map((edge, i) => {
                    return (<span key={i} className="info-row-item">
                        <Link to={'/creator/' + edge.node.creator_id}>
                          {edge.node.creator_name}
                        </Link>
                      </span>);
                  })}
                </td>
              </tr>
              <tr>
                <td>Artist(s): </td>
                <td className="info-row">
                  {this.props.vertex.artists.edges.map((edge, i) => {
                    return (<span key={i} className="info-row-item">
                        <Link to={'/creator/' + edge.node.creator_id}>
                          {edge.node.creator_name}
                        </Link>
                      </span>);
                  })}
                </td>
              </tr>
              <tr>
                <td>Status: </td>
                <td className="info-row">{this.props.vertex.status.status}</td>
              </tr>
              <tr>
                <td>Type: </td>
                <td className="info-row">{this.props.vertex.type.type}</td>
              </tr>
            </tbody>
          </table>
          <table className="info-column-right">
            <tbody>
              <tr>
                <td>Genres: </td>
                <td className="info-row">
                  {this.props.vertex.genres.edges.map((edge, i) => {
                    return <span className="info-row-item">{edge.node.genre}</span>;
                    })}
                </td>
              </tr>
              <tr>
                <td>Groups: </td>
                <td className="info-row">
                  {groups}
                </td>
              </tr>
              <tr>
                <td>Total chapters: </td>
                <td className="info-row">{this.props.vertex.chapter_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="info-column-bottom clearfix">
          <div className="cover">
            <img src={'/img/manga_cover_' + fromGlobalId(this.props.vertex.id).id + '.png'} />
          </div>
          <div className="description">
            <span>{this.props.vertex.descript}</span>
          </div>
        </div>
        <table className="chapter-list">
          <tbody>
            {mapChapters}
          </tbody>
        </table>
        <p>Page (Router query - page): {this.props.location.query.page}</p>
        <p>Page (Relay variable): {this.props.relay.variables.page}</p>
        {paginationButtonPreivous}
        {paginationButtonNext}
      </div>
    );
  }
}

var Container = Relay.createContainer(MangaIndex, {
  initialVariables: {
    id: null,
    page: null,
    limit: null,
    maximum: FIRST_MAXIMUM
  },
  fragments: {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,
          created,
          chapter_count,
          genres (first: $maximum) {
            edges {
              node {
                id,
                genre
              }
            }
          },
          status {
            id,
            status
          },
          type {
            id,
            type
          },
          authors (first: $maximum) {
            edges {
              node {
                id,
                creator_name
              }
            }
          },
          artists (first: $maximum) {
            edges {
              node {
                id,
                creator_name
              }
            }
          },
          chapters (first: $limit, page: $page) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                id,
                chapter_title,
                chapter_number,
                created,
                groups (first: $maximum) {
                  edges {
                    node {
                      id,
                      group_name
                    }
                  }
                },
                manga {
                  id,
                  manga_title
                }
              }
            }
          },
          groups (first: $maximum) {
            edges {
              node {
                id,
                group_name
              }
            }
          }
        }
      }
    `
  }
});

module.exports = Container;
