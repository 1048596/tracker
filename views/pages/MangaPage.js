import React from 'react';
import Relay from 'react-relay';
import { Link, IndexLink } from 'react-router';
import queryString from 'query-string';

import { fromGlobalId } from 'graphql-relay';

class MangaPage extends React.Component {
  /*
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
  */
  render() {
    /*
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
    */
    //Render this shit
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

module.exports = MangaPage;
