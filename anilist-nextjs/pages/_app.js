import { ApolloProvider } from '@apollo/client/react'
import client from '../config/graphql'
import { AnimeProvider } from '../contexts/anime'

import { globalStyles } from '../styles/globalStyles'

import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AnimeProvider>
        {globalStyles}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimeProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
