import React from 'react';
import Relay from 'react-relay';

import {
  fromGlobalId
} from 'graphql-relay';

import UpdateManga from '../mutations/UpdateManga.js';
import AddAuthorMutation from '../mutations/AddAuthorMutation.js';
import DeleteAuthorMutation from '../mutations/DeleteAuthorMutation.js';

import Tag from './Tag.js';

var onSuccess = (response) => {
  console.log('Success!');
  alert('Success');
  console.log(response);
};

var onFailure = (response) => {
  console.log('Failed!');
  alert('Failed');
  console.log(response);
};

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
  updateManga(event) {
    Relay.Store.commitUpdate(
      new UpdateManga({
        id: fromGlobalId(this.props.node.id).id,
        manga_title: this.state.manga_title,
        descript: this.state.descript,
        status: this.state.status,
        type: this.state.type,
      }),
      { onSuccess, onFailure }
    );
  }
  test(event) {
    console.log(event.target.name);
  }
  _handleOnChange(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;

    this.setState(obj);
  }
  keyDown(arrayName, objectName, value, key) {
    if (this.state[arrayName] && value !== '' && key == 'Enter') {
      let state = this.state[arrayName];
      let pushObject = {};
      pushObject[objectName] = value;
      state.push(pushObject);

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    }/* else if (this.state[arrayName] && key == 'Backspace' && value == '') {
      let state = this.state[arrayName];
      state.pop();

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    }*/
  }
  deleteTag(arrayName, index) {
    let state = this.state[arrayName];
    var transaction = Relay.Store.applyUpdate(
      new DeleteAuthorMutation({
        manga_id: fromGlobalId(this.props.node.id).id,
        creator_id: this.state.authors[index].creator_id
      }),
      { onSuccess, onFailure }
    );
    console.log(transaction);

    state.splice(index, 1);

    let setStateObject = {};
    setStateObject[arrayName] = state;

    this.setState(setStateObject);

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
      console.log(key);
      obj[key] = node[key];
    }

    console.log(obj.authors[0].__dataID__);

    this.setState(obj);
  }
  render() {
    return (
      <div>
        <dl className="form">
          <dt>
            Manga title
          </dt>
          <dd>
            <input
              name="manga_title"
              defaultValue={this.props.node.manga_title}
              onChange={this._handleOnChange.bind(this)}
            />
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Description
          </dt>
          <dd>
            <textarea
              className="editor"
              name="descript"
              rows="7"
              cols="40"
              defaultValue={this.props.node.descript}
              onChange={this._handleOnChange.bind(this)}>
            </textarea>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Authors
          </dt>
          <dd>
            <div className="tag-container clearfix">
              <Tag
                arrayName="authors"
                array={this.state.authors}
                objectName="author_name"
                keyDown={this.keyDown.bind(this)}
                deleteTag={this.deleteTag.bind(this)}
              />
            </div>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Artists
          </dt>
          <dd>
            <div className="tag-container clearfix">
              <Tag
                arrayName="artists"
                array={this.state.artists}
                objectName="artist_name"
                keyDown={this.keyDown.bind(this)}
                deleteTag={this.deleteTag.bind(this)}
              />
            </div>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Genre
          </dt>
          <dd>
            <div className="tag-container clearfix">
              <Tag
                arrayName="genres"
                array={this.state.genres}
                objectName="genre"
                keyDown={this.keyDown.bind(this)}
                deleteTag={this.deleteTag.bind(this)}
                />
            </div>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Status
          </dt>
          <dd>
            <select
              name="status"
              onChange={this._handleOnChange.bind(this)}
              defaultValue={this.props.node.status}
            >
              <option value="null">null</option>
              <option value="On going">On going</option>
              <option value="Completed">Completed</option>
            </select>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Type
          </dt>
          <dd>
            <select
              name="type"
              onChange={this._handleOnChange.bind(this)}
              defaultValue={this.props.node.type}
            >
              <option value="null">null</option>
              <option value="Manga">Manga</option>
              <option value="Manhwa">Manhwa</option>
            </select>
          </dd>
        </dl>
        <button onClick={this.callState.bind(this)}>Check state!</button>
        <button onClick={this.updateManga.bind(this)}>Save edit</button>
      </div>
    );
  }
}

var Container = Relay.createContainer(MangaEdit, {
  initialVariables: {
    id: null,
    searchWord: null,
  },
  fragments: {
    node: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,
          status,
          type,
          authors {
            creator_id,
            author_name
          },
          artists {
            creator_id,
            artist_name
          },
          genres {
            genre
          }
        }
      }
    `,
    search: () => Relay.QL`
      fragment on Search {
        creators(name: $searchWord) {
          ... on Creator {
            id,
            creator_name
          }
        }
      }
    `,
  },
});

module.exports = Container;
