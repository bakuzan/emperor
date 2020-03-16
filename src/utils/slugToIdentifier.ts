const slugToIdentifier = (slug: string) =>
  slug
    .replace(/\(.*\)/g, '')
    .replace(/\//g, '')
    .replace(/\(|\)/g, '')
    .trim();

export default slugToIdentifier;
