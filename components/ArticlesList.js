import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { ARTICLES_QUERY, ARTICLE_ADDED_SUBSCRIPTION } from '../graphql/modules/article';

class ArticlesList extends Component {

    componentWillMount() {
        this.props.subscribeToNewArticles();
    }

    displayOnLoading = () => <div>Récupération des articles</div>

    displayList = () => <ul>
        {this.props.data.articles.map(article => <li key={article.id}>{article.title}</li>)}
    </ul> 

    render() {
        return this.props.data.loading ? this.displayOnLoading() : this.displayList();
    }
}

export default graphql(ARTICLES_QUERY, {
    name: 'data',
    props: (props) => {
        return {
            subscribeToNewArticles: () => {
                return props.data.subscribeToMore({
                    onError: (err) => console.error(err),
                    document: ARTICLE_ADDED_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        console.log(prev, subscriptionData);
                        if (!subscriptionData.data) {
                            return prev
                        }

                        const newFeedItem = subscriptionData.data.articleAdded;

                        return Object.assign({}, prev, { articles: [newFeedItem, ...prev.articles] });
                    }
                });
            },
            ...props
        };
    },
})(ArticlesList);