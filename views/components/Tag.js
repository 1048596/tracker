import React from 'react';
import DropDown from './DropDown.js';
import dotProp from 'dot-prop';

class Tag extends React.Component {
  static propTypes = {
    arrayName: React.PropTypes.string.isRequired,
    array: React.PropTypes.array.isRequired,
    propName: React.PropTypes.string.isRequired,
    keyDown: React.PropTypes.func.isRequired,
    deleteTag: React.PropTypes.func.isRequired,
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
    let propName = this.props.propName;
    let results = this.props.results;
    console.log(event.keyCode);

    if (event.keyCode === 13) {
      // Handle "Enter"
      let correctIndex;

      for (let i = 0; i < results.length; i++) {
        console.log(dotProp.get(results[i], propName).toLowerCase());
        if (this.state.input.toLowerCase() === dotProp.get(results[i], propName).toLowerCase()) {
          correctIndex = i;
        }
      }
      if (results[this.state.focusedIndex] || results[correctIndex]) {
        this.props.keyDown(
          this.props.arrayName,
          results[this.state.focusedIndex] || results[correctIndex],
          event.keyCode
        );
      }
      event.target.value = '';
      this.setState({
        focusedIndex: null
      });

      // Reset the dropbox results by changing relay search variable to nothing.
      this._handleSearch(event);
    }

    if (event.keyCode === 40) {
      this.focusNextOption();
    }

    if (event.keyCode === 38) {
      this.focusPreviousOption();
    }
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
      this.setState({
        focusedIndex: null
      });
    }
  }
  focusPreviousOption() {
    if (this.state.focusedIndex === null) {
      this.setState({
        focusedIndex: this.props.results.length - 1
      });
    } else if (this.state.focusedIndex == 0) {
      this.setState({
        focusedIndex: null
      });
    } else {
      this.setState((previousState, currentProps) => {
        return {
          focusedIndex: previousState.focusedIndex - 1
        };
      })
    }
  }
  _handleDeleteTag(index, event) {
    this.props.deleteTag(
      this.props.arrayName,
      index
    );
  }
  _handleSearch(event) {
    this.props.search(this.props.relayVariableName, event.target.value);
    this.setState({
      input: event.target.value
    });
  }
  handleFocus(event) {
    this.setState({
      focused: true
    });
  }
  handleBlur() {
    this.setState({
      focused: false,
      focusedIndex: null
    });
  }
  render() {
    return (
      <div className="tag-container">
        <div>
          <span className="clearfix">
            {this.props.array.map((obj, i) => {
              return (
                <span className="tag left" key={i}>
                  {dotProp.get(obj, this.props.propName)}
                  <a
                    onClick={this._handleDeleteTag.bind(this, i)}
                    className="delete-tag"
                  >
                    x
                  </a>
                </span>
              );
            })}
          </span>
        </div>
        <div>
          <input
            className="tag-input"
            name={this.props.arrayName}
            onKeyDown={this._handleKeyDown.bind(this)}
            onChange={this._handleSearch.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
        {this.state.focused && this.state.input.length > 0 && this.props.results.length > 0 ?
            <DropDown
              data={this.props.results}
              propName={this.props.propName}
              focusedIndex={this.state.focusedIndex}
            /> : null}
        </div>
      </div>
    );
  }
}

module.exports = Tag;
