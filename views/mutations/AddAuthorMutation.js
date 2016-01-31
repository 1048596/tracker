import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

class AddAuthorMutation extends Relay.Mutation {
  //static initialVariables = {
  //  maximum: FIRST_MAXIMUM
  //};
  static fragments = {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          authors (first: 1337) {
            edges {
              node {
                id,
                creator_name
              }
            }
          }
        }
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { addAuthor }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddAuthorPayload {
        vertex {
          authors
        },
        newAuthorEdge
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'vertex',
      parentID: this.props.vertex.id,
      connectionName: 'authors',
      edgeName: 'newAuthorEdge',
      rangeBehaviors: {
        '': 'append',
      }
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      creator_id: this.props.author.node.id
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      newAuthorEdge: this.props.author
    }
  }
}

module.exports = AddAuthorMutation;
