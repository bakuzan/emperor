import * as path from 'path';
import { GatsbyNode } from 'gatsby';

type AllQuery<T, K extends string> = {
  [key in K]: {
    edges: [
      {
        node: T;
      }
    ];
  };
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions
}) => {
  const { createPage } = actions;

  const json = await graphql<AllQuery<any, 'allEmperorsJson'>>(`
    {
      allEmperorsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  const markdown = await graphql<AllQuery<any, 'allMarkdownRemark'>>(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (!json.data || !markdown.data) {
    throw json.errors || markdown.errors || 'Failed to create pages';
  }

  const items = json.data?.allEmperorsJson.edges.map((x) => x.node) ?? [];
  const pages = markdown.data?.allMarkdownRemark.edges.map((x) => x.node) ?? [];

  const maxIndex = pages.length - 1;
  const listingDetailTemplate = path.resolve(
    __dirname,
    '../src/templates/ListingDetail.tsx'
  );

  items.forEach((item, index) => {
    const node = pages.find((x) => x.fields.slug === item.slug);

    if (node) {
      const previous = index === maxIndex ? null : pages[index + 1];
      const next = index === 0 ? null : pages[index - 1];
      const slug = node.fields.slug;

      createPage({
        path: slug,
        component: listingDetailTemplate,
        context: {
          slug,
          previous,
          next
        }
      });
    }
  });
};
