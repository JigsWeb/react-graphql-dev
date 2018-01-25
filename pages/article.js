import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import ArticleDetails from '../components/Article/Details';

import apolloClient from '../graphql/apolloClient';

class Article extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <ArticleDetails id={this.props.url.query.id} />
            </ApolloProvider>
        )
    }
}

export default Article;