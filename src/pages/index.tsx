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
      }
    }
  }
`;
