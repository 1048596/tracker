import React from 'react';
import dotProp from 'dot-prop';

class Tag extends React.Component {
  static propTypes = {
    propName: React.PropTypes.string,
    handleDeleteTag: React.PropTypes.func,
    edge: React.PropTypes.object
  };
  render() {
    return (
      <span className="tag left">
        {dotProp.get(this.props.edge, this.props.propName)}
        <a
          onClick={this.props.handleDeleteTag.bind(this)}
          className="delete-tag"
          >
          x
        </a>
      </span>
    );
  }
}

module.exports = Tag;
