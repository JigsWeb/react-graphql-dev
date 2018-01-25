import gql from 'graphql-tag';

export const ARTICLE_COMMENT_FRAGMENT = gql`
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