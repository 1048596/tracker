import React from 'react';
import DropDownItem from './DropDownItem';
import dotProp from 'dot-prop';

class DropDown extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
    propName: React.PropTypes.string,
    focusedIndex: React.PropTypes.number,
  };
  render() {
    return (
      <div className="drop-down-container">
        <div className="drop-down">
          {this.props.data.map((item, i) => {
            return (
              <DropDownItem
                value={dotProp.get(item, this.props.propName)}
                focused={this.props.focusedIndex == i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

module.exports = DropDown;
