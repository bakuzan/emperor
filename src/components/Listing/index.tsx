import React from 'react';

import groupBy from 'ayaka/groupBy';

import Table from '../Table';
import { Emperor } from '@/interfaces/Emperor';
import ListingItem, { ListingItemProps } from './ListingItem';

interface ListingProps {
  title: string;
  data: Emperor[];
  listItemComponent: React.FunctionComponent<ListingItemProps>;
  grouping: (x: Emperor) => any;
}

const headers = [
  { text: '' },
  { text: 'Name' },
  { text: 'Reign From' },
  { text: 'Reign Until' },
  { text: 'Reign Length' }
];

function Listing({ title, ...props }: ListingProps) {
  const ItemRenderer = props.listItemComponent;
  const groups = groupBy(props.data, props.grouping);

  console.log('Listing > ', props, groups);

  // TODO
  // Sorting...
  // Filtering...

  return (
    <section>
      <header>
        <h3>{title}</h3>
      </header>
      <div>
        {Array.from(groups.entries()).map(([key, grp]) => (
          <Table key={key} headers={headers}>
            {grp.map((x, i) => (
              <ItemRenderer
                key={x.id}
                data={x}
                group={key}
                showGroup={i === 0}
              />
            ))}
          </Table>
        ))}
      </div>
    </section>
  );
}

Listing.defaultProps = {
  listItemComponent: ListingItem
};

export default Listing;
