import Relay from 'react-relay';

class AddChapterMutation extends Relay.Mutation {
  static fragments = {
    allChapters: () => Relay.QL`
      fragment on AllChapters {
        _id,
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation { addChapter }`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddChapterPayload {
        uploadedChapter
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on AddChapterPayload {
          uploadedChapter {
            id,
            chapter_title,
            chapter_number
          }
        }
      `],
    }];
  }
  getVariables() {
    return {
      chapter_title: this.props.chapter_title,
      chapter_number: this.props.chapter_number,
      manga_title: this.props.manga_title
    };
  }
}

module.exports = AddChapterMutation;
