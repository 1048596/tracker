import React from 'react';
import Relay from 'react-relay';
import { Link, IndexLink } from 'react-router';
import queryString from 'query-string';

import { fromGlobalId } from 'graphql-relay';

import ChapterItem from '../components/ChapterItem.js';
import PaginationButton from '../components/PaginationButton.js';


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

    if (this.props.node.chapters) {
      if (this.props.node.chapters.pageInfo.hasNextPage) {
        paginationButtonNext = <PaginationButton
            nextPage={true}
            onClick={this.nextPage.bind(this)}
            text="Next page"
            pathname={this.props.location.pathname}
            query={this.props.location.query}
          />;
      }

      mapChapters = this.props.node.chapters.edges.map((edge, i) => {
          return (
            <ChapterItem key={i} {...edge.node} />
          );
        });
    } else {
      console.log('This manga has no chapters :(.');
      mapChapters = <div>This manga has no chapters :(.</div>;
    }

    if (this.props.node.groups.edges.length > 0) {
      groups = this.props.node.groups.edges.map((edge, i) => {
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
                <td className="info-row">{this.props.node.manga_title}</td>
              </tr>
              <tr>
                <td>Author(s): </td>
                <td className="info-row">
                  {this.props.node.authors.map((author, i) => {
                    return (<span key={i} className="info-row-item">
                        <Link to={'/creator/' + author.creator_id}>
                          {author.author_name}
                        </Link>
                      </span>);
                  })}
                </td>
              </tr>
              <tr>
                <td>Artist(s): </td>
                <td className="info-row">
                  {this.props.node.artists.map((artist, i) => {
                    return (<span key={i} className="info-row-item">
                        <Link to={'/creator/' + artist.creator_id}>
                          {artist.artist_name}
                        </Link>
                      </span>);
                  })}
                </td>
              </tr>
              <tr>
                <td>Status: </td>
                <td className="info-row">{this.props.node.status}</td>
              </tr>
              <tr>
                <td>Type: </td>
                <td className="info-row">{this.props.node.type}</td>
              </tr>
            </tbody>
          </table>
          <table className="info-column-right">
            <tbody>
              <tr>
                <td>Genres: </td>
                <td className="info-row">
                  {this.props.node.genres.map((genre, i) => {
                    return <span className="info-row-item">{genre.genre}</span>;
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
                <td className="info-row">{this.props.node.chapter_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="info-column-bottom clearfix">
          <div className="cover">
            <img src={'/img/manga_cover_' + fromGlobalId(this.props.node.id).id + '.png'} />
          </div>
          <div className="description">
            <span>{this.props.node.descript}</span>
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
    limit: null
  },
  fragments: {
    node: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,
          created,
          genres {
            genre
          },
          type,
          status,
          chapter_count,
          authors {
            creator_id,
            author_name
          },
          artists {
            creator_id,
            artist_name
          }
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
                groups (first: 10) {
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
          groups (first: 10) {
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
