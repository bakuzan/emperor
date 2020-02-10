import React from 'react';

import LabelValue from './LabelValue';
import { InDepthEmperor } from '@/interfaces/Emperor';
import { displayReignLength } from '@/utils/displayReignLength';
import { rhythm } from '@/utils/typography';
import NewTabLink from 'meiko/NewTabLink';

interface EmperorInfoProps {
  data: InDepthEmperor;
}

export default function EmperorInfo({ data }: EmperorInfoProps) {
  return (
    <div
      className="emperor-detail"
      style={{
        display: 'grid',
        gridAutoRows: `1fr`,
        gridTemplateColumns: `75px 1fr`,
        padding: `0 ${rhythm(1)}`,
        margin: `auto 0`
      }}
    >
      <LabelValue label="Name">{data.name}</LabelValue>
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
      <div>
        <NewTabLink
          href={`https://en.wikipedia.org/wiki/${data.slug}`}
          aria-label={`Open ${data.name} wikipedia entry in a new tab`}
        >
          <span aria-hidden={true}>wikipedia</span>
        </NewTabLink>
      </div>
    </div>
  );
}
