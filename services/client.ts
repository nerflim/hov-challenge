import { ApolloClient, InMemoryCache } from '@apollo/client';

const APP_URL = 'https://graphql-pokemon2.vercel.app';

const client = new ApolloClient({
  uri: APP_URL,
  cache: new InMemoryCache(),
});

export default client;
