import Relay from 'react-relay';
import {
  fromGlobalId
} from 'graphql-relay';

class DeleteAuthorMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Node {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { deleteAuthor }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteAuthorPayload {
        viewer,
        deletedAuthorId
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'authors',
      deletedIDFieldName: 'deletedAuthorId'
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.viewer.id,
      creator_id: this.props.author.id
    };
  }
}

module.exports = DeleteAuthorMutation;

/*

getConfigs() {
  return [{
    type: 'REQUIRED_CHILDREN',
    children: [Relay.QL`
      fragment on DeleteAuthorPayload {
        deleteAuthor {
          id,
          creator_name
        }
      }
    `],
  }];
}

*/
