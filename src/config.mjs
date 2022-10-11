export const SITE = {
  name: "PristineShock",

  origin: "https://www.pristineshock.com",
  basePathname: "/",

  title: "PristineShock",
  description: "We are a web design and development studio, working with small companies to position them on the web.",

  googleAnalyticsId: false, // or "G-XXXXXXXXXX",
  googleSiteVerificationId: "",

  // SOCIAL LINKS
  socialLinks: true,
  github: "#",
  linkedin: "#",
  instagram: "#",
  twitter: "#",
};

export const BLOG = {
  disabled: true,
  postsPerPage: 4,

  blog: {
    disabled: false,
    pathname: "blog", // blog main path, you can change this to "articles" (/articles)
  },

  post: {
    disabled: false,
    pathname: "", // empty for /some-post, value for /pathname/some-post
  },

  category: {
    disabled: false,
    pathname: "category", // set empty to change from /category/some-category to /some-category
  },

  tag: {
    disabled: false,
    pathname: "tag", // set empty to change from /tag/some-tag to /some-tag
  },
};
