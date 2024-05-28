import 'styles/globals.css'

import type { AppProps } from 'next/app'
import store from 'store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { getGqlEndpoint } from 'utils/helper';
import { HeadSEO } from 'layout/Components'
import Layout from 'layout'

export default function App({ Component, pageProps }: AppProps) {
    const persistor = persistStore(store)
    const apolloClient = new ApolloClient({
        uri: getGqlEndpoint('product'),
        cache: new InMemoryCache()
    });

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={apolloClient}>
                    <HeadSEO />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    )
}