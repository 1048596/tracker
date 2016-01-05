import React from 'react';
import Relay from 'react-relay';
import { Link, IndexLink } from 'react-router';
import queryString from 'query-string';

import { fromGlobalId } from 'graphql-relay';

import ChapterItem from './ChapterItem.js';
import PaginationButton from './PaginationButton.js';

class SubscriptionChapters extends React.Component {
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

    if (this.props.location.query.page > 0) {
      paginationButtonPreivous = <PaginationButton
          nextPage={false}
          onClick={this.previousPage.bind(this)}
          text="Previous page"
          pathname={this.props.location.pathname}
          query={this.props.location.query}
        />;
    }

    if (this.props.subscriptionChapters.chapters) {
      if (this.props.subscriptionChapters.chapters.pageInfo.hasNextPage) {
        paginationButtonNext = <PaginationButton
            nextPage={true}
            onClick={this.nextPage.bind(this)}
            text="Next page"
            pathname={this.props.location.pathname}
            query={this.props.location.query}
          />;
      }

      mapChapters = this.props.subscriptionChapters.chapters.edges.map((edge, i) => {
          return (
            <ChapterItem key={i} {...edge.node} />
          );
        });

    } else {
      console.log('Not logged in m8.');
      mapChapters = <div>Login to see your chapters!</div>;
    }

    //Render this shit
    return (
      <div>
        This is the id: {this.props.subscriptionChapters._id}<br></br>
        Sub Chapters
        {mapChapters}
        <p>Page (Router query - page): {this.props.location.query.page}</p>
        <p>Page (Relay variable): {this.props.relay.variables.page}</p>
        {paginationButtonPreivous}
        {paginationButtonNext}
      </div>
    );
  }
}

var Container = Relay.createContainer(SubscriptionChapters, {
  initialVariables: {
    page: null
  },
  fragments: {
    subscriptionChapters: () => Relay.QL`
      fragment on SubscriptionChapters {
        _id,
        chapters (first: 2, page: $page) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id,
              chapter_title,
              chapter_number,
              manga_id,
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
