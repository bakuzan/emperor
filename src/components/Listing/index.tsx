import React from 'react';

import groupBy from 'ayaka/groupBy';
import Icons from 'meiko/constants/icons';

import Table, { TableHeader } from '../Table';
import { Emperor } from '@/interfaces/Emperor';
import ListingItem, { ListingItemProps } from './ListingItem';

export type SortKey =
  | 'name'
  | 'reignLengthInDays'
  | 'daysSinceReignStart'
  | 'daysSinceReignEnd';

interface ListingProps<T extends Emperor> {
  title: string;
  data: T[];
  listItemComponent: React.FunctionComponent<ListingItemProps>;
  showInSingleTable: boolean;
  preserveGroupOrientation?: boolean;
  isSortDesc?: boolean;
  sortKey?: SortKey;
  grouping: (x: T) => any;
  onSortToggle?: (key: SortKey) => void;
}

const headers: TableHeader<SortKey>[] = [
  { text: '' },
  { text: 'Name', sortKey: 'name' },
  { text: 'Reign From', sortKey: 'daysSinceReignStart' },
  { text: 'Reign Until', sortKey: 'daysSinceReignEnd' },
  { text: 'Reign Length', sortKey: 'reignLengthInDays' }
];

function Listing<T extends Emperor>({
  title,
  showInSingleTable,
  ...props
}: ListingProps<T>) {
  const ItemRenderer = props.listItemComponent;
  const groups = groupBy(props.data, props.grouping);
  const tableGroups = Array.from(groups.entries());
  const sortIcon = props.isSortDesc ? Icons.down : Icons.up;

  return (
    <section>
      <header>
        <h3 style={{ color: `inherit` }}>{title}</h3>
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
                  preserveGroupOrientation={props.preserveGroupOrientation}
                />
              ))}
            </Table>
          ))}
        {showInSingleTable && (
          <Table
            headers={headers}
            sortIcon={sortIcon}
            sortKey={props.sortKey}
            onSort={props.onSortToggle}
          >
            {tableGroups.map(([key, grp]) =>
              grp.map((x, i, a) => (
                <ItemRenderer
                  key={x.id}
                  data={x}
                  group={key}
                  groupTotal={a.length}
                  showGroup={i === 0}
                  preserveGroupOrientation={props.preserveGroupOrientation}
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
