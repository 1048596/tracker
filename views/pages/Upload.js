import React from 'react';
import Relay from 'react-relay';

import AddChapterMutation from '../mutations/AddChapterMutation.js';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter_title: '',
      chapter_number: '',
      manga_title: ''
    };
  }
  callState() {
    console.log(this.state);
  }
  addChapter(props) {
    var onSuccess = (response) => {
      console.log('Success!');
      alert('Success');
      console.log(response);
      //this.props.allChapters.edges.unshift(response);
    };

    var onFailure = (response) => {
      console.log('Failed!');
      alert('Failed');
      console.log(response);
    };

    Relay.Store.update(
      new AddChapterMutation({
        chapter_title: this.state.chapter_title,
        chapter_number: parseInt(this.state.chapter_number),
        manga_title: this.state.manga_title,
      }),
      { onSuccess, onFailure }
    );
  }
  _handleOnChange(event) {
    if (event.target.name == 'chapter_title') {
      this.setState({
        chapter_title: event.target.value
      });
    } else if (event.target.name == 'chapter_number') {
      this.setState({
        chapter_number: event.target.value
      });
    } else if (event.target.name == 'manga_title') {
      this.setState({
        manga_title: event.target.value
      });
    }
  }
  render() {
    return (
      <div>
        <input
          onChange={this._handleOnChange.bind(this)}
          name="chapter_title"
          placeholder="Chapter title"
        />
        <input
          onChange={this._handleOnChange.bind(this)}
          name="chapter_number"
          placeholder="Chapter number"
        />
        <input
          onChange={this._handleOnChange.bind(this)}
          name="manga_title"
          placeholder="Manga title"
        />
        <button onClick={this.addChapter.bind(this)}>Add Chapter</button>
      </div>
    );
  }
}

var Container = Relay.createContainer(Upload, {
  initialVariables: {
    page: 0,
  },
  fragments: {
    allChapters: () => Relay.QL`
      fragment on AllChapters {
        ${AddChapterMutation.fragments.allChapters}
      }
    `
  }
});

module.exports = Container;
