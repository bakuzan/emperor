import orderBy from 'ayaka/orderBy';

import { SortKey } from '@/components/Listing';
import { Emperor } from '@/interfaces/Emperor';

interface EmperorOrder {
  props: string[];
  orders: (isDesc: boolean) => string[];
}

const orders = new Map<SortKey, EmperorOrder>([
  [
    'name',
    { props: ['name'], orders: (isDesc) => (isDesc ? ['desc'] : ['asc']) }
  ],
  [
    'daysSinceReignStart',
    {
      props: ['daysSinceReignStart', 'daysSinceReignEnd'],
      orders: (isDesc) => (isDesc ? ['asc', 'asc'] : ['desc', 'desc'])
    }
  ],
  [
    'daysSinceReignEnd',
    {
      props: ['daysSinceReignEnd', 'daysSinceReignStart'],
      orders: (isDesc) => (isDesc ? ['asc', 'asc'] : ['desc', 'desc'])
    }
  ],
  [
    'reignLengthInDays',
    {
      props: ['reignLengthInDays', 'name'],
      orders: (isDesc) => (isDesc ? ['desc', 'asc'] : ['asc', 'asc'])
    }
  ]
]);

export default function orderEmperors<T extends Emperor>(
  list: T[],
  key: SortKey,
  isDesc: boolean
) {
  const args = orders.get(key) as EmperorOrder;
  return orderBy(list, args.props, args.orders(isDesc)) as T[];
}
