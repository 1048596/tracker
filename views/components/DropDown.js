import React from 'react';

class DropDown extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
    objectName: React.PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="drop-down">
        {this.props.data.map((item, i) => {
          return <div className="drop-down-item" key={i}>{item[this.props.objectName]}</div>;
          })}
      </div>
    );
  }
}

module.exports = DropDown;
