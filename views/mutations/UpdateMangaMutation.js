import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';

class UpdateMangaMutation extends Relay.Mutation {
  static fragments = {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,
          status {
            id,
            status
          },
          type {
            id,
            type
          }
        }
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { updateManga }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateMangaPayload {
        updatedManga
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on UpdateMangaPayload {
          updatedManga
        }
      `],
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      manga_title: this.props.state.manga_title,
      descript: this.props.state.descript,
      status: this.props.state.status,
      type: this.props.state.type
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      updatedManga: this.props.vertex.id
    }
  }
}

module.exports = UpdateMangaMutation;
