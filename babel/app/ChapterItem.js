import React from 'react';
import { Link } from 'react-router';
import { fromGlobalId } from 'graphql-relay';
import moment from 'moment';

class ChapterItem extends React.Component {
  render() {
    let groups;
    const length = this.props.groups.edges.length;

    if (length === 1) {
      groups = (<span className="group-link">
        <Link to={'/group/' + fromGlobalId(this.props.groups.edges[0].node.id).id}>
          {this.props.groups.edges[0].node.group_name}
        </Link>
      </span>);
    } else if (length > 1) {
      groups = this.props.groups.edges.map((edge, i) => {
        if (i === length - 1) {
          return (
            <span key={i} className="group-link">
              <Link to={'/group/' + fromGlobalId(edge.node.id).id}>
                {edge.node.group_name}
              </Link>
            </span>
          );
        } else {
          return (
            <span key={i} className="group-link">
              <Link to={'/group/' + fromGlobalId(edge.node.id).id}>
                {edge.node.group_name}
              </Link>&
            </span>
          );
        }
      });
    } else {
      groups = 'anon';
    }

    const manga_title = <Link to={'/manga/' + fromGlobalId(this.props.manga.id).id}>{this.props.manga.manga_title}</Link>;
    const chapter_title_number = <Link to={'/chapter/' + fromGlobalId(this.props.id).id}>({this.props.chapter_number}) {this.props.chapter_title}</Link>;

    return (
      <tr className="chapter-item">
        <td className="info">
            [{groups}] {manga_title} - {chapter_title_number}
        </td>
        <td className="created">
          {moment(this.props.created).fromNow()}
        </td>
      </tr>
    );
  }
}

module.exports = ChapterItem;


//this.props.chapter_title
//this.props.manga.
//
//<ChapterItem groups={} manga_id={} manga_title={} chapter_title={} chapter_number={} chapter_id={} />
//
