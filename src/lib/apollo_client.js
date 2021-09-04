import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://popular-bear-92.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      'hFiR2lYlaYEP1RTEaYSQiq8lVczYnhRMoud47JxJylUJtkRDbMEdbOqzWGisanln',
  },
});

export default client;
