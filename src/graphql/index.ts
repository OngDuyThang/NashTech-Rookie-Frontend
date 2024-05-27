import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getGqlEndpoint } from 'utils/helper';

const apolloClient = new ApolloClient({
    uri: getGqlEndpoint('product'),
    cache: new InMemoryCache()
});

export default apolloClient;