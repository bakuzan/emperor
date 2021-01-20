import React from 'react';
import monthNames from 'ayaka/constants/monthNames';
import daysDifferenceBetweenDates from 'ayaka/daysDifferenceBetweenDates';

import Listing from '@/components/Listing';
import { Emperor } from '@/interfaces/Emperor';
import { anniversaryOffsetDays } from '@/consts';

interface AnniversayHighlightProps<T extends Emperor> {
  items: T[];
}

function recentAnniversaryFilter<T extends Emperor>(x: T) {
  const dParts = x.reignStart.split(' ');
  const dayMaybe = dParts[0];
  const monthMaybe = dParts[1];
  if (!monthMaybe || !dayMaybe) {
    return false;
  }

  const index = monthNames.indexOf(monthMaybe.slice(0, 3));
  if (index === -1) {
    return false;
  }

  const today = new Date();
  const diff = daysDifferenceBetweenDates(
    today,
    new Date(today.getFullYear(), index, Number(dayMaybe.trim()))
  );

  return Math.abs(diff) <= anniversaryOffsetDays;
}

function AnniversayHighlight<T extends Emperor>({
  items
}: AnniversayHighlightProps<T>) {
  const filteredItems = items.filter(recentAnniversaryFilter);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div id="anniversary-highlight">
      <Listing
        title="Recent Emperor Ascension Anniversaries"
        data={filteredItems}
        grouping={(x) => 'Emperors'}
        showInSingleTable
        noRowId
      />
    </div>
  );
}

export default AnniversayHighlight;
