import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import GoTo from '@/components/GoTo';

import { Emperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';

interface HomeProps
  extends EMPPage<{ allEmperorsJson: { nodes: Emperor[] } }> {}

export default (props: HomeProps) => {
  const items: Emperor[] = props.data.allEmperorsJson.nodes;

  return (
    <Layout>
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
      <Listing
        title="Roman Emperors, in chronological order"
        data={items}
        grouping={(x) => x.house}
        showInSingleTable
      />
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
            fixed(width: 100, height: 144) {
              ...GatsbyImageSharpFixed
            }
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
