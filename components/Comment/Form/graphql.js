import gql from 'graphql-tag';

import { ARTICLE_COMMENT_FRAGMENT } from '../List/graphql';

export const ADD_COMMENT_MUTATION = gql`
    mutation addComment($input: CommentCreateInput!) {
        addComment(input: $input) {
            ...CommentListComment
        }
    }

    ${ARTICLE_COMMENT_FRAGMENT}
`