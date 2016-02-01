import React from 'react';
import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

import TagContainer from './TagContainer.js';

import AddAuthorMutation from '../mutations/AddAuthorMutation.js';
import AddArtistMutation from '../mutations/AddArtistMutation.js';
import DeleteAuthorMutation from '../mutations/DeleteAuthorMutation.js';
import DeleteArtistMutation from '../mutations/DeleteArtistMutation.js';

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
  componentWillMount() {
    let arr = [''];
  }
  handleKeyDownTagContainer(connectionName, edge, keyCode) {
    if (keyCode == 13) {
      // Handle "Enter"
      if (connectionName === 'authors') {
        var transactions = this.props.relay.getPendingTransactions(this.props.vertex.authors);
        if (transactions) {
          var queue = transactions[0]._mutationQueue._queue;
          for (let i = 0; i < queue.length; i++) {
            if (queue[i].mutation.props.author.id == edge.node.id) {
              console.log('rollback:', edge.node.id, edge.node.creator_name);
              transactions[i].rollback();
            }
          }
        } else {
          // AddAuthorMutation
          Relay.Store.applyUpdate(
            new AddAuthorMutation({
              vertex: this.props.vertex,
              author: edge
            }),
            { onSuccess, onFailure }
          );
        }
      }

      if (connectionName === 'artists') {
        var transactions = this.props.relay.getPendingTransactions(this.props.vertex.artists);
        if (transactions) {
          var queue = transactions[0]._mutationQueue._queue;
          for (let i = 0; i < queue.length; i++) {
            if (queue[i].mutation.props.artist.id == edge.node.id) {
              console.log('rollback:', edge.node.id, edge.node.creator_name);
              transactions[i].rollback();
            }
          }
        } else {
          // AddAuthorMutation
          Relay.Store.applyUpdate(
            new AddArtistMutation({
              vertex: this.props.vertex,
              artist: edge
            }),
            { onSuccess, onFailure }
          );
        }
      }
    }
  }
  handleClickDeleteTag(connectionName, nodeId) {
    var index = this.getEdgeIndex(connectionName, nodeId);
    console.log(index);

    if (connectionName === 'authors') {
      Relay.Store.applyUpdate(
        new DeleteAuthorMutation({
          vertex: this.props.vertex,
          author: this.props.vertex.authors.edges[index].node
        }),
        { onSuccess, onFailure }
      );
    }

    if (connectionName === 'artists') {
      Relay.Store.applyUpdate(
        new DeleteArtistMutation({
          vertex: this.props.vertex,
          artist: this.props.vertex.artists.edges[index].node
        }),
        { onSuccess, onFailure }
      );
    }
  }
  handleChange(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;

    this.setState(obj);
  }
  getEdgeIndex(connectionName, nodeId) {
    let edges = this.props.vertex[connectionName].edges;

    for (let i = 0; i < edges.length; i++) {
      if (nodeId === edges[i].node.id) {
        return i;
      }
    }
  }
  getState() {
    console.log(this.state);
    console.log(this.props.vertex);
    var transactions = this.props.relay.getPendingTransactions(this.props.vertex);
    console.log(transactions[0]);
  }
  rollBack(event) {
    var transactions = this.props.relay.getPendingTransactions(this.props.vertex);
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
  setSearchWord(relayVariableName, word) {
    let setVariablesObject = {};

    if (word == "") {
      setVariablesObject[relayVariableName] = null;
      this.props.relay.setVariables(setVariablesObject);
    } else {
      setVariablesObject[relayVariableName] = word;
      this.props.relay.setVariables(setVariablesObject);
    }
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
              onChange={this.handleChange.bind(this)}
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
              onChange={this.handleChange.bind(this)}>
            </textarea>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Authors
          </dt>
          <dd>
            <TagContainer
              connectionName="authors"
              edges={this.props.vertex.authors.edges}
              fieldName="node.creator_name"
              handleKeyDown={this.handleKeyDownTagContainer.bind(this)}
              handleClickDeleteTag={this.handleClickDeleteTag.bind(this)}
              search={this.setSearchWord.bind(this)}
              relayVariableName="searchCreatorWord"
              results={this.props.searchCreators.creators.edges}
            />
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Artists
          </dt>
          <dd>
            <TagContainer
              connectionName="artists"
              edges={this.props.vertex.artists.edges}
              fieldName="node.creator_name"
              handleKeyDown={this.handleKeyDownTagContainer.bind(this)}
              handleClickDeleteTag={this.handleClickDeleteTag.bind(this)}
              search={this.setSearchWord.bind(this)}
              relayVariableName="searchCreatorWord"
              results={this.props.searchCreators.creators.edges}
            />
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Genre
          </dt>
          <dd>
            <TagContainer
              connectionName="genres"
              edges={this.props.vertex.genres.edges}
              fieldName="node.genre"
              handleKeyDown={this.handleKeyDownTagContainer.bind(this)}
              handleClickDeleteTag={this.handleClickDeleteTag.bind(this)}
              search={this.setSearchWord.bind(this)}
              relayVariableName="searchGenreWord"
              results={this.props.searchGenres.genres.edges}
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
              onChange={this.handleChange.bind(this)}
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
              onChange={this.handleChange.bind(this)}
              defaultValue={this.props.vertex.type}
            >
              <option value="null">null</option>
              <option value="Manga">Manga</option>
              <option value="Manhwa">Manhwa</option>
            </select>
          </dd>
        </dl>
        <button onClick={this.getState.bind(this)}>Check state!</button>
        <button onClick={this.rollBack.bind(this)}>Time rooollllback!</button>
        <button onClick={this.commit.bind(this)}>Commit!</button>
      </div>
    );
  }
}

var Container = Relay.createContainer(MangaEdit, {
  initialVariables: {
    id: null,
    maximum: FIRST_MAXIMUM,
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
          ${AddAuthorMutation.getFragment('vertex')},
          ${AddArtistMutation.getFragment('vertex')},
          ${DeleteAuthorMutation.getFragment('vertex')},
          ${DeleteArtistMutation.getFragment('vertex')},
          authors (first: $maximum) {
            edges {
              node {
                id,
                creator_name
              }
            }
          }
          artists (first: $maximum) {
            edges {
              node {
                id,
                creator_name
              }
            }
          },
          genres (first: $maximum) {
            edges {
              node {
                id,
                genre
              }
            }
          }
        }
      }
    `,
    searchCreators: () => Relay.QL`
      fragment on Search {
        creators(first: $maximum, name: $searchCreatorWord) {
          edges {
            node {
              id,
              creator_name
            }
          }
        }
      }
    `,
    searchGenres: () => Relay.QL`
      fragment on Search {
        genres(first: $maximum,genre: $searchGenreWord) {
          edges {
            node {
              id,
              genre
            }
          }
        }
      }
    `,
  },
});

module.exports = Container;
