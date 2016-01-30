import React from 'react';
import Relay from 'react-relay';
import { Link, IndexLink } from 'react-router';
import queryString from 'query-string';

import { fromGlobalId } from 'graphql-relay';

import ChapterItem from '../components/ChapterItem.js';
import PaginationButton from '../components/PaginationButton.js';

class FeedPage extends React.Component {
  nextPage(event) {
    try {
      this.props.relay.setVariables({
        page: this.props.relay.variables.page + 1
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
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
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    catch(err) {
      console.log(err);
    }
  }
  render() {

    let paginationButtonPreivous;
    let paginationButtonNext;
    let separator;

    if (this.props.location.query.page > 0) {
      paginationButtonPreivous = <PaginationButton
          nextPage={false}
          onClick={this.previousPage.bind(this)}
          text="Previous page"
          pathname="/feed"
          query={this.props.location.query}
          className="left"
        />;
    }

    if (this.props.allChapters.chapters.pageInfo.hasNextPage) {
      paginationButtonNext = <PaginationButton
          nextPage={true}
          onClick={this.nextPage.bind(this)}
          text="Next page"
          pathname="/feed"
          query={this.props.location.query}
          className="left"
        />;
    }

    if (paginationButtonNext && paginationButtonPreivous) {
      separator = <span className="separator"></span>;
    }

    //Render this shit
    return (
      <div className="container">
        <table className="chapter-list">
          <tbody>
            {this.props.allChapters.chapters.edges.map((edge, i) => {
              return (
                <ChapterItem key={i} {...edge.node} />
              );
            })}
          </tbody>
        </table>

        <p>Page (Router query - page): {this.props.location.query.page}</p>
        <p>Page (Relay variable): {this.props.relay.variables.page}</p>
        <div className="container">
          {paginationButtonPreivous}
          {separator}
          {paginationButtonNext}
        </div>
      </div>
    );
  }
}

var Container = Relay.createContainer(FeedPage, {
  initialVariables: {
    page: null,
    limit: null
  },
  fragments: {
    allChapters: () => Relay.QL`
      fragment on AllChapters {
        _id,
        chapters (first: $limit, page: $page) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id,
              chapter_title,
              chapter_number,
              manga_id,
              created
              manga {
                id,
                manga_title
              },
              groups (first: 7) {
                edges {
                  node {
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
