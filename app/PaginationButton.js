import React from 'react';
import { Link } from 'react-router';
import { fromGlobalId } from 'graphql-relay';
import queryString from 'query-string';
import objectAssign from 'object-assign';

class PaginationButton extends React.Component {
  render() {
    let url;
    let obj;

    if (this.props.nextPage) {
      obj = objectAssign({}, this.props.query);

      //Check if page is 0, if it is, then set query.page to 1. Will bug otherwise with NaN.
      if (!this.props.query.page) {
        obj.page = 1;
        url = this.props.pathname + '?' + queryString.stringify(obj);
      } else {
        obj.page = parseInt(obj.page) + 1;
        url = this.props.pathname + '?' + queryString.stringify(obj);
      }

    } else {
      obj = objectAssign({}, this.props.query);
      obj.page = parseInt(obj.page) - 1;

      url = this.props.pathname + '?' + queryString.stringify(obj);
    }

    return (
      <Link to={url} onClick={this.props.onClick}>{this.props.text}</Link>
    );
  }
}

module.exports = PaginationButton;
