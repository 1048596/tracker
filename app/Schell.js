import React from 'react';
import { Link, IndexLink } from 'react-router';

class HeaderLogo extends React.Component {
  render() {
    return (
      <div className="left">
        <IndexLink to="/">gulp-watchify-graphql</IndexLink>
      </div>
    );
  }
}

class HeaderNav extends React.Component {
  render() {
    return (
      <div className="left">
        <ul className="header-nav left clearfix">
          <li className="header-nav-item left">
            <IndexLink to="/">Home</IndexLink>
          </li>
          <li className="header-nav-item left">
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li className="header-nav-item left">
            <Link to="/upload">Upload</Link>
          </li>
          <li className="header-nav-item left">
            <Link to="/login">Login</Link>
          </li>
          <li className="header-nav-item left">
            <Link to="/register">Register</Link>
          </li>
          <li className="header-nav-item left">
            <a href="/logout">Logout</a>
          </li>
          <li className="header-nav-item left">
            <a href="/authenticate">Authenticate</a>
          </li>
        </ul>
      </div>
    );
  }
}

class Schell extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="container clearfix">
            <HeaderLogo></HeaderLogo>
            <HeaderNav></HeaderNav>
          </div>
        </div>
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Schell;
