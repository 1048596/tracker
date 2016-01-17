import React from 'react';

class Tag extends React.Component {
  static propTypes = {
    arrayName: React.PropTypes.string.isRequired,
    array: React.PropTypes.array.isRequired,
    objectName: React.PropTypes.string.isRequired,
    keyDown: React.PropTypes.func.isRequired,
    deleteTag: React.PropTypes.func.isRequired,
  };
  _handleKeyDown(event) {
    this.props.keyDown(
      this.props.arrayName,
      this.props.objectName,
      this.refs.tagInputValue.value,
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
  render() {
    return (
      <div>
        <span className="clearfix left">
          {this.props.array.map((obj, i) => {
            return (
              <span
                className="tag left"
              >
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
          <input
            className="tag-input left"
            name={this.props.arrayName}
            onKeyDown={this._handleKeyDown.bind(this)}
            ref="tagInputValue"
          />
        </span>
      </div>
    );
  }
}

module.exports = Tag;


/*




*/
