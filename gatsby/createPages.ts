import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  boundActionCreators
}) => {
  const result = await graphql(`
    {
      allEmperorsJson {
        edges {
          node {
            id
            slug
            house
          }
        }
      }
    }
  `);

  console.log('createPages ? ', result);
  // TODO Create a page for each emperor
};
