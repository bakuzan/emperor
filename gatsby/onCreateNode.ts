import { GatsbyNode } from 'gatsby';
import { createRemoteFileNode } from 'gatsby-source-filesystem';

import calculateReignLength from './utils/calculateReignLength';

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions,
  store,
  cache
}) => {
  if (node.internal.type !== 'EmperorsJson') {
    return;
  }

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

  nodeItem.reignLengthInDays = calculateReignLength(
    nodeItem.reignStart,
    nodeItem.reignEnd
  );
};
