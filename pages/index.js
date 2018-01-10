import React, { Component } from 'react';
import { graphql, ApolloProvider } from 'react-apollo';

import apolloClient from '../graphql/apolloClient'

import ArticlesList from '../components/ArticlesList';

class App extends Component {

    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <div>
                    <h1>Articles</h1>

                    <ArticlesList />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;