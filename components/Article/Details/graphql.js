import gql from 'graphql-tag';

import { ARTICLE_COMMENT_FRAGMENT } from '../../Comment/List/graphql';

export const ARTICLE_QUERY = gql`
    query article($id: String!) {
        article(id: $id) {
            id
            title
            text
            author {
            firstName
            lastName
            }
        }
    }
`

export const ARTICLE_WITH_COMMENT_QUERY = gql`
    query article($id: String!) {
    article(id: $id) {
        id
        comments {
        ...CommentListComment
        }
    }
    }

    ${ARTICLE_COMMENT_FRAGMENT}
`