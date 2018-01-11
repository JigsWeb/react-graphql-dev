import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { ARTICLES_QUERY, subscribeArticleConfig } from '../graphql/modules/article';

class ArticlesList extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.data.loading && this.props.data.articles && !this.unsubscribe) {
            this.unsubscribe = this.props.subscribeArticle();
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
    props: (props) => ({
        subscribeArticle: () => props.data.subscribeToMore(subscribeArticleConfig),
        ...props
    }),
})(ArticlesList);