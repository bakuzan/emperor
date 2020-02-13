import React from 'react';

import LabelValue from './LabelValue';
import { InDepthEmperor } from '@/interfaces/Emperor';
import { displayReignLength } from '@/utils/displayReignLength';
import { rhythm } from '@/utils/typography';
import NewTabLink from 'meiko/NewTabLink';
import slugToWikiSlug from '@/utils/slugToWikiSlug';
import { withPrefix } from 'gatsby';

interface EmperorInfoProps {
  data: InDepthEmperor;
}

export default function EmperorInfo({ data }: EmperorInfoProps) {
  return (
    <div
      className="emperor-detail"
      style={{
        display: 'grid',
        gridAutoRows: `auto`,
        gridGap: `2px 4px`,
        gridTemplateColumns: `90px 1fr`,
        padding: `0 ${rhythm(1)}`,
        margin: `auto 0`
      }}
    >
      <LabelValue label="Name">{data.name}</LabelValue>
      <LabelValue label="Dynasty">{data.house}</LabelValue>
      <LabelValue label="Born">
        <div>{data.dateOfBirth}</div>
        <div>{data.birthplace}</div>
      </LabelValue>
      <LabelValue label="Died">
        <div>{data.dateOfDeath}</div>
        <div>{data.deathplace}</div>
      </LabelValue>
      <LabelValue label="Reign">
        <div>
          {data.reignStart} to {data.reignEnd}
        </div>
        <div>({displayReignLength(data.reignLengthInDays)})</div>
      </LabelValue>
      <LabelValue label="Links">
        <NewTabLink
          href={`https://en.wikipedia.org/wiki/${slugToWikiSlug(data.slug)}`}
          aria-label={`Open ${data.name} wikipedia entry in a new tab`}
        >
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            aria-hidden={true}
          >
            <img
              src={withPrefix('/wikipedia.png')}
              alt={'wikipedia logo'}
              width={16}
              height={16}
              style={{ margin: `0 4px` }}
            />
            wikipedia
          </div>
        </NewTabLink>
      </LabelValue>
    </div>
  );
}
