import React, { useState } from 'react';
import { graphql } from 'gatsby';

import ClearableInput from 'meiko/ClearableInput';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Listing, { SortKey } from '@/components/Listing';
import GoTo from '@/components/GoTo';

import { useMountedOnClient } from '@/hooks/useMountedOnClient';
import { Emperor } from '@/interfaces/Emperor';
import { EMPPage } from '@/interfaces/EMPPage';
import orderEmperors from '@/utils/orderEmperors';

interface HomeProps
  extends EMPPage<{ allEmperorsJson: { nodes: Emperor[] } }> {}

function getTitle(key: SortKey, isDesc: boolean) {
  const direction = isDesc ? 'descending' : 'ascending';
  let sortText = 'ordered chronological';

  if (key === 'name') {
    sortText = 'ordered alphabetical';
  } else if (key === 'reignLengthInDays') {
    sortText = 'ordered by reign length';
  } else {
    sortText +=
      key === 'daysSinceReignStart'
        ? ' (on reign start date)'
        : key === 'daysSinceReignEnd'
        ? ' (on reign end date)'
        : '';
  }

  return `Roman Emperors ${sortText} (${direction})`;
}

export default (props: HomeProps) => {
  const mounted = useMountedOnClient();
  const [searchString, setSearchString] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('daysSinceReignStart');
  const [isDesc, setIsDesc] = useState<boolean>(false);

  const title = getTitle(sortKey, isDesc);
  const lowerSearch = searchString.toLocaleLowerCase();

  const items: Emperor[] = props.data.allEmperorsJson.nodes;
  const filteredItems = orderEmperors(
    items.filter((x) => x.name.toLocaleLowerCase().includes(lowerSearch)),
    sortKey,
    isDesc
  );

  return (
    <Layout>
      <SEO
        title="Explore"
        description="Explore the Emperors of Rome searching for them by name and sorting on a variety of fields."
      />
      {mounted && (
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
      )}
      <GoTo data={filteredItems} />
      <Listing
        title={title}
        data={filteredItems}
        grouping={() => 'Emperors'}
        showInSingleTable
        isSortDesc={isDesc}
        sortKey={sortKey}
        onSortToggle={(k) => {
          setIsDesc((p) => (sortKey === k ? !p : p));
          setSortKey(k);
        }}
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
            gatsbyImageData(width: 100, height: 144, layout: FIXED)
          }
        }
        house
        succession
        reignStart
        reignEnd
        reignLengthInDays
        daysSinceReignStart
        daysSinceReignEnd
        empire
        reignCount
      }
    }
  }
`;
