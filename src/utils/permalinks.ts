import slugify from "limax";

import { SITE, BLOG, PORTFOLIO } from "~/config.mjs";
import { trim } from "~/utils/utils";

export const trimSlash = (s: string) => trim(trim(s, "/"));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return "/" + paths + (SITE.trailingSlash && paths ? "/" : "");
};

const BASE_PATHNAME = SITE.basePathname;

export const cleanSlug = (text = "") =>
  trimSlash(text)
    .split("/")
    .map((slug) => slugify(slug))
    .join("/");

export const PORTFOLIO_PERMALINK_PATTERN = trimSlash(PORTFOLIO.portfolio.permalink || "blog/%slug%");
export const PORTFOLIO_BASE = cleanSlug(PORTFOLIO?.list?.pathname);

export const POST_PERMALINK_PATTERN = trimSlash(BLOG?.post?.permalink || "/%slug%");
export const BLOG_BASE = cleanSlug(BLOG?.list?.pathname);

export const CATEGORY_BASE = cleanSlug(SITE?.categoryPathname || "category");
export const TAG_BASE = cleanSlug(SITE?.tagPathname) || "tag";

/** */
export const getCanonical = (path = ""): string | URL => new URL(path, SITE.origin);

/** */
export const getPermalink = (slug = "", type = "page", base = ""): string => {
  let permalink: string;

  switch (type) {
    case "category":
      permalink = createPath(base, CATEGORY_BASE, trimSlash(slug));
      break;

    case "tag":
      permalink = createPath(base, TAG_BASE, trimSlash(slug));
      break;

    case "list":
      permalink = createPath(base, BLOG_BASE);
      break;

    case "post":
      permalink = createPath(base, trimSlash(slug));
      break;

    case "portfolio":
      permalink = createPath(base, PORTFOLIO_BASE);
      break;

    case "work":
      permalink = createPath(base, trimSlash(slug));
      break;

    case "page":
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink("/");

/** */
export const getPortfolioPermalink = (): string => getPermalink("", PORTFOLIO_BASE, "portfolio");

/** */
export const getBlogPermalink = (): string => getPermalink("", BLOG_BASE, "blog");

/** */
export const getAsset = (path: string): string =>
  "/" +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);
