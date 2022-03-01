import { GatsbyNode } from 'gatsby';
import { createFilePath, createRemoteFileNode } from 'gatsby-source-filesystem';

import monthNames from 'ayaka/constants/monthNames';
import calculateTimespan from './utils/calculateTimespan';

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  getNode,
  actions,
  store,
  cache
}) => {
  const { createNodeField } = actions;

  // Main emperors data
  if (node.internal.type === 'EmperorsJson') {
    const { createNode } = actions;

    const nodeItem = node as any;
    const nodeImage = node.image as string;

    const image = await createRemoteFileNode({
      url: nodeImage,
      store,
      cache,
      createNode,
      createNodeId: (id: string) => `image-${id}`,
      reporter: {} // make typescript behave.
    });

    if (image) {
      createNodeField({
        node,
        name: 'imageFile',
        value: image.id
      });
    }

    const d = new Date();
    const month = monthNames[d.getMonth()];
    const today = `${d.getDate()} ${month} ${d.getFullYear()}`;

    createNodeField({
      node,
      name: 'daysSinceReignStart',
      value: calculateTimespan(nodeItem.reignStart, today)
    });
    createNodeField({
      node,
      name: 'daysSinceReignEnd',
      value: calculateTimespan(nodeItem.reignEnd, today)
    });
    createNodeField({
      node,
      name: 'reignLengthInDays',
      value: calculateTimespan(nodeItem.reignStart, nodeItem.reignEnd)
    });

    // Fix slug...
    createNodeField({
      node,
      name: 'slug',
      value: `/${nodeItem.slug}/`
    });
  }

  // Details pages
  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `content/data/`
    });

    createNodeField({
      node,
      name: 'slug',
      value: relativeFilePath
    });
  }
};
