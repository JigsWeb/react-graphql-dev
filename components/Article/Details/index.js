import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import ArticleDetailsWrapper from './wrapper';
import CommentList from '../../Comment/List';
import CommentForm from '../../Comment/Form';

import { ADD_COMMENT_MUTATION } from '../../Comment/Form/graphql';

import {
    ARTICLE_QUERY,
    ARTICLE_WITH_COMMENT_QUERY,
} from './graphql';

class ArticleDetails extends Component {

    _renderComments = () => {
        const { commentListData, submitComment } = this.props;

        return (
            <div className="comment-part">
                <CommentList {...commentListData} />

                <CommentForm submitComment={submitComment} />
            </div>
        )
    }

    render() {
        const { articleDetailsData } = this.props;

        if(articleDetailsData.loading) {
            return <div>Onload</div>
        }

        return (
            <ArticleDetailsWrapper>
                <h1>{articleDetailsData.article.title}</h1>

                <p>{articleDetailsData.article.text}</p>

                <h2>Commentaires</h2>
                
                {this._renderComments()}
            </ArticleDetailsWrapper>
        )
    }
}

const withArticleDetailsData = graphql(ARTICLE_QUERY, {
    name: "articleDetailsData",
    options: ({ id }) => ({ variables: { id } })
});

const withCommentListData = graphql(ARTICLE_WITH_COMMENT_QUERY, {
    name: "commentListData",
    options: ({ id }) => ({ variables: { id } }),
});

const withSubmitComment = graphql(ADD_COMMENT_MUTATION, {
    name: "submitComment",
    props: ({ submitComment, ownProps: { id } }) => ({ 
        submitComment: text => submitComment({ 
            variables: { input: { _article: id, text } },
            update: (proxy, { data: { addComment: comment }}) => {
                const data = proxy.readQuery({ query: ARTICLE_WITH_COMMENT_QUERY, variables: { id } });
                
                data.article.comments.push(comment);
            
                proxy.writeQuery({ query: ARTICLE_WITH_COMMENT_QUERY, data });
            },
        }),
    })
})

const withData = compose(
    withCommentListData,
    withArticleDetailsData,
    withSubmitComment,
)

export default withData(ArticleDetails);