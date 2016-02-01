import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

class AddArtistMutation extends Relay.Mutation {
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
    return Relay.QL`mutation { addArtist }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddArtistPayload {
        vertex {
          artists
        },
        newArtistEdge
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'vertex',
      parentID: this.props.vertex.id,
      connectionName: 'artists',
      edgeName: 'newArtistEdge',
      rangeBehaviors: {
        '': 'append',
      }
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      creator_id: this.props.artist.node.id
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      newArtistEdge: this.props.artist
    }
  }
}

module.exports = AddArtistMutation;
