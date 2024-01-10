import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://astralaura.ddev.site:5530/api',
  cache: new InMemoryCache(),
});

export default client;
