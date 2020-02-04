import React from 'react';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Bio from '@/components/Bio';

export default ({}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <aside>
        <Bio />
      </aside>
      <section>
        <header>
          <h3>Roman Emperors, in chronological order</h3>
        </header>
        <div>TODO put table of emperors here, display them all nice like.</div>
      </section>
    </Layout>
  );
};
