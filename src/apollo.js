import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'https://astralaura.ddev.site:5530/api',
});

const client = new ApolloClient({
  uri: 'https://astralaura.ddev.site:5530/api',
  cache: new InMemoryCache(),
  link: uploadLink
});

export default client;
