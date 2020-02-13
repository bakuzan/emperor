import { Emperor } from '@/interfaces/Emperor';

const generateUniqueId = () =>
  new Date().getTime().toString(36) +
  Math.random()
    .toString(36)
    .slice(2);

export default function orderedGroupBy<T extends Emperor>(
  items: T[],
  fn: (x: T) => any
) {
  const groups = new Map<string, T[]>();
  let activeKey = generateUniqueId();

  for (const item of items) {
    const group = groups.get(activeKey);

    if (!group) {
      groups.set(activeKey, [item]);
    } else {
      const g = fn(item);

      if (!group.every((x) => fn(x) === g)) {
        activeKey = generateUniqueId();
        groups.set(activeKey, [item]);
      } else {
        groups.set(activeKey, [...group, item]);
      }
    }
  }

  return groups;
}
