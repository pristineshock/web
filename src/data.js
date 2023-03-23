import { SITE } from "./config.mjs";
import { getPermalink, getBlogPermalink, getAsset, getHomePermalink, getPortfolioPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Home",
      href: getHomePermalink(),
    },
    {
      text: "Services",
      href: getPermalink("/#services"),
    },
    {
      text: "Portfolio",
      href: getPortfolioPermalink(),
    },
    {
      text: "F.A.Q.",
      href: getPermalink("/#faq"),
    },
    {
      text: "Blog",
      href: getBlogPermalink(),
    },
    {
      text: "Contact",
      href: getPermalink("/contact"),
    },
  ],
  actions: [{ type: "primary", text: "Get a quote!", href: getPermalink("/contact"), icon: "ic:round-email" }],
};

export const footerData = {
  links: [
    {
      text: "Home",
      href: getHomePermalink(),
      links: [
        {
          text: "Services",
          href: getPermalink("/#services"),
        },
        {
          text: "Process",
          href: getPermalink("/#steps"),
        },
        {
          text: "F.A.Q.",
          href: getPermalink("/#faq"),
        },
      ],
    },

    {
      text: "Portfolio",
      href: getPortfolioPermalink(),
    },

    {
      text: "Blog",
      href: getBlogPermalink(),
    },
    {
      text: "Contact",
      href: getPermalink("/contact"),
    },
  ],
  socialLinks: [
    { ariaLabel: "Github", icon: "tabler:brand-github", href: SITE.github },
    { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") },
    // { ariaLabel: "Linkedin", icon: "tabler:brand-linkedin", href: SITE.linkedin },
    // { ariaLabel: "Twitter", icon: "tabler:brand-twitter", href: SITE.twitter },
    // { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: SITE.instagram },
    // { ariaLabel: "Facebook", icon: "tabler:brand-facebook", href: SITE.facebook },
  ],
};
