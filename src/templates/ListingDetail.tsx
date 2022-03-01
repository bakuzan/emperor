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

import './ListingDetail.scss';

const MarkdownSplitPoint = `[comment]: # 'breakpoint'`;

type MutliQuery = Query<EmperorDetail, 'markdownRemark'> &
  Query<InDepthEmperor, 'emperorsJson'>;

interface ListingDetailProps extends EMPPage<MutliQuery> {}

export default function ListingDetail(props: ListingDetailProps) {
  const { data, pageContext, path } = props;
  const { rawMarkdownBody } = data.markdownRemark;

  const name = slugToDisplayName(path);
  const [topContent, coreContent] = rawMarkdownBody.split(MarkdownSplitPoint);

  return (
    <Layout>
      <SEO title={name} />
      <ListingNavigation {...pageContext}>
        <h2
          style={{
            color: `var(--text-colour)`,
            margin: rhythm(1 / 4)
          }}
        >
          {name}
        </h2>
      </ListingNavigation>
      <div
        className="listing-detail-top"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: `0 ${rhythm(1)}`,
          margin: `${rhythm(1)} 0`
        }}
      >
        <div
          id="wikiPhoto"
          dangerouslySetInnerHTML={{ __html: preprocessScrapeHtml(topContent) }}
        />
        <EmperorInfo data={data.emperorsJson} />
      </div>
      <div
        id="wikiDetail"
        dangerouslySetInnerHTML={{ __html: preprocessScrapeHtml(coreContent) }}
      />
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
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
      house
      succession
      reignStart
      reignEnd
      fields {
        reignLengthInDays
      }
    }
  }
`;
