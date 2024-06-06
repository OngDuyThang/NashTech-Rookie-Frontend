import 'styles/globals.css'

import type { AppProps } from 'next/app'
import store from 'store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, fromPromise } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { autoLogout, getAccessToken, getGqlEndpoint, getUrlEndpoint, isSession, replaceAccessToken } from 'utils/helper';
import { HeadSEO } from 'layout/Components'
import Layout from 'layout'
import { API_AUTH_PORT, API_HOST, API_METHOD, SERVICE } from 'utils/constant';
import { axiosClient } from 'api/axios';
import { AUTH } from 'types/auth';
import { onError } from '@apollo/client/link/error';
import { jwtDecode } from 'jwt-decode';

export default function App({ Component, pageProps }: AppProps) {
    const persistor = persistStore(store)
    const apolloClient = new ApolloClient({
        link: ApolloLink.from([authLink, errorLink, httpLink]),
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

const httpLink = createHttpLink({
    uri: ({ getContext }) => {
        const { service } = getContext();

        switch (service) {
            case SERVICE.CART:
                return getGqlEndpoint(SERVICE.CART);
            case SERVICE.ORDER:
                return getGqlEndpoint(SERVICE.ORDER);
            default:
                return getGqlEndpoint(SERVICE.PRODUCT);
        }
    },
    credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
    const accessToken = getAccessToken();

    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors && (graphQLErrors?.[0] as any)?.statusCode == 401 && isSession()) {
        const currentAccessToken = getAccessToken()
        const payload = jwtDecode(currentAccessToken)

        if (currentAccessToken && payload && Date.now() >= Number(payload?.exp) * 1000) {
            return fromPromise(
                getNewAccessToken(currentAccessToken).catch(() => autoLogout())
            ).flatMap((newAccessToken) => {
                if (!newAccessToken) {
                    autoLogout()
                    return forward(operation);
                }

                replaceAccessToken(newAccessToken)
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                    headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${newAccessToken}`,
                    },
                });
                // Retry the request with the new token
                return forward(operation);
            });
        }
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const getNewAccessToken = async (
    currentAccessToken: string
) => {
    const url = getUrlEndpoint(
        API_HOST,
        API_AUTH_PORT,
        '/auth/refresh'
    )
    const { data } = await axiosClient.post(url, {
        [AUTH.ACCESS_TOKEN]: currentAccessToken
    })

    return data?.data?.[AUTH.ACCESS_TOKEN] as string
}

// const httpLink = createHttpLink({
//     uri: getGqlEndpoint('product'),
//     credentials: 'include'
// });