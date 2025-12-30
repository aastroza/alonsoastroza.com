# Alonso Astroza's Personal Website

This is the source code for my personal website, built with Astro and deployed on Vercel.

## Project Structure

```text
public/               # Static assets (images, fonts, favicon)
src/
  assets/             # Icons and images used in components
  components/         # Reusable UI components
  content/            # Content collections
  layouts/            # Page layouts and templates
  pages/              # Routes and pages
  styles/             # Global styles and CSS
  utils/              # Utility functions
astro.config.mjs      # Astro configuration
vercel.json           # Vercel deployment and CSP configuration
package.json          # Project dependencies and scripts
LICENSE               # Dual license (CC BY 4.0 + MIT)
```

## Commands

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/`      |
| `npm run preview` | Preview the build locally                  |

## License

This repository uses dual licensing:

- Documentation & Blog Posts: CC BY 4.0
- Code & Code Snippets: MIT
