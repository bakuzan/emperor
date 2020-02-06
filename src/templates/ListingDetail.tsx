import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ListingNavigation from '@/components/ListingNavigation';

import { EmperorDetail } from '@/interfaces/EmperorDetail';
import { EMPPage } from '@/interfaces/EMPPage';
import { Query } from '@/interfaces/Query';
import { rhythm } from '@/utils/typography';
import slugToDisplayName from '@/utils/slugToDisplayName';

const MarkdownSplitPoint = `[comment]: # 'breakpoint'`;

interface ListingDetailProps
  extends EMPPage<Query<EmperorDetail, 'markdownRemark'>> {}

export default function ListingDetail(props: ListingDetailProps) {
  const { data, pageContext, path } = props;
  const { rawMarkdownBody } = data.markdownRemark;

  const name = slugToDisplayName(path);
  const [topContent, coreContent] = rawMarkdownBody.split(MarkdownSplitPoint);

  console.log('DETAIL', props);

  // TODO
  // Show json data for each emperor next to the photo
  // Include a wikipedia link..(make it copyable ?)

  return (
    <Layout>
      <SEO title={name} />
      <ListingNavigation {...pageContext}>
        <h2
          style={{
            margin: rhythm(1 / 4)
          }}
        >
          {name}
        </h2>
      </ListingNavigation>
      <div>
        <div id="wikiPhoto" dangerouslySetInnerHTML={{ __html: topContent }} />
      </div>
      <div id="wikiDetail" dangerouslySetInnerHTML={{ __html: coreContent }} />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { regex: $slug } }) {
      id
      fields {
        slug
      }
      rawMarkdownBody
    }
  }
`;
