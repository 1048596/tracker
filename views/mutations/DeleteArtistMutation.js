import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

class DeleteArtistMutation extends Relay.Mutation {
  //static initialVariables = {
  //  maximum: FIRST_MAXIMUM
  //};
  static fragments = {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          artists (first: 1337) {
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
    return Relay.QL`mutation { deleteArtist }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteArtistPayload {
        vertex,
        deletedArtistId
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_DELETE',
      parentName: 'vertex',
      parentID: this.props.vertex.id,
      connectionName: 'artists',
      deletedIDFieldName: 'deletedArtistId',
      pathToConnection: ['vertex', 'artists']
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      creator_id: this.props.artist.id
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      deletedArtistId: this.props.artist.id
    }
  }
}

module.exports = DeleteArtistMutation;
