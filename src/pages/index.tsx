import React from 'react';
import { graphql } from 'gatsby';

import Tabs from 'meiko/Tabs';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import GoTo from '@/components/GoTo';
import AnniversayHighlight from '@/components/AnniversayHighlight';

import { useMountedOnClient } from '@/hooks/useMountedOnClient';
import { Emperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';

interface HomeProps
  extends EMPPage<{ allEmperorsJson: { nodes: Emperor[] } }> {}

export default (props: HomeProps) => {
  const mounted = useMountedOnClient();
  const items: Emperor[] = props.data.allEmperorsJson.nodes;

  return (
    <Layout>
      {!mounted && (
        <style>
          {`.tabs__controls {
            margin: 0;
            list-style-type: none;
          }
  
          .tab-control {
            margin: 0;
          }
  
          .tab-control__button {
            background: none;
            border: 0;
            color: var(--background-colour);
          }`}
        </style>
      )}
      <SEO
        title="Home"
        description="Emperors of Rome displayed in chronological order"
      />

      <p>
        A chronological list of the men (and women) to don the purple.
        <br /> This includes all emperors from Augustus up to the fall of the
        Byzantine Empire in 1453.
      </p>

      <GoTo data={items} />
      <Tabs.Container defaultTab="Chronological">
        <Tabs.View name="Chronological">
          <Listing
            title="Roman Emperors, in chronological order"
            data={items}
            grouping={(x) => x.house}
            showInSingleTable
          />
        </Tabs.View>
        {mounted && (
          <Tabs.View name="Anniversaries">
            <AnniversayHighlight items={items} />
          </Tabs.View>
        )}
      </Tabs.Container>
    </Layout>
  );
};

export const query = graphql`
  query EmperorsQuery {
    allEmperorsJson(sort: { order: DESC, fields: daysSinceReignStart }) {
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
        birthplace
        succession
        reignStart
        reignEnd
        reignLengthInDays
        empire
        reignCount
      }
    }
  }
`;
