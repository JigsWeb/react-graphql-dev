import React, { Component } from 'react';
import { graphql, ApolloProvider } from 'react-apollo';

import apolloClient from '../graphql/apolloClient'

import ArticleList from '../components/Article/List';

class App extends Component {

    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <ArticleList />
            </ApolloProvider>
        );
    }
}

export default App;