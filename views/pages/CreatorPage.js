import React from 'react';
import Relay from 'react-relay';
import { Link, IndexLink } from 'react-router';
import queryString from 'query-string';

import { fromGlobalId } from 'graphql-relay';

import ChapterItem from '../components/ChapterItem.js';
import PaginationButton from './PaginationButton.js';

class CraetorPage extends React.Component {
  render() {
    return (
      <div>
        <div className="info clearfix">
          <table className="info-column-left">
            <tbody>
              <td>Name: </td>
              <td></td>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
