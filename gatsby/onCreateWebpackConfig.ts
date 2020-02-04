import { GatsbyNode } from 'gatsby';
import * as path from 'path';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    }
  });
};
