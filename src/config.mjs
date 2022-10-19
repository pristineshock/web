export const SITE = {
  name: "PristineShock",

  origin: "https://www.pristineshock.com",
  basePathname: "/",
  contactPathname: "contact",

  title: "PristineShock",
  description: "We are a web design and development studio, working with small companies to position them on the web.",

  googleAnalyticsId: false, // or "G-XXXXXXXXXX",
  googleSiteVerificationId: "",
  googleCaptchaPublicKey: "6LfOFpsUAAAAAEY75LBO7BvwkefCPmYS5Gtca9oB",

  // SOCIAL LINKS
  socialLinks: false,
  github: "#",
  linkedin: "#",
  instagram: "#",
  twitter: "#",
};

export const PORTFOLIO = {
  disabled: false,
  worksPerPage: 8,

  portfolio: {
    pathname: "portfolio",
  },
};

export const BLOG = {
  disabled: false,
  postsPerPage: 4,

  blog: {
    disabled: false,
    pathname: "blog",
  },

  post: {
    disabled: false,
    pathname: "blog",
  },

  category: {
    disabled: false,
    pathname: "category",
  },

  tag: {
    disabled: false,
    pathname: "tag",
  },
};
