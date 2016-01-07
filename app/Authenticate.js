import React from 'react';
import Relay from 'react-relay';

class Authenticate extends React.Component {
  showIfTrue(statement, html) {
    if (statement) {
      return html;
    }
  }
  render() {
    let username;
    if (this.props.authenticate) {
      username = <div>{this.props.authenticate.username}</div>;
    } else {
      username = <div>Nothing to see.</div>;
    }
    return (
      <div>
        {username}
        {this.showIfTrue(false, <div>Testing</div>)}
      </div>
    );
  }
}

const Container = Relay.createContainer(Authenticate, {
  fragments: {
    authenticate: () => Relay.QL`
      fragment on User {
        username
      }
    `,
  },
});

module.exports = Container;
