const slugToDisplayName = (slug: string) =>
  slug.replace('emperor', '').replace(/\//g, '');

export default slugToDisplayName;
