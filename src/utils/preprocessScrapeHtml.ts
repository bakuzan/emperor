export default function preprocessScrapeHtml(html: string) {
  return html.replace(
    /<a/g,
    `<a target="_blank" rel="nofollow noopener noreferrer"`
  );
}
