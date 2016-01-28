import React from 'react';
import DropDown from './DropDown.js';

class Tag extends React.Component {
  static propTypes = {
    arrayName: React.PropTypes.string.isRequired,
    array: React.PropTypes.array.isRequired,
    objectName: React.PropTypes.string.isRequired,
    keyDown: React.PropTypes.func.isRequired,
    deleteTag: React.PropTypes.func.isRequired,
    search: React.PropTypes.func,
    results: React.PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      input: ''
    };
  }
  callState(event) {
    console.log(this.state);
  }
  _handleKeyDown(event) {
    this.props.keyDown(
      this.props.arrayName,
      this.props.objectName,
      this.state.input,
      event.key
    );

    if (event.key == 'Enter') {
      event.target.value = '';
    }
  }
  _handleDeleteTag(index, event) {
    this.props.deleteTag(
      this.props.arrayName,
      index
    );
  }
  _handleChange(event) {
    this.props.search(event.target.value);
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
      focused: false
    });
  }
  render() {
    return (
      <div>
        <div>
          <span className="clearfix">
            {this.props.array.map((obj, i) => {
              return (
                <span className="tag left" key={i}>
                  {obj[this.props.objectName]}
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
            onChange={this._handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
        {this.state.focused && this.state.input ?
          <DropDown
            data={this.props.results}
            objectName={this.props.objectName}
          /> : null}
        </div>
      </div>
    );
  }
}

module.exports = Tag;
