import Relay from 'react-relay';
import { toGlobalId } from 'graphql-relay';

export const GroupMembersQueries = {
  vertex: (Component, { id, unbasedId }) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('vertex', { id, unbasedId }) }
      }
    }
  `,
};

exports.prepareGroupMembersParams = function (params, route) {
  return {
    id: toGlobalId('Group', parseInt(params.id, 10)),
    unbasedId: params.id
  };
}
