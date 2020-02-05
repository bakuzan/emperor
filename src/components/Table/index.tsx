import './Table.scss';
import React from 'react';

interface TableHeader extends React.HTMLProps<HTMLTableHeaderCellElement> {
  text: string;
}

interface TableProps {
  style: { [key: string]: string };
  headers: TableHeader[];
  children?: React.ReactNode[];
}

function Table({ style, headers, children, ...props }: TableProps) {
  return (
    <table style={{ ...style }} {...props}>
      <thead>
        <tr>
          {headers.map(({ text, ...x }) => (
            <th key={text} {...x} style={{ ...(x.style || {}) }}>
              {text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.defaultProps = { style: {} };

export default Table;
