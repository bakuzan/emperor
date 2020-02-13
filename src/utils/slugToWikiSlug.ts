export default function slugToWikiSlug(slug: string) {
  return slug.replace(/\//g, '');
}
