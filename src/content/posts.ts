export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

const rawPosts = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function cleanValue(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parsePost(path: string, raw: string): Post {
  const frontmatterMatch = raw.match(
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/,
  );

  if (!frontmatterMatch) {
    throw new Error(`Post is missing frontmatter: ${path}`);
  }

  const [, frontmatter, content] = frontmatterMatch;

  const metadata = Object.fromEntries(
    frontmatter
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");

        if (separatorIndex === -1) {
          return [line.trim(), ""];
        }

        const key = line.slice(0, separatorIndex).trim();
        const value = cleanValue(line.slice(separatorIndex + 1));

        return [key, value];
      }),
  );

  const slug = path.split("/").pop()!.replace(".md", "");

  return {
    slug,
    title: metadata.title,
    date: metadata.date,
    description: metadata.description ?? "",
    tags:
      metadata.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [],
    content: content.trim(),
  };
}

export const posts = Object.entries(rawPosts)
  .map(([path, raw]) => parsePost(path, raw))
  .sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  );

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
