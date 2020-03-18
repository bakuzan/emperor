function offset(element: HTMLElement) {
  let offsetTop = element.offsetTop;

  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement;
  }

  return offsetTop;
}

export function getTargetOffset(hash: string) {
  const id = window.decodeURI(hash.replace(`#`, ``));

  if (id !== ``) {
    const element = document.getElementById(id);

    if (element) {
      return offset(element);
    }
  }

  return null;
}
