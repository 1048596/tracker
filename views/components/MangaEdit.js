import React from 'react';
import Relay from 'react-relay';
import UpdateManga from '../mutations/UpdateManga.js';

class MangaEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manga_title: '',
      descript: '',
      authors: [],
      artists: [],
      status: '',
      type: '',
      genres: [],
    };
  }
  callState() {
    console.log(this.state);
  }
  _handleOnChange(event) {
    this.setState({
      event.target.name: event.target.value
    });
  }
  _handleListOnChange() {

  }
  render() {
    return (
      <div>
        <input
          onChange={this._handleOnChange.bind(this)}
          name="manga_title"
          placeholder="Manga title"
          value={this.props.node.manga_title}
        />
        <input
          onChange={this._handleOnChange.bind(this)}
          name="descript"
          placeholder="Description"
          value={this.props.node.descript}
        />
        <textarea
          className="editor"
          name="descript"
          rows="7"
          cols="40"
          onChange={this._handleOnChange}>
        </textarea>
        <button onClick={this.callState}>Check state!</button>
      </div>
    );
  }
}

var Container = Relay.createContainer(MangaEdit, {
  initialVariables: {
    id: null,
  },
  fragments: {
    node: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,

        }
      }
    `,
  },
});

module.exports = Container;
