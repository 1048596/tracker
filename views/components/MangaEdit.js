import React from 'react';
import Relay from 'react-relay';
import { fromGlobalId } from 'graphql-relay';
import { FIRST_MAXIMUM } from '../../config/config.js';

import TagContainer from './TagContainer.js';

import AddAuthorMutation from '../mutations/AddAuthorMutation.js';
import AddArtistMutation from '../mutations/AddArtistMutation.js';
import AddGenreMutation from '../mutations/AddGenreMutation.js';
import DeleteAuthorMutation from '../mutations/DeleteAuthorMutation.js';
import DeleteArtistMutation from '../mutations/DeleteArtistMutation.js';
import DeleteGenreMutation from '../mutations/DeleteGenreMutation.js';
import UpdateMangaMutation from '../mutations/UpdateMangaMutation.js';

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
    this.setState({
      manga_title: this.props.vertex.manga_title,
      descript: this.props.vertex.descript,
      status: this.props.vertex.status.id,
      type: this.props.vertex.type.id
    });
  }
  handleUpdateManga() {
    Relay.Store.commitUpdate(
      new UpdateMangaMutation({
        state: this.state,
        vertex: this.props.vertex
      }),
      { onSuccess, onFailure }
    );
  }
  handleKeyDownTagContainer(connectionName, edge, keyCode) {
    if (keyCode == 13) {
      // 1: If edge exists in props, do nothing (logic in TagContainer)
      // 2: Check for a Delete/Add mutation and if exists, roll it back,
      // 3: Else do new mutation

      // Add author
      if (connectionName === 'authors') {
        new Promise((resolve, reject) => {
          let transactions = this.props.relay.getPendingTransactions(this.props.vertex.authors);
          let mutate = true;

          if (transactions) {
            let queue = transactions[0]._mutationQueue._queue;

            for (let i = 0; i < queue.length; i++) {
              if (queue[i].mutation instanceof DeleteAuthorMutation) {
                if (queue[i].mutation.props.creator_id == edge.node.id) {
                  transactions[i].rollback();
                  mutate = false;
                  break;
                }
              }
            }
          }
          resolve(mutate);
        }).then((mutate) => {
          if (mutate) {
            console.log('Mutate!');
            Relay.Store.applyUpdate(
              new AddAuthorMutation({
                vertex: this.props.vertex,
                author: edge
              }),
              { onSuccess, onFailure }
            );
          }
        });
      }

      // Add artist
      if (connectionName === 'artists') {
        new Promise((resolve, reject) => {
          let transactions = this.props.relay.getPendingTransactions(this.props.vertex.artists);
          let mutate = true;

          if (transactions) {
            let queue = transactions[0]._mutationQueue._queue;

            for (let i = 0; i < queue.length; i++) {
              if (queue[i].mutation instanceof DeleteArtistMutation) {
                if (queue[i].mutation.props.creator_id == edge.node.id) {
                  transactions[i].rollback();
                  mutate = false;
                  break;
                }
              }
            }
          }
          resolve(mutate);
        }).then((mutate) => {
          if (mutate) {
            console.log('Mutate!');
            Relay.Store.applyUpdate(
              new AddArtistMutation({
                vertex: this.props.vertex,
                artist: edge
              }),
              { onSuccess, onFailure }
            );
          }
        });
      }

      // Add genre
      if (connectionName === 'genres') {
        new Promise((resolve, reject) => {
          let transactions = this.props.relay.getPendingTransactions(this.props.vertex.genres);
          let mutate = true;

          if (transactions) {
            let queue = transactions[0]._mutationQueue._queue;

            for (let i = 0; i < queue.length; i++) {
              if (queue[i].mutation instanceof DeleteGenreMutation) {
                if (queue[i].mutation.props.genre_id == edge.node.id) {
                  transactions[i].rollback();
                  mutate = false;
                  break;
                }
              }
            }
          }
          resolve(mutate);
        }).then((mutate) => {
          if (mutate) {
            console.log('Mutate!');
            Relay.Store.applyUpdate(
              new AddGenreMutation({
                vertex: this.props.vertex,
                genre: edge
              }),
              { onSuccess, onFailure }
            );
          }
        });
      }
    }
  }
  handleClickDeleteTag(connectionName, nodeId) {
    // Delete author
    if (connectionName === 'authors') {
      new Promise((resolve, reject) => {
        let transactions = this.props.relay.getPendingTransactions(this.props.vertex.authors);
        let mutate = true;

        if (transactions) {
          let queue = transactions[0]._mutationQueue._queue;

          for (let i = 0; i < queue.length; i++) {
            if (queue[i].mutation instanceof AddAuthorMutation) {
              if (queue[i].mutation.props.author.node.id == nodeId) {
                transactions[i].rollback();
                mutate = false;
                break;
              }
            }
          }
        }
        resolve(mutate);
      }).then((mutate) => {
        if (mutate) {
          Relay.Store.applyUpdate(
            new DeleteAuthorMutation({
              vertex: this.props.vertex,
              creator_id: nodeId
            }),
            { onSuccess, onFailure }
          );
        }
      });
    }

    // Delete artist
    if (connectionName === 'artists') {
      new Promise((resolve, reject) => {
        let transactions = this.props.relay.getPendingTransactions(this.props.vertex.artists);
        let mutate = true;

        if (transactions) {
          let queue = transactions[0]._mutationQueue._queue;

          for (let i = 0; i < queue.length; i++) {
            if (queue[i].mutation instanceof AddArtistMutation) {
              if (queue[i].mutation.props.artist.node.id == nodeId) {
                transactions[i].rollback();
                mutate = false;
                break;
              }
            }
          }
        }
        resolve(mutate);
      }).then((mutate) => {
        if (mutate) {
          Relay.Store.applyUpdate(
            new DeleteArtistMutation({
              vertex: this.props.vertex,
              creator_id: nodeId
            }),
            { onSuccess, onFailure }
          );
        }
      });
    }

    // Delete genre
    if (connectionName === 'genres') {
      new Promise((resolve, reject) => {
        let transactions = this.props.relay.getPendingTransactions(this.props.vertex.genres);
        let mutate = true;

        if (transactions) {
          let queue = transactions[0]._mutationQueue._queue;

          for (let i = 0; i < queue.length; i++) {
            if (queue[i].mutation instanceof AddGenreMutation) {
              if (queue[i].mutation.props.genre.node.id == nodeId) {
                transactions[i].rollback();
                mutate = false;
                break;
              }
            }
          }
        }
        resolve(mutate);
      }).then((mutate) => {
        if (mutate) {
          Relay.Store.applyUpdate(
            new DeleteGenreMutation({
              vertex: this.props.vertex,
              genre_id: nodeId
            }),
            { onSuccess, onFailure }
          );
        }
      });
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
    console.log(transactions);
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

    this.handleUpdateManga();

    for (let i = 0; i < transactions.length; i++) {
      transactions[i].commit();
    }
  }
  setSearchWord(relayVariableName, word) {
    let setVariablesObject = {};

    if (word === "") {
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
              defaultValue={this.props.vertex.status.id}
            >
              <option value="0">null</option>
              <option value="1">On going</option>
              <option value="2">Completed</option>
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
              defaultValue={this.props.vertex.type.id}
            >
              <option value="0">null</option>
              <option value="1">Manga</option>
              <option value="2">Manhwa</option>
            </select>
          </dd>
        </dl>
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
          status {
            id,
            status
          },
          type {
            id,
            type
          },
          ${AddAuthorMutation.getFragment('vertex')},
          ${AddArtistMutation.getFragment('vertex')},
          ${AddGenreMutation.getFragment('vertex')},
          ${DeleteAuthorMutation.getFragment('vertex')},
          ${DeleteArtistMutation.getFragment('vertex')},
          ${DeleteGenreMutation.getFragment('vertex')},
          ${UpdateMangaMutation.getFragment('vertex')},
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
