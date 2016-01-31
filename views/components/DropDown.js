import React from 'react';
import DropDownItem from './DropDownItem';
import dotProp from 'dot-prop';

class DropDown extends React.Component {
  static propTypes = {
    results: React.PropTypes.array,
    fieldName: React.PropTypes.string,
    focusedIndex: React.PropTypes.number,
  };
  render() {
    return (
      <div className="drop-down-container">
        <div className="drop-down">
          {this.props.results.map((item, i) => {
            return (
              <DropDownItem
                value={dotProp.get(item, this.props.fieldName)}
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
