import Relay from 'react-relay';

class AddAuthorMutation extends Relay.Mutation {
  static fragments = {
    manga: () => Relay.QL`
      fragment on Manga {
        id,
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { addAuthor }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddAuthorPayload {
        addedAuthor
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on AddAuthorPayload {
          addedAuthor {
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

module.exports = AddAuthorMutation;
