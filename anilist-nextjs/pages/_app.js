import { ApolloProvider } from '@apollo/client/react'
import client from '../graphql/config'
import { AnimeProvider } from '../contexts/anime'
import CollectionProvider from '../contexts/collection'

import { globalStyles } from '../assets/styles/globalStyles'
import 'rsuite/dist/rsuite.min.css';

import Layout from '../components/Basic/Layout'

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
