import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ListingNavigation from '@/components/ListingNavigation';
import EmperorInfo from '@/components/EmperorInfo';

import { EmperorDetail } from '@/interfaces/EmperorDetail';
import { EMPPage } from '@/interfaces/EMPPage';
import { Query } from '@/interfaces/Query';
import { InDepthEmperor } from '@/interfaces/Emperor';
import { rhythm } from '@/utils/typography';
import slugToDisplayName from '@/utils/slugToDisplayName';
import preprocessScrapeHtml from '@/utils/preprocessScrapeHtml';

const MarkdownSplitPoint = `[comment]: # 'breakpoint'`;

type MutliQuery = Query<EmperorDetail, 'markdownRemark'> &
  Query<InDepthEmperor, 'emperorsJson'>;

interface ListingDetailProps extends EMPPage<MutliQuery> {}

export default function ListingDetail(props: ListingDetailProps) {
  const { data, pageContext, path } = props;
  const { rawMarkdownBody } = data.markdownRemark;

  const name = slugToDisplayName(path);
  const [topContent, coreContent] = rawMarkdownBody.split(MarkdownSplitPoint);

  console.log('DETAIL', props);

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: `0 ${rhythm(1)}`
        }}
      >
        <EmperorInfo data={data.emperorsJson} />
        <div
          id="wikiPhoto"
          dangerouslySetInnerHTML={{ __html: preprocessScrapeHtml(topContent) }}
        />
      </div>
      <div
        id="wikiDetail"
        dangerouslySetInnerHTML={{ __html: preprocessScrapeHtml(coreContent) }}
      />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      rawMarkdownBody
    }
    emperorsJson(slug: { eq: $slug }) {
      slug
      name
      dateOfBirth
      birthplace
      dateOfDeath
      deathplace
      succession
      reignStart
      reignEnd
      reignLengthInDays
    }
  }
`;
