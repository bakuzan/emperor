import React from 'react';
import { graphql } from 'gatsby';

import filterFalsey from 'ayaka/helpers/filterFalsey';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import GoTo from '@/components/GoTo';

import { Emperor, RankedEmperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';
import { rhythm } from '@/utils/typography';
import orderEmperors from '@/utils/orderEmperors';

interface Rank {
  slug: string;
  rank: number;
}

interface RankingProps
  extends EMPPage<{
    allEmperorsJson: { nodes: Emperor[] };
    dataJson: { top10: Rank[]; mentions: Rank[]; bottom5: Rank[] };
  }> {}

const spacedOutPage = {
  margin: `${rhythm(2 / 3)} 0`
};

export default (props: RankingProps) => {
  const { top10, mentions, bottom5 } = props.data.dataJson;
  const allEmperors: Emperor[] = props.data.allEmperorsJson.nodes;

  function mapToRanked(x: Rank) {
    const emp = allEmperors.find((e) => e.slug === `/${x.slug}/`);
    return emp ? ({ ...x, ...emp } as RankedEmperor) : null;
  }

  const topEmperors = top10.map(mapToRanked).filter(filterFalsey);
  const bottomEmperors = bottom5.map(mapToRanked).filter(filterFalsey);
  const mentionsEmperors = orderEmperors(
    mentions.map(mapToRanked).filter(filterFalsey),
    'daysSinceReignEnd',
    false
  );

  const pageEmperors = [...topEmperors, ...mentionsEmperors, ...bottomEmperors];
  const goToEmperors = pageEmperors.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Layout>
      <SEO
        title="Ranking"
        description="My personal opinion on the best and worst Roman Emperors."
      />

      <GoTo data={goToEmperors} />
      <Listing
        title="Top 10 Roman Emperors"
        descriptionContent={
          <p style={spacedOutPage}>
            Who was the best Emperor of Rome? How do you measure best? Without
            getting too hung up on the reasoning, I've thrown out my personal
            top 10 emperors of Rome below. This will be updated as I learn about
            the Emperors.
          </p>
        }
        data={topEmperors}
        grouping={(x) => x.rank}
        showInSingleTable
        preserveGroupOrientation
      />

      <Listing
        title="Honourable mentions"
        descriptionContent={
          <p style={spacedOutPage}>
            Appearing here in chronological order are Emperors that didn't make
            the cut for a place in the Top 10.
            <br /> However, they still made an impression on me and would be
            first in line to move up.
          </p>
        }
        data={mentionsEmperors}
        grouping={() => 'Emperors'}
        showInSingleTable
      />

      <Listing
        title="The 5 Worst Roman Emperors"
        descriptionContent={
          <p style={spacedOutPage}>
            To contrast the top 10, I've included a bottom five Emperors as
            well.
          </p>
        }
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
            gatsbyImageData(width: 100, height: 144, layout: FIXED)
          }
        }
        house
        succession
        reignStart
        reignEnd
        reignLengthInDays
        birthplace
        daysSinceReignEnd
        empire
      }
    }
    dataJson {
      top10 {
        rank
        slug
      }
      mentions {
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
