import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CommentList extends Component {
    render() {
        const { loading, error, article } = this.props;

        if(loading) {
            return <div>Commentaires en récupération...</div>
        }

        const comments = article.comments;

        if(!comments.length) {
            return <div>Aucun commentaire</div>
        }

        return (
            <div>
                <ul>
                    {comments.map(c => (
                        <li key={c.id}>{c.text} par {c.author.firstName} {c.author.lastName}</li>
                    ))}
                </ul>
            </div>
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