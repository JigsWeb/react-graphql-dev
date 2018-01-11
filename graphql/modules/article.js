import gql from 'graphql-tag';

export const ARTICLES_QUERY = gql`
  query articles {
    articles {
      id
      title
    }
  }
`;

const ARTICLE_SUBSCRIPTION = gql`
  subscription article {
    article {
      type
      data { id, title }
    }
  }
`

export const subscribeArticleConfig = {
  document: ARTICLE_SUBSCRIPTION,
  updateQuery: (prev, { subscriptionData }) => {
      const article = subscriptionData.data.article;

      if(!article) {
        return prev;
      }

      switch (article.type) {
        case 'add':
          return { ...prev, articles: [article.data, ...prev.articles]}
        case 'update':
          return { ...prev, articles: prev.articles.map(a => a.id === article.data.id ? article.data : a )}
        case 'delete':
          return { ...prev, articles: prev.articles.filter(a => a.id !== article.data.id )}
      }
  }
}