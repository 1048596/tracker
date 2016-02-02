import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

class DeleteGenreMutation extends Relay.Mutation {
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
    return Relay.QL`mutation { deleteGenre }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteGenrePayload {
        vertex,
        deletedGenreId
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_DELETE',
      parentName: 'vertex',
      parentID: this.props.vertex.id,
      connectionName: 'genres',
      deletedIDFieldName: 'deletedGenreId',
      pathToConnection: ['vertex', 'genres']
    }];
  }
  getVariables() {
    return {
      manga_id: this.props.vertex.id,
      genre_id: this.props.genre_id
    };
  }
  getOptimisticResponse() {
    return {
      vertex: this.props.vertex,
      deletedGenreId: this.props.genre_id
    }
  }
}

module.exports = DeleteGenreMutation;
