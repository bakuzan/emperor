import { getTargetOffset } from './utils/getTargetOffset';

export function shouldUpdateScroll({ routerProps: { location } }) {
  const offset = getTargetOffset(location.hash);
  return offset !== null ? [0, offset] : true;
}
