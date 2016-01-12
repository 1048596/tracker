import React from 'react';

class Ace extends React.Component {
  _handleOnChange(event) {
    console.log(event.target.name);
  }
  render() {
    return (
      <div>
        <textarea className="editor" name="descript" rows="5" cols="40" onChange={this._handleOnChange}>
        </textarea>
      </div>
    );
  }
}

module.exports = Ace;
