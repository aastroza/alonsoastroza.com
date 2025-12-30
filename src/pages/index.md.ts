import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Alonso Astroza

Personal website and notes by Alonso Astroza.

## Navigation

- [About](/about.md)
- [Posts](/posts.md)
- [RSS Feed](/rss.xml)

## Links

- GitHub: [@aastroza](https://github.com/aastroza)
- X: [@aastroza](https://x.com/aastroza)
- LinkedIn: [Alonso Astroza](https://www.linkedin.com/in/aastrozacl/)
- Email: alonsoastroza@gmail.com

---

*This is the markdown-only version of the site.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
