import Relay from 'react-relay';

class UpdateMangaMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { updateManga }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateMangaPayload {
        null
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on UpdateMangaPayload {
          null
        }
      `],
    }];
  }
  getVariables() {
    return {
      id: this.props.id,
      manga_title: this.props.manga_title,
      descript: this.props.descript,
      authors: this.props.authors,
      artists: this.props.artists,
      status: this.props.status,
      type: this.props.type,
      genres: this.props.genres,
    };
  }
}
