import React from 'react';
import { graphql } from 'gatsby';

import NewTabLink from 'meiko/NewTabLink';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import Bio from '@/components/Bio';
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
    dataJson: { unranked: string[]; ranked: Rank[] };
  }> {}

export default (props: RankingProps) => {
  const { unranked, ranked } = props.data.dataJson;
  const emperors: Emperor[] = props.data.allEmperorsJson.nodes;

  function mapToRanked(x: Rank) {
    const emp = emperors.find((e) => e.slug === x.slug);
    return emp ? ({ ...x, ...emp } as RankedEmperor) : null;
  }

  const rankedEmperors = ranked.map(mapToRanked).filter(filterFalsey);

  /** TODO
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

      <p>
        While listening to the fantastic{' '}
        <NewTabLink
          href={'https://thehistoryofrome.typepad.com/the_history_of_rome/'}
        >
          History of Rome podcast
        </NewTabLink>
        I started picking favourites with the emperors until I decided I might
        as well rank them all. Below you can find my personal ranked order.
      </p>

      <Listing
        title="Roman Emperors, ranked"
        data={rankedEmperors}
        grouping={(x) => x.rank}
        showInSingleTable
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
