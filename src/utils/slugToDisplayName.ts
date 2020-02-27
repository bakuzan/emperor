const slugToDisplayName = (slug: string) =>
  slug
    .replace(/emperor/g, '')
    .replace(/\(.*emperor\)/gi, '')
    .replace(/\//g, '')
    .replace(/_/g, ' ')
    .replace(/\(|\)/g, '')
    .trim();

export default slugToDisplayName;
