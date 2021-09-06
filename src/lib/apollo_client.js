import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://popular-bear-92.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'hFiR2lYlaYEP1RTEaYSQiq8lVczYnhRMoud47JxJylUJtkRDbMEdbOqzWGisanln',
  },
});

const wsLink =
  typeof window !== 'undefined'
    ? new WebSocketLink({
        uri: 'wss://popular-bear-92.hasura.app/v1/graphql',
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              'x-hasura-admin-secret':
                'hFiR2lYlaYEP1RTEaYSQiq8lVczYnhRMoud47JxJylUJtkRDbMEdbOqzWGisanln',
            },
          },
        },
      })
    : null;

const splitLink =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
