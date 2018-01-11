import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'node-fetch';

import { SUBSCRIPTION_HOST, GRAPHQL_HOST } from '../config';

let link = new HttpLink({ uri: GRAPHQL_HOST, fetch: fetch });
console.log(process.browser)
if(process.browser) {
    const wsLink = new WebSocketLink({
        uri: SUBSCRIPTION_HOST,
        options: {
            reconnect: true
        },
    });

    link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            console.log("QUERY", query)
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        link,
    );
}

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

export default apolloClient;