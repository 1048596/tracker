import React from 'react';
//import { Link, IndexLink } from 'react-router';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form method="post" action="/login">
          <input name="username" type="text" placeholder="Username"/>
          <input name="password" type="password" placeholder="Password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Login;
