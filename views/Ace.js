import React from 'react';

class Ace extends React.Component {
  render() {
    return (
      <div>
        <div id="editor">some text</div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.2/ace.js" type="text/javascript"></script>
        <script>
            var editor = ace.edit("editor");
        </script>
      </div>
    );
  }
}

module.exports = Ace;
