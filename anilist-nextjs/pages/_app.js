import { ApolloProvider } from '@apollo/client/react'
import client from '../config/graphql'
import { AnimeProvider } from '../contexts/anime'
import CollectionProvider from '../contexts/collection'

import { globalStyles } from '../styles/globalStyles'
import 'rsuite/dist/rsuite.min.css';

import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AnimeProvider>
        <CollectionProvider>
          {globalStyles}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CollectionProvider>
      </AnimeProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
