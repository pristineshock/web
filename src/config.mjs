import defaultImage from "./assets/images/default.jpg";

const CONFIG = {
  name: "PristineShock",

  origin: "https://www.pristineshock.com",
  basePathname: "/",
  trailingSlash: false,

  title: "PristineShock",
  description: "We are a web design and development studio, working with small companies to position them on the web.",
  defaultImage: defaultImage,

  defaultTheme: "system", // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  language: "en",
  textDirection: "ltr",

  dateFormatter: new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }),

  socialLinks: true,
  github: "https://github.com/pristineshock",
  linkedin: "https://www.linkedin.com/in/matias-facello/",
  instagram: "#",
  facebook: "#",
  twitter: "#",

  googleAnalyticsId: "G-GXVPFK2YN2",
  googleSiteVerificationId: "",
  googleCaptchaPublicKey: "6LfOFpsUAAAAAEY75LBO7BvwkefCPmYS5Gtca9oB",

  categoryPathname: "category",
  tagPathname: "tag",

  portfolio: {
    disabled: false,
    portfoliosPerPage: 8,

    portfolio: {
      permalink: "/%slug%", // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: "list", // Portfolio main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    tag: {
      noindex: true,
      disabled: false,
    },

    category: {
      noindex: true,
      disabled: false,
    },
  },

  blog: {
    disabled: false,
    postsPerPage: 4,

    post: {
      permalink: "%slug%", // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: "list", // Blog main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    category: {
      noindex: true,
      disabled: false,
    },

    tag: {
      noindex: true,
      disabled: false,
    },
  },
};

export const SITE = { ...CONFIG, blog: undefined };
export const PORTFOLIO = CONFIG.portfolio;
export const BLOG = CONFIG.blog;
export const DATE_FORMATTER = CONFIG.dateFormatter;
