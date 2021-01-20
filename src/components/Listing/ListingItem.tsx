import './ListingItem.scss';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import getOrdinalSuffix from 'ayaka/getOrdinalSuffix';
import { Emperor } from '@/interfaces/Emperor';
import { rhythm } from '@/utils/typography';
import { displayReignLength } from '@/utils/displayReignLength';
import slugToIdentifier from '@/utils/slugToIdentifier';

export interface ListingItemProps {
  data: Emperor;
  group: string | number;
  groupTotal: number;
  showGroup: boolean;
  preserveGroupOrientation?: boolean;
  preventIdPropRender?: boolean;
}

export default function ListingItem({
  data,
  group,
  groupTotal,
  showGroup,
  preserveGroupOrientation,
  preventIdPropRender
}: ListingItemProps) {
  const hash = preventIdPropRender ? undefined : slugToIdentifier(data.slug);

  return (
    <tr id={hash} className="emperor">
      {showGroup && (
        <td
          className={classNames('emperor__group-cell', {
            'emperor__group-cell--visible': showGroup
          })}
          aria-label={`${group}`}
          column-title=""
          rowSpan={groupTotal}
        >
          <div
            className={classNames('emperor__group', {
              'emperor__group--no-rotate': preserveGroupOrientation
            })}
            aria-hidden={true}
          >
            {group}
          </div>
        </td>
      )}
      <td
        style={{ paddingLeft: showGroup ? undefined : rhythm(1 / 2) }}
        column-title="Name"
      >
        <div style={{ display: 'flex' }}>
          <Img style={{ flex: `0 0 96px` }} {...data.image.childImageSharp} />
          <div>
            <Link style={{ margin: `0 ${rhythm(1 / 4)}` }} to={data.slug}>
              {data.name}
            </Link>
            {data.empire && (
              <div style={{ margin: `0 ${rhythm(1 / 4)}` }}>
                ({data.empire})
              </div>
            )}
          </div>
        </div>
      </td>
      <td column-title="Succession" className="emperor__max-width-cell">
        {data.succession}
        {data.reignCount && (
          <div>{getOrdinalSuffix(data.reignCount)} Reign</div>
        )}
      </td>
      <td column-title="Reign Start">{data.reignStart}</td>
      <td column-title="Reign End">{data.reignEnd}</td>
      <td column-title="Reign Length" style={{ whiteSpace: 'pre-line' }}>
        {displayReignLength(data.reignLengthInDays, true)}
      </td>
    </tr>
  );
}
