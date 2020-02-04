const cx = (...l: (string | undefined | false)[]) =>
  l.filter((x) => !!x).join(' ');

export default cx;
