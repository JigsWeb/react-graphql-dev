import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

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
            <div>
                <div>{articleDetailsData.article.title}</div>

                <h3>Commentaires:</h3>
                
                {this._renderComments()}
            </div>
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