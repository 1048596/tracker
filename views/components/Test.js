import React from 'react';
import Tag from './Tag.js';


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: [
        { fruit_name: 'Apple' },
        { fruit_name: 'Pear' },
        { fruit_name: 'Orange' },
      ],
    };
  }
  callState() {
    console.log(this.state);
  }
  keyDown(arrayName, objectName, value, key) {
    if (this.state[arrayName] && value !== '' && key == 'Enter') {
      let state = this.state[arrayName];
      let pushObject = {};
      pushObject[objectName] = value;
      state.push(pushObject);

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    } else if (this.state[arrayName] && key == 'Backspace' && value == '') {
      let state = this.state[arrayName];
      state.pop();

      let setStateObject = {};
      setStateObject[arrayName] = state;

      this.setState(setStateObject);
    }
  }
  deleteTag(arrayName, index) {
    let state = this.state[arrayName];
    state.splice(index, 1);

    let setStateObject = {};
    setStateObject[arrayName] = state;

    this.setState(setStateObject);
  }
  render() {
    /*return (
      <div>
        <Tag
          arrayName="fruits"
          array={this.state.fruits}
          objectName="fruit_name"
          keyDown={this.keyDown.bind(this)}
          deleteTag={this.deleteTag.bind(this)}
        />
      <button onClick={this.callState.bind(this)}>Call state!</button>
      </div>
    );*/
    return (
      <div onFocus={this.callState.bind(this)}>asdf</div>
    );
  }
}

module.exports = Test;
