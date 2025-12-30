// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

interface SocialLink {
  href: string;
  label: string;
}

interface Site {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
  showArchives: boolean;
  showBackButton: boolean;
  editPost: {
    enabled: boolean;
    text: string;
    url: string;
  };
  dynamicOgImage: boolean;
  lang: string;
  timezone: string;
}

// Site configuration
export const SITE: Site = {
  website: "https://alonsoastroza.com/",
  author: "Alonso Astroza",
  profile: "https://alonsoastroza.com/about",
  desc: "Personal website and notes by Alonso Astroza.",
  title: "Alonso Astroza",
  ogImage: "avatar.jpeg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: false,
  showBackButton: false,
  editPost: {
    enabled: true,
    text: "Edit on GitHub",
    url: "https://github.com/aastroza/alonsoastroza.com/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "UTC",
};

export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.desc;

// Navigation links
export const NAV_LINKS: SocialLink[] = [
  {
    href: "/",
    label: "Blog",
  },
  {
    href: "/about",
    label: "About",
  },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/aastroza",
    label: "GitHub",
  },
  {
    href: "https://x.com/aastroza",
    label: "X",
  },
  {
    href: "https://www.linkedin.com/in/aastrozacl/",
    label: "LinkedIn",
  },
  {
    href: "mailto:alonsoastroza@gmail.com",
    label: "Email",
  },
  {
    href: "/rss.xml",
    label: "RSS",
  },
];

// Icon map for social media
export const ICON_MAP: Record<string, string> = {
  GitHub: "github",
  X: "twitter",
  LinkedIn: "linkedin",
  Email: "mail",
  RSS: "rss",
};
