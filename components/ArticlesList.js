import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { ARTICLES_QUERY, ARTICLE_ADDED_SUBSCRIPTION } from '../graphql/modules/article';

class ArticlesList extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.data.loading && this.props.data.articles && !this.unsubscribe) {
            this.unsubscribe = this.props.subscribeToNewArticles();
        }
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
    props: (props) => {
        return {
            subscribeToNewArticles: () => {
                return props.data.subscribeToMore({
                    document: ARTICLE_ADDED_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        const newArticle = subscriptionData.data.articleAdded;

                        return newArticle ? { ...prev, articles: [newArticle, ...prev.articles]} : prev;
                    }
                });
            },
            ...props
        };
    },
})(ArticlesList);