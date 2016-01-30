import React from 'react';

class DropDownItem extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    focused: React.PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    let dropDownItemClass;

    if (this.props.focused) {
      dropDownItemClass = "drop-down-item-focused";
    } else {
      dropDownItemClass = "drop-down-item";
    }
    return (
      <div className={dropDownItemClass}>{this.props.value}</div>
    );
  }
}

module.exports = DropDownItem;
