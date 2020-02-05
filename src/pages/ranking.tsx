import React from 'react';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Bio from '@/components/Bio';
import Listing from '@/components/Listing';

export default ({}) => {
  return (
    <Layout>
      <SEO
        title="Ranking"
        description="Roman Emperors ranked from best to worst, by Bakuzan"
      />
      <aside>
        <Bio />
      </aside>

      <p>TODO explain what the ranking is</p>

      <Listing title="Roman Emperors, ranked" />
    </Layout>
  );
};
