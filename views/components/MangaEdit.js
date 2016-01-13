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
    let obj = {};
    obj[event.target.name] = event.target.value;

    this.setState(obj);
  }
  componentDidMount() {
    let node = this.props.node;
    let state = this.state;
    let arr = [];
    let obj = {};

    for (let key in state) {
      if (key in node) {
        arr.push(key);
      }
    }

    for (let key of arr) {
      obj[key] = node[key];
    }

    this.setState(obj);
  }
  render() {
    return (
      <div>
        <input
          name="manga_title"
          placeholder="Manga title"
          defaultValue={this.props.node.manga_title}
          onChange={this._handleOnChange.bind(this)}
        />
        <br/>
        <textarea
          className="editor"
          name="descript"
          placeholder="Description"
          rows="7"
          cols="40"
          defaultValue={this.props.node.descript}
          onChange={this._handleOnChange.bind(this)}>
        </textarea>
        <button onClick={this.callState.bind(this)}>Check state!</button>
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
