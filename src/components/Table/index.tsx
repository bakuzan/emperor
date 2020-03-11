import './Table.scss';
import React from 'react';

import { Button } from 'meiko/Button';
import Icons from 'meiko/constants/icons';

import { useMountedOnClient } from '@/hooks/useMountedOnClient';

export interface TableHeader<T extends string = any>
  extends React.HTMLProps<HTMLTableHeaderCellElement> {
  text: string;
  sortKey?: T;
}

interface TableProps<T extends string> {
  style: { [key: string]: string };
  headers: TableHeader<T>[];
  children?: React.ReactNode[];
  showHeaders?: boolean;
  isSortDesc?: boolean;
  sortKey?: T;
  onSort?: (key: T) => void;
}

function Table<T extends string>({
  style,
  headers,
  children,
  showHeaders = true,
  isSortDesc,
  sortKey: activeSortKey,
  onSort,
  ...props
}: TableProps<T>) {
  const mounted = useMountedOnClient();
  const sortIcon = isSortDesc ? Icons.down : Icons.up;

  return (
    <table style={{ ...style }} {...props}>
      <thead>
        <tr>
          {headers.map(({ text, sortKey, ...x }) => {
            const isActiveSort = activeSortKey === sortKey;

            return (
              <th key={text} {...x} style={{ ...(x.style ?? {}) }}>
                {mounted && onSort !== undefined && sortKey !== undefined ? (
                  <Button
                    className="table-sort-button"
                    aria-label={`${text}. Click to sort on this column. Clicking again will toggle the sort direction.`}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => onSort(sortKey)}
                  >
                    <div
                      aria-hidden={true}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: `100%`
                      }}
                    >
                      <div>{text}</div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: `1rem`,
                          margin: isSortDesc ? `0 0 auto` : `auto 0 0`
                        }}
                      >
                        {isActiveSort ? sortIcon : ''}
                      </div>
                    </div>
                  </Button>
                ) : (
                  <div style={{ padding: `5px` }}>{text}</div>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.defaultProps = { style: {} };

export default Table;
