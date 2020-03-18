import { getTargetOffset } from './utils/getTargetOffset';

export function onInitialClientRender() {
  requestAnimationFrame(() => {
    const offset = getTargetOffset(window.location.hash);

    if (offset !== null) {
      console.log(offset);
      window.scrollTo(0, offset);
    }
  });
}
