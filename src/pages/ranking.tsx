import React from 'react';
import { graphql } from 'gatsby';

import NewTabLink from 'meiko/NewTabLink';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import { Emperor, RankedEmperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';
import filterFalsey from '@/utils/filterFalsey';

interface Rank {
  slug: string;
  rank: number;
}

interface RankingProps
  extends EMPPage<{
    allEmperorsJson: { nodes: Emperor[] };
    dataJson: { top10: Rank[]; bottom5: Rank[] };
  }> {}

export default (props: RankingProps) => {
  const { top10, bottom5 } = props.data.dataJson;
  const emperors: Emperor[] = props.data.allEmperorsJson.nodes;

  function mapToRanked(x: Rank) {
    const emp = emperors.find((e) => e.slug === `/${x.slug}/`);
    return emp ? ({ ...x, ...emp } as RankedEmperor) : null;
  }

  const topEmperors = top10.map(mapToRanked).filter(filterFalsey);
  const bottomEmperors = bottom5.map(mapToRanked).filter(filterFalsey);

  return (
    <Layout>
      <SEO
        title="Ranking"
        description="My personal opinion on the best and worst Roman Emperors."
      />

      <p>
        Who was the best Emperor of Rome? How do you measure best? Without
        getting too hung up on the reasoning, I've thrown out my personal top 10
        emperors of Rome below. This will be updated as I learn about the
        Emperors.
      </p>
      <p> Just for contrast, I've included the bottom five as well.</p>

      <Listing
        title="Top 10 Roman Emperors"
        data={topEmperors}
        grouping={(x) => x.rank}
        showInSingleTable
        preserveGroupOrientation
      />
      <Listing
        title="The 5 Worst Roman Emperors"
        data={bottomEmperors}
        grouping={(x) => x.rank}
        showInSingleTable
        preserveGroupOrientation
      />
    </Layout>
  );
};

export const query = graphql`
  query EmperorsRankedQuery {
    allEmperorsJson {
      nodes {
        id
        slug
        name
        image {
          childImageSharp {
            fixed(width: 100, height: 144) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        house
        succession
        reignStart
        reignEnd
        reignLengthInDays
        birthplace
        empire
      }
    }
    dataJson {
      top10 {
        rank
        slug
      }
      bottom5 {
        rank
        slug
      }
    }
  }
`;
