import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CommentListWrapper from './wrapper';

class CommentList extends Component {
    render() {
        const { loading, error, article } = this.props;

        if(loading) {
            return <div>Commentaires en récupération...</div>
        }

        const comments = article.comments;

        if(!comments.length) {
            return <div className="no-comments">Aucun commentaire</div>
        }

        return (
            <CommentListWrapper>
                <ul>
                    {comments.map(c => (
                        <li key={c.id}>
                            <span className="text">{c.text}</span> 
                            <span className="author">{c.author.firstName} {c.author.lastName}</span>
                        </li>
                    ))}
                </ul>
            </CommentListWrapper>
        )
    }
}

CommentList.fragments = {
    comment: gql`
        fragment CommentListComment on Comment {
            id
            text
            author {
                id
                firstName
                lastName
            }
        }
    `
}

export default CommentList;