import React from 'react';
import dotProp from 'dot-prop';

import Tag from './Tag.js';
import DropDown from './DropDown.js';

class TagContainer extends React.Component {
  static propTypes = {
    connectionName: React.PropTypes.string.isRequired,
    edges: React.PropTypes.array.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    handleKeyDown: React.PropTypes.func.isRequired,
    handleClickDeleteTag: React.PropTypes.func.isRequired,
    search: React.PropTypes.func,
    relayVariableName: React.PropTypes.string,
    results: React.PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      focusedIndex: null,
      input: '',
    };
  }
  callState(event) {
    console.log(this.state);
  }
  _handleKeyDown(event) {
    let results = this.props.results;
    let fieldName = this.props.fieldName;
    console.log(event.keyCode);

    if (event.keyCode === 13) {
      // Handle "Enter"
      this.handleEnter(results, fieldName, event);
    }

    if (event.keyCode === 40) {
      this.focusNextOption();
    }

    if (event.keyCode === 38) {
      this.focusPreviousOption();
    }
  }
  handleEnter(results, fieldName, event) {
    let matchingIndex;
    let focusedIndex = this.state.focusedIndex;
    let edges = this.props.edges;

    // Match input with results, with no focused result
    for (let i = 0; i < results.length; i++) {
      console.log(dotProp.get(results[i], fieldName).toLowerCase());
      if (this.state.input.toLowerCase() === dotProp.get(results[i], fieldName).toLowerCase()) {
        matchingIndex = i;
        console.log('matchingIndex:', matchingIndex);
      }
    }

    new Promise((resolve, reject) => {
      let hasEdge = false;

      for (let i = 0; i < edges.length; i++) {
        if (results[focusedIndex] == edges[i] || results[matchingIndex] == edges[i]) {
          hasEdge = true;
          console.log('Already exists in edges/connection.');
          resolve(hasEdge);
          break;
        }
      }
      resolve(hasEdge);
    }).then((hasEdge) => {
      this.resetFocusedIndex();
      event.target.value = '';
      this._handleSearch(event);
      
      if (!hasEdge) {
        // If matching input and result or focus on a result then:
        if (results[focusedIndex] || results[matchingIndex]) {
          // Reset the dropbox results by changing relay search variable to nothing.

          this.props.handleKeyDown(
            this.props.connectionName,
            results[focusedIndex] || results[matchingIndex],
            13
          );
        }
      }
    });
  }
  focusNextOption() {
    if (this.state.focusedIndex === null) {
      this.setState({
        focusedIndex: 0
      });
    } else if (this.state.focusedIndex < this.props.results.length - 1) {
      this.setState((previousState, currentProps) => {
        return {
          focusedIndex: previousState.focusedIndex + 1
        };
      });
    } else {
      this.resetFocusedIndex();
    }
  }
  focusPreviousOption() {
    if (this.state.focusedIndex === null) {
      this.setState({
        focusedIndex: this.props.results.length - 1
      });
    } else if (this.state.focusedIndex == 0) {
      this.resetFocusedIndex();
    } else {
      this.setState((previousState, currentProps) => {
        return {
          focusedIndex: previousState.focusedIndex - 1
        };
      })
    }
  }
  _handleDeleteTag(connectionName, nodeId, event) {
    this.props.handleClickDeleteTag(
      this.props.connectionName,
      nodeId
    );
  }
  _handleSearch(event) {
    this.setState({
      input: event.target.value
    });
    this.props.search(this.props.relayVariableName, event.target.value);
  }
  handleFocus(event) {
    this.setState({
      focused: true
    });
  }
  handleBlur() {
    this.setState({
      focused: false,
    });
    this.resetFocusedIndex();
  }
  resetFocusedIndex() {
    this.setState({
      focusedIndex: null
    })
  }
  render() {
    return (
      <div className="tag-container">
        <div>
          <span className="clearfix">
            {this.props.edges.map((edge, i) => {
              return (
                <Tag
                  fieldName={this.props.fieldName}
                  handleDeleteTag={this._handleDeleteTag.bind(this)}
                  key={i}
                  edge={edge}
                  />
              );
            })}
          </span>
        </div>
        <div>
          <input
            className="tag-input"
            name={this.props.connectionName}
            onKeyDown={this._handleKeyDown.bind(this)}
            onChange={this._handleSearch.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            />
            {this.state.focused && this.state.input.length > 0 && this.props.results.length > 0 ?
            <DropDown
              results={this.props.results}
              fieldName={this.props.fieldName}
              focusedIndex={this.state.focusedIndex}
              /> : null}
        </div>
      </div>
    );
  }
}

module.exports = TagContainer;
