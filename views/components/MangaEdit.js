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
    /*let transactions = this.props.relay.getPendingTransactions({
      __dataID__: "Q3JlYXRvcjox"
    });*/
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
  keyDown(arrayName, obj, keyCode) {
    if (keyCode == 13) {
      // If "Enter" (13)
      let state = this.state[arrayName];
      state.push(obj);

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    }

    /* if (this.state[arrayName] && value !== '' && key == 'Enter') {
      let state = this.state[arrayName];
      let pushObject = {};
      pushObject[objectName] = value;
      state.push(pushObject);

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);

    } else if (this.state[arrayName] && key == 'Backspace' && value == '') {
      let state = this.state[arrayName];
      state.pop();

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    }*/
  }
  deleteTag(arrayName, index) {
    /*let state = this.state[arrayName];

    state.splice(index, 1);

    let setStateObject = {};
    setStateObject[arrayName] = state;

    this.setState(setStateObject);*/
    // Copy the field
    let field = this.state[arrayName];

    new Promise((resolve, reject) => {
      var transaction = Relay.Store.applyUpdate(
        new DeleteAuthorMutation({
          manga_id: fromGlobalId(this.props.node.id).id,
          creator_id: fromGlobalId(this.state[arrayName].edges[index].node.id).id,
        }),
        { onSuccess, onFailure }
      );
      resolve(transaction);
    }).then((value) => {
      var transactions = this.props.relay.getPendingTransactions(this.props.node.authors);
      console.log('Client: Transaction');
      console.log(value);
      console.log('Client: Transactions');
      console.log(transactions);
      console.log('Goin in MAN');
      console.log(value._mutationQueue._queue[0]);
    });


    new Promise((resolve, reject) => {
      this.setState(this.props.node);
      resolve('Props shifted to state.');
    }).then((value) => {
      console.log(value);
    });

    // Delete the edge
    //field.edges.splice(index, 1);
    //this.setState(field);
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
    console.log('YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    new Promise((resolve, reject) => {
      this.setState(this.props.node);
      resolve('Props shifted to state.');
    }).then((value) => {
      console.log(value);
    });
    /*let node = this.props.node;
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

    this.setState(obj);*/
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
            <Tag
              arrayName="authors"
              array={this.state.authors.edges}
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
    searchCreatorWord: null,
    searchGenreWord: null,
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
