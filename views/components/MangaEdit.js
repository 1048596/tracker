import React from 'react';
import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';

import TagContainer from './TagContainer.js';

import DeleteAuthorMutation from '../mutations/DeleteAuthorMutation.js';

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
      status: '',
      type: '',
    };
  }
  callState() {
    console.log(this.state);
    console.log(this.props.vertex);
  }
  rollBack(event) {
    var transactions = this.props.relay.getPendingTransactions(this.props.vertex);
    console.log(transactions);

    for (let i = 0; i < transactions.length; i++) {
      transactions[i].rollback();
    }
  }
  commit() {
    var transactions = this.props.relay.getPendingTransactions(this.props.vertex);
    console.log(transactions);

    for (let i = 0; i < transactions.length; i++) {
      transactions[i].commit();
    }
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
    var transaction = Relay.Store.applyUpdate(
      new DeleteAuthorMutation({
        vertex: this.props.vertex,
        author: this.props.vertex.authors.edges[index].node
      }),
      { onSuccess, onFailure }
    );
    console.log(transaction);
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
    let arr = [''];
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
              defaultValue={this.props.vertex.manga_title}
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
              defaultValue={this.props.vertex.descript}
              onChange={this._handleOnChange.bind(this)}>
            </textarea>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Authors
          </dt>
          <dd>
            <TagContainer
              arrayName="authors"
              array={this.props.vertex.authors.edges}
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
            <TagContainer
              arrayName="artists"
              array={this.props.vertex.artists.edges}
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
            <TagContainer
              arrayName="genres"
              array={this.props.vertex.genres}
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
              defaultValue={this.props.vertex.status}
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
              defaultValue={this.props.vertex.type}
            >
              <option value="null">null</option>
              <option value="Manga">Manga</option>
              <option value="Manhwa">Manhwa</option>
            </select>
          </dd>
        </dl>
        <button onClick={this.callState.bind(this)}>Check state!</button>
        <button onClick={this.rollBack.bind(this)}>Time rooollllback!</button>
        <button onClick={this.commit.bind(this)}>Commit!</button>
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
    vertex: () => Relay.QL`
      fragment on Node {
        id,
        ... on Manga {
          manga_title,
          descript,
          status,
          type,
          ${DeleteAuthorMutation.getFragment('vertex')},
          authors (first: 5) {
            edges {
              node {
                id,
                creator_name
              }
            }
          }
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
