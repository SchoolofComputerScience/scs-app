import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';

const host = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/graph'
  : process.env.STAGE_SCS_API

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: host,
    transportBatching: true,
    ssrMode: true
  })
})

export default apolloClient;
