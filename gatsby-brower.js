function getTargetOffset(hash) {
  const id = window.decodeURI(hash.replace(`#`, ``));

  if (id !== ``) {
    const element = document.getElementById(id);

    if (element) {
      return element.offsetTop;
    }
  }

  return null;
}

export function onInitialClientRender() {
  requestAnimationFrame(() => {
    const offset = getTargetOffset(window.location.hash);

    if (offset !== null) {
      window.scrollTo(0, offset);
    }
  });
}

export function shouldUpdateScroll({ routerProps: { location } }) {
  const offset = getTargetOffset(location.hash);
  return offset !== null ? [0, offset] : true;
}

export function onServiceWorkerUpdateReady() {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  );

  if (answer === true) {
    window.location.reload();
  }
}
