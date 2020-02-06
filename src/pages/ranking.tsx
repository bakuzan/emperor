import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import Bio from '@/components/Bio';
import { Emperor, RankedEmperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';

interface Rank {
  slug: string;
  rank: number;
}

interface RankingProps
  extends EMPPage<{
    allEmperorsJson: { nodes: Emperor[] };
    dataJson: { unranked: string[]; ranked: Rank[] };
  }> {}

export default (props: RankingProps) => {
  const { unranked, ranked } = props.data.dataJson;
  const emperors: Emperor[] = props.data.allEmperorsJson.nodes;

  const rankedEmperors: RankedEmperor[] = ranked
    .map((x) => {
      const emp = emperors.find((e) => e.slug === x.slug);
      return emp ? { ...x, ...emp } : null;
    })
    .filter((x) => x !== null);

  /**
   *  Sort by rank
   *  Group by rank
   *
   *  Display unranked...
   */

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

      <Listing
        title="Roman Emperors, ranked"
        data={rankedEmperors}
        grouping={(x) => x.house}
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
        reignStart
        reignEnd
        reignLengthInDays
        birthplace
      }
    }
    dataJson {
      unranked
      ranked {
        rank
        slug
      }
    }
  }
`;
