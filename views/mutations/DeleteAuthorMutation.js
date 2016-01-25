import Relay from 'react-relay';

class DeleteAuthorMutation extends Relay.Mutation {
  static fragments = {
    manga: () => Relay.QL`
      fragment on Manga {
        id,
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { deleteAuthor }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteAuthorPayload {
        deleteAuthor
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on DeleteAuthorPayload {
          deleteAuthor {
            creator_id,
            author_name
          }
        }
      `],
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.manga_id,
      creator_id: this.props.creator_id
    };
  }
}

module.exports = DeleteAuthorMutation;
