import { GatsbyNode } from 'gatsby';
import { createFilePath, createRemoteFileNode } from 'gatsby-source-filesystem';

import monthNames from 'ayaka/constants/monthNames';
import calculateReignLength from './utils/calculateReignLength';

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
      nodeItem.image___NODE = image.id;
    }

    const d = new Date();
    const today = `${d.getDate()} ${
      monthNames[d.getMonth()]
    } ${d.getFullYear()}`;

    nodeItem.daysSinceReignStart = calculateReignLength(
      nodeItem.reignStart,
      today
    );

    nodeItem.daysSinceReignEnd = calculateReignLength(nodeItem.reignEnd, today);

    nodeItem.reignLengthInDays = calculateReignLength(
      nodeItem.reignStart,
      nodeItem.reignEnd
    );
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
      value: `emperor${relativeFilePath}`
    });
  }
};
