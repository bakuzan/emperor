import React, { useState } from 'react';
import { graphql } from 'gatsby';

import ClearableInput from 'meiko/ClearableInput';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing from '@/components/Listing';
import { Emperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';

interface HomeProps
  extends EMPPage<{ allEmperorsJson: { nodes: Emperor[] } }> {}

export default (props: HomeProps) => {
  const [searchString, setSearchString] = useState('');
  const lowerSearch = searchString.toLocaleLowerCase();

  const items: Emperor[] = props.data.allEmperorsJson.nodes;
  const filteredItems = items.filter((x) =>
    x.name.toLocaleLowerCase().includes(lowerSearch)
  );

  console.log('Explore >', props);

  /* TODO
   * make sortable on reign length,...
   */

  return (
    <Layout>
      <SEO
        title="Explore"
        description="Explore the Emperors of Rome searching for them by name and sorting on a variety of fields."
      />
      <div>
        <ClearableInput
          id="search"
          name="search"
          label="Filter emperors by name"
          value={searchString}
          onChange={(e) => {
            const element = e.target as HTMLInputElement;
            setSearchString(element.value);
          }}
        />
      </div>
      <Listing
        title={'Roman Emperors, in chronological order'}
        data={filteredItems}
        grouping={(x) => 'Emperors'}
        showInSingleTable
      />
    </Layout>
  );
};

export const query = graphql`
  query ExploreEmperorsQuery {
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
  }
`;
