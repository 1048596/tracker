import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import path from 'path';

import { fromGlobalId } from 'graphql-relay';

import { Link, IndexLink } from 'react-router';

class ChapterPage extends React.Component {
  render() {
    console.log(this.props.relay.variables);
    return (
      <div>
        {this.props.node.id}:{this.props.node.manga_title} - {this.props.node.chapter_title} ({this.props.node.chapter_number})
        <br></br>Created on: {this.props.node.created}
      </div>
    );
  }
}

var Container = Relay.createContainer(ChapterPage, {
  initialVariables: {
    id: null
  },
  fragments: {
    node: () => Relay.QL`
      fragment on Node {
        id,
        ... on Chapter {
          chapter_title,
          chapter_number,
          created,
        }
      }
    `
  }
});

module.exports = Container;
