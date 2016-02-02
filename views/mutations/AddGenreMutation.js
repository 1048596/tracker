import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

class AddGenreMutation extends Relay.Mutation {
  //static initialVariables = {
  //  maximum: FIRST_MAXIMUM
  //};
  static fragments = {
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          genres (first: 1337) {
            edges {
              node {
                id,
                genre
              }
            }
          }
        }
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { addGenre }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddGenrePayload {
        vertex {
          genres
        },
        newGenreEdge
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'vertex',
      parentID: this.props.vertex.id,
      connectionName: 'genres',
      edgeName: 'newGenreEdge',
      rangeBehaviors: {
        '': 'append',
      }
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      genre_id: this.props.genre.node.id
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      newGenreEdge: this.props.genre
    }
  }
}

module.exports = AddGenreMutation;
