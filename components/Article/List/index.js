import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import Router from 'next/router';

import ArticleListWrapper from './wrapper';

import { renderWhileLoading } from '../../../graphql/helpers';

import { ARTICLES_QUERY } from './graphql';
import { ARTICLE_QUERY, ARTICLE_WITH_COMMENT_QUERY } from '../Details/graphql';

class ArticleList extends Component {

    /**
     * Prefetching for ArticleDetail component
     */
    _handleArticleOnMouseOver = id => () => {
        this.props.client.query({
            query: ARTICLE_QUERY,
            variables: { id }
        })

        this.props.client.query({
            query: ARTICLE_WITH_COMMENT_QUERY,
            variables: { id }
        })
    }

    _handleArticleOnClick = id => () => Router.push({ pathname: '/article', query: { id } });

    render() {
        return (
            <ArticleListWrapper>
                <ul>
                    {this.props.data.articles.map(article => (
                        <li 
                            key={article.id}
                            onClick={this._handleArticleOnClick(article.id)}
                            onMouseOver={this._handleArticleOnMouseOver(article.id)}>
                            {article.title}
                        </li>
                    ))}
                </ul>
            </ArticleListWrapper>
        )
    }
}

const ArticlesOnLoading = () => <div>Récupération des articles</div>

export default compose(
    graphql(ARTICLES_QUERY),
    withApollo,
    renderWhileLoading(ArticlesOnLoading) //Recompose fn
)(ArticleList);