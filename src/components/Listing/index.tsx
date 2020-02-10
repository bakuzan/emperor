import React from 'react';

import groupBy from 'ayaka/groupBy';

import Table from '../Table';
import { Emperor } from '@/interfaces/Emperor';
import ListingItem, { ListingItemProps } from './ListingItem';

interface ListingProps<T extends Emperor> {
  title: string;
  data: T[];
  listItemComponent: React.FunctionComponent<ListingItemProps>;
  showInSingleTable: boolean;
  grouping: (x: T) => any;
}

const headers = [
  { text: '' },
  { text: 'Name' },
  { text: 'Reign From' },
  { text: 'Reign Until' },
  { text: 'Reign Length' }
];

function Listing<T extends Emperor>({
  title,
  showInSingleTable,
  ...props
}: ListingProps<T>) {
  const ItemRenderer = props.listItemComponent;
  const groups = groupBy(props.data, props.grouping);
  const tableGroups = Array.from(groups.entries());

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
        {!showInSingleTable &&
          tableGroups.map(([key, grp]) => (
            <Table key={key} headers={headers}>
              {grp.map((x, i, a) => (
                <ItemRenderer
                  key={x.id}
                  data={x}
                  group={key}
                  groupTotal={a.length}
                  showGroup={i === 0}
                />
              ))}
            </Table>
          ))}
        {showInSingleTable && (
          <Table headers={headers}>
            {tableGroups.map(([key, grp]) =>
              grp.map((x, i, a) => (
                <ItemRenderer
                  key={x.id}
                  data={x}
                  group={key}
                  groupTotal={a.length}
                  showGroup={i === 0}
                />
              ))
            )}
          </Table>
        )}
      </div>
    </section>
  );
}

Listing.defaultProps = {
  listItemComponent: ListingItem,
  showInSingleTable: false
};

export default Listing;
