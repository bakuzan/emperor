import './Table.scss';
import React from 'react';
import { Button } from 'meiko/Button';

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
  sortIcon?: string;
  sortKey?: T;
  onSort?: (key: T) => void;
}

function Table<T extends string>({
  style,
  headers,
  children,
  showHeaders = true,
  sortIcon,
  sortKey: activeSortKey,
  onSort,
  ...props
}: TableProps<T>) {
  return (
    <table style={{ ...style }} {...props}>
      <thead>
        <tr>
          {headers.map(({ text, sortKey, ...x }) => {
            return (
              <th key={text} {...x} style={{ ...(x.style ?? {}) }}>
                {onSort !== undefined && sortKey !== undefined ? (
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
                      <div style={{ marginTop: `-5px` }}>
                        {activeSortKey === sortKey ? sortIcon : ''}
                      </div>
                    </div>
                  </Button>
                ) : (
                  text
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
