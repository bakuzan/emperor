import './ListingItem.scss';
import classNames from 'classnames';
import React from 'react';
import Img from 'gatsby-image';

import { Emperor } from '@/interfaces/Emperor';
import { rhythm } from '@/utils/typography';
import NewTabLink from '@/components/NewTabLink';

export interface ListingItemProps {
  data: Emperor;
  group: any;
  showGroup: boolean;
}

export default function ListingItem({
  data,
  group,
  showGroup
}: ListingItemProps) {
  return (
    <tr className="emperor">
      <td
        className={classNames('emperor__group-cell', {
          'emperor__group-cell--visible': showGroup
        })}
        aria-label={group}
        column-title=""
      >
        {showGroup && (
          <div className="emperor__group" aria-hidden={true}>
            {group}
          </div>
        )}
      </td>
      <td column-title="Name">
        <div style={{ display: 'flex' }}>
          <Img style={{ flex: `0 0 96px` }} {...data.image.childImageSharp} />
          <div>
            <NewTabLink
              style={{ margin: `0 ${rhythm(1 / 2)}` }}
              href={`/emperor/${data.slug}`}
            >
              {data.name}
            </NewTabLink>
          </div>
        </div>
      </td>
      <td column-title="Reign Start">{data.reignStart}</td>
      <td column-title="Reign End">{data.reignEnd}</td>
      <td column-title="Reign Length">put years here</td>
    </tr>
  );
}
