import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { articlesListQuery } from '../graphql/modules/article';

class ArticlesList extends Component {

    displayOnLoading = () => <div>Récupération des articles</div>

    displayList = () => <ul>
        {this.props.data.articles.map(article => <li key={article.id}>{article.title}</li>)}
    </ul> 

    render() {
        return this.props.data.loading ? this.displayOnLoading() : this.displayList();
    }
}

export default graphql(articlesListQuery)(ArticlesList);