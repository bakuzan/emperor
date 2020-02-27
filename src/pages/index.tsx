import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
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

      <p>A chronological list of the men (and women) to don the purple.</p>
      <p>
        You may notice that the list ends prematurely - this will be rectified
        when I have time, with the goal of including all emperors up to the fall
        of the Byzantine Empire in 1453.
      </p>

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
        daysSinceReignStart
        empire
      }
    }
  }
`;
