import React from 'react';
import dotProp from 'dot-prop';

class Tag extends React.Component {
  static propTypes = {
    fieldName: React.PropTypes.string,
    handleDeleteTag: React.PropTypes.func,
    edge: React.PropTypes.object
  };
  callProps() {
    console.log(this.props);
  }
  render() {
    return (
      <span className="tag left">
        {dotProp.get(this.props.edge, this.props.fieldName)}
        <a
          onClick={this.props.handleDeleteTag.bind(this, 'authors', dotProp.get(this.props.edge, 'node.id'))}
          className="delete-tag"
          >
          x
        </a>
      </span>
    );
  }
}

module.exports = Tag;
