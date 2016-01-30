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
    //  manga_title: '',
    //  descript: '',
    //  authors: [],
    //  artists: [],
    //  status: '',
    //  type: '',
    //  genres: [],
    };
  }
  callState() {
    console.log(this.state);
  }
  updateManga(event) {
    Relay.Store.commitUpdate(
      new UpdateManga({
        id: fromGlobalId(this.props.viewer.id).id,
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
  keyDown(arrayName, obj, keyCode) {
    if (keyCode == 13) {
      // If "Enter" (13)
      let state = this.state[arrayName];
      state.push(obj);

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    }
  }
  deleteTag(arrayName, index) {
    var transaction = Relay.Store.commitUpdate(
      new DeleteAuthorMutation({
        node: this.props.viewer,
        author: this.props.viewer[arrayName].edges[index].node,
        authors: this.props.viewer[arrayName],
      }),
      { onSuccess, onFailure }
    );
    var transactions = this.props.relay.getPendingTransactions(this.props.viewer);
    console.log(transactions);
  }
  searchQuery(relayVariableName, word) {
    let setVariablesObject = {};

    if (word == "") {
      setVariablesObject[relayVariableName] = null;
      this.props.relay.setVariables(setVariablesObject);
    } else {
      setVariablesObject[relayVariableName] = word;
      this.props.relay.setVariables(setVariablesObject);
    }
  }
  componentWillMount() {
    new Promise((resolve, reject) => {
      this.setState(this.props.viewer);
      resolve('Props shifted to state.');
    }).then((value) => {
      console.log(value);
    });
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
              defaultValue={this.props.viewer.manga_title}
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
              defaultValue={this.props.viewer.descript}
              onChange={this._handleOnChange.bind(this)}>
            </textarea>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Authors
          </dt>
          <dd>
            <Tag
              arrayName="authors"
              array={this.props.viewer.authors.edges}
              propName="node.creator_name"
              keyDown={this.keyDown.bind(this)}
              deleteTag={this.deleteTag.bind(this)}
              search={this.searchQuery.bind(this, )}
              relayVariableName="searchCreatorWord"
              results={this.props.searchCreators.creators}
            />
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Artists
          </dt>
          <dd>
            <Tag
              arrayName="artists"
              array={this.state.artists.edges}
              propName="node.creator_name"
              keyDown={this.keyDown.bind(this)}
              deleteTag={this.deleteTag.bind(this)}
              search={this.searchQuery.bind(this)}
              relayVariableName="searchCreatorWord"
              results={this.props.searchCreators.creators}
            />
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Genre
          </dt>
          <dd>
            <Tag
              arrayName="genres"
              array={this.state.genres}
              propName="genre"
              keyDown={this.keyDown.bind(this)}
              deleteTag={this.deleteTag.bind(this)}
              search={this.searchQuery.bind(this)}
              relayVariableName="searchGenreWord"
              results={this.props.searchGenres.genres}
            />
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
              defaultValue={this.props.viewer.status}
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
              defaultValue={this.props.viewer.type}
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
    searchCreatorWord: null,
    searchGenreWord: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,
          status,
          type,
          authors (first: 5) {
            edges {
              node {
                id,
                creator_name
              }
            }
          },
          artists (first: 5) {
            edges {
              node {
                id,
                creator_name
              }
            }
          },
          genres {
            id,
            genre
          }
        }
      }
    `,
    searchCreators: () => Relay.QL`
      fragment on Search {
        creators(name: $searchCreatorWord) {
          ... on Creator {
            id,
            creator_name
          }
        }
      }
    `,
    searchGenres: () => Relay.QL`
      fragment on Search {
        genres(genre: $searchGenreWord) {
          ... on Genre {
            id,
            genre
          }
        }
      }
    `,
  },
});

module.exports = Container;
