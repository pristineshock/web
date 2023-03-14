import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { Portfolio } from "~/types";
import { cleanSlug, trimSlash, PORTFOLIO_PERMALINK_PATTERN } from "./permalinks";

const generatePermalink = async ({ id, slug, publishDate, category }) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");

  const permalink = PORTFOLIO_PERMALINK_PATTERN.replace("%slug%", slug)
    .replace("%id%", id)
    .replace("%category%", category || "")
    .replace("%year%", year)
    .replace("%month%", month)
    .replace("%day%", day)
    .replace("%hour%", hour)
    .replace("%minute%", minute)
    .replace("%second%", second);

  return permalink
    .split("/")
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
};

const getNormalizedPortfolio = async (portfolio: CollectionEntry<"portfolio">): Promise<Portfolio> => {
  const { id, slug: rawSlug = "", data } = portfolio;
  const { Content, remarkPluginFrontmatter } = await portfolio.render();

  const { tags: rawTags = [], category: rawCategory, author = "Anonymous", publishDate: rawPublishDate = new Date(), ...rest } = data;

  const slug = cleanSlug(rawSlug.split("/").pop());
  const publishDate = new Date(rawPublishDate);
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,

    publishDate: publishDate,
    category: category,
    tags: tags,
    author: author,

    ...rest,

    Content: Content,
    // or 'body' in case you consume from API

    permalink: await generatePermalink({ id, slug, publishDate, category }),

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Portfolio>> {
  const portfolios = await getCollection("portfolio");
  const normalizedPortfolios = portfolios.map(async (portfolio) => await getNormalizedPortfolio(portfolio));

  const results = (await Promise.all(normalizedPortfolios))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((portfolio) => !portfolio.draft);

  return results;
};

let _portfolios: Array<Portfolio>;

/** */
export const fetchPortfolios = async (): Promise<Array<Portfolio>> => {
  if (!_portfolios) {
    _portfolios = await load();
  }

  return _portfolios;
};

/** */
export const findPortfoliosBySlugs = async (slugs: Array<string>): Promise<Array<Portfolio>> => {
  if (!Array.isArray(slugs)) return [];

  const portfolios = await fetchPortfolios();

  return slugs.reduce(function (r: Array<Portfolio>, slug: string) {
    portfolios.some(function (portfolio: Portfolio) {
      return slug === portfolio.slug && r.push(portfolio);
    });
    return r;
  }, []);
};

/** */
export const findPortfoliosByIds = async (ids: Array<string>): Promise<Array<Portfolio>> => {
  if (!Array.isArray(ids)) return [];

  const portfolios = await fetchPortfolios();

  return ids.reduce(function (r: Array<Portfolio>, id: string) {
    portfolios.some(function (portfolio: Portfolio) {
      return id === portfolio.id && r.push(portfolio);
    });
    return r;
  }, []);
};

/** */
export const findLatestPortfolios = async ({ count }: { count?: number }): Promise<Array<Portfolio>> => {
  const _count = count || 4;
  const portfolios = await fetchPortfolios();

  return portfolios ? portfolios.slice(0, _count) : [];
};
