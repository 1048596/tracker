import React from 'react';

class PermissionTag extends React.Component {
  static propTypes = {
    permission: React.PropTypes.string,
  };
  render() {
    /*
    let tagColor = {
      'background-color': '#eee'
    };

    switch (this.props.permission) {
      case 'Owner':
        tagColor['background-color'] = '#DC143C'
        break;
      case 'Admin':
        tagColor['background-color'] = '#000080'
        break;
      case 'Mod':
        tagColor['background-color'] = '#32CD32'
        break;
      case 'Member':
        tagColor['background-color'] = '#eee'
        break;
    }
    */

    return (
      <span className="permission-tag left">
        {this.props.permission}
      </span>
    );
  }
}

module.exports = PermissionTag;
