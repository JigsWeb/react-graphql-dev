import gql from 'graphql-tag';

export const ARTICLES_QUERY = gql`
  query articles {
    articles {
      id
      title
    }
  }
`;

export const ARTICLE_ADDED_SUBSCRIPTION = gql`
  subscription articleAdded {
    articleAdded {
      id  
      title
    }
  }
`