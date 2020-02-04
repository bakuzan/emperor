import React from 'react';
import { Link } from 'gatsby';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Page Not Found" />
    <h2>Not Found</h2>
    <p>This is not the page you are looking for...</p>
    <Link to="/">Return to the homepage</Link>
  </Layout>
);

export default NotFoundPage;
