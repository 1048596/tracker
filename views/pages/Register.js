import React from 'react';
//import { Link, IndexLink } from 'react-router';

class Register extends React.Component {
  render() {
    return (
      <div>
        <form method="post" action="/register">
          <input name="username" type="text" placeholder="Username"/>
          <input name="password" type="password" placeholder="Password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Register;
