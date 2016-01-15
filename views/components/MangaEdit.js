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
  test(event) {
    console.log(event.target.name);
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
              placeholder="Description"
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
            <div>
              <span>
                {this.props.node.authors.map((author) => {
                  return <span className="tag">{author.author_name}</span>
                })}
              </span>
            </div>
          </dd>
        </dl>
        <dl className="form">
          <dt>
            Artists
          </dt>
          <dd>

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
          status,
          type,
          authors {
            creator_id,
            author_name
          }
        }
      }
    `,
  },
});

module.exports = Container;
