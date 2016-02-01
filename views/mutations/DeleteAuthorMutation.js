import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

class DeleteAuthorMutation extends Relay.Mutation {
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
    return Relay.QL`mutation { deleteAuthor }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteAuthorPayload {
        vertex,
        deletedAuthorId
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_DELETE',
      parentName: 'vertex',
      parentID: this.props.vertex.id,
      connectionName: 'authors',
      deletedIDFieldName: 'deletedAuthorId',
      pathToConnection: ['vertex', 'authors']
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      creator_id: this.props.creator_id
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      deletedAuthorId: this.props.creator_id
    }
  }
}

module.exports = DeleteAuthorMutation;
