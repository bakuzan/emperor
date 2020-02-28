const slugToDisplayName = (slug: string) =>
  slug
    .replace(/\(.*\)/g, '')
    .replace(/\//g, '')
    .replace(/_/g, ' ')
    .replace(/\(|\)/g, '')
    .trim();

export default slugToDisplayName;
