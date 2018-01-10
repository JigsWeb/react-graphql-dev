import gql from 'graphql-tag';

export const articlesListQuery = gql`
  query ArticlesListQuery {
    articles {
      id
      title
    }
  }
`;

export const articleAddedSubscription = gql`
  subscription articleAdded($channelId: ID!) {
    articleAdded {
      id  
      title
    }
  }
`