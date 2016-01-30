export const AuthenticateQueries = {
  authenticate: () => Relay.QL`
    query {
      authenticate
    }
  `,
};
