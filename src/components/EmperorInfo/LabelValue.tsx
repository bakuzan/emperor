import React from 'react';
import { rhythm } from '@/utils/typography';

interface LabelValueProps
  extends Pick<React.HTMLProps<HTMLDivElement>, 'children'> {
  label: string;
}

export default function LabelValue({ label, children }: LabelValueProps) {
  return (
    <>
      <div
        className="info-label"
        style={{
          fontWeight: 'bold',
          padding: `0 ${rhythm(1 / 4)}`,
          textAlign: 'right'
        }}
      >
        {label}
      </div>
      <div className="info-value" style={{ padding: `0 ${rhythm(1 / 4)}` }}>
        {children}
      </div>
    </>
  );
}
