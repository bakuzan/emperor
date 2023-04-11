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

type EmperorItem = { slug: string };
type Page = { fields: { slug: string } };

function findPage(items: EmperorItem[], index: number, pages: Page[]) {
  const item = items[index];
  const itemSlug = item.slug;
  return pages.find((x) => x.fields.slug.includes(itemSlug)) ?? null;
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions
}) => {
  const { createPage } = actions;

  const json = await graphql<AllQuery<EmperorItem, 'allEmperorsJson'>>(`
    {
      allEmperorsJson(sort: { daysSinceReignStart: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  const markdown = await graphql<AllQuery<Page, 'allMarkdownRemark'>>(`
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

  const items: EmperorItem[] =
    json.data?.allEmperorsJson.edges.map((x) => x.node) ?? [];

  const pages: Page[] =
    markdown.data?.allMarkdownRemark.edges.map((x) => x.node) ?? [];

  const maxIndex = pages.length - 1;
  const listingDetailTemplate = path.resolve(
    __dirname,
    '../src/templates/ListingDetail.tsx'
  );

  items.forEach((item, idx, aItems) => {
    const itemSlug = item.slug;
    const node = pages.find((x) => x.fields.slug.includes(itemSlug));

    if (!node) {
      console.warn(`No node found for emperor slug: ${itemSlug}`);
      process.exit(0);
    } else {
      const previous = idx === 0 ? null : findPage(aItems, idx - 1, pages);
      const next = idx === maxIndex ? null : findPage(aItems, idx + 1, pages);
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
