import { ApolloClient, InMemoryCache } from "@apollo/client";


export const cache = new InMemoryCache()

const client = new ApolloClient({
  ssrMode: true,
  cache,
  uri: 'https://graphql.anilist.co'
})


export default client