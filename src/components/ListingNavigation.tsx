import React from 'react';
import { Link } from 'gatsby';

import { EMPPageContext } from '@/interfaces/EMPPageContext';
import slugToDisplayName from '@/utils/slugToDisplayName';

interface NavigationProps
  extends EMPPageContext,
    Pick<React.HTMLProps<HTMLDivElement>, 'children'> {}

export default function ListingNavigation(props: NavigationProps) {
  const { previous: prev, next } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
        {prev && (
          <Link to={prev.fields.slug} rel="prev">
            ← {slugToDisplayName(prev.fields.slug)}
          </Link>
        )}
      </div>
      {props.children}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {slugToDisplayName(next.fields.slug)} →
          </Link>
        )}
      </div>
    </div>
  );
}
