export default function slugToWikiSlug(slug: string) {
  return slug.replace('emperor/', '').slice(0, -1);
}
