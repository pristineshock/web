import getReadingTime from "reading-time";

const getNormalizedwork = async (work) => {
  const { frontmatter, compiledContent, rawContent, file } = work;
  const ID = file.split("/").pop().split(".").shift();

  return {
    id: ID,

    pubDate: frontmatter.pubDate,
    draft: frontmatter.draft,

    canonical: frontmatter.canonical,
    slug: frontmatter.slug || ID,

    title: frontmatter.title,
    type: frontmatter.type,
    description: frontmatter.description,
    industry: frontmatter.industry,
    location: frontmatter.location,
    url: frontmatter.url,
    body: compiledContent(),
    image: frontmatter.image,
    imageSocial: frontmatter.imageSocial,

    excerpt: frontmatter.excerpt,
    authors: frontmatter.authors,
    category: frontmatter.category,
    tags: frontmatter.tags,
    readingTime: Math.ceil(getReadingTime(rawContent()).minutes),
  };
};

const load = async function () {
  const works = import.meta.glob("~/../data/portfolio/**/*.md", {
    eager: true,
  });

  const normalizedworks = Object.keys(works).map(async (key) => {
    const work = await works[key];
    return await getNormalizedwork(work);
  });

  const results = (await Promise.all(normalizedworks))
    .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf())
    .filter((work) => !work.draft);
  return results;
};

let _works;

/** */
export const fetchWorks = async () => {
  _works = _works || load();

  return await _works;
};

/** */
export const findWorksByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const works = await fetchWorks();

  return ids.reduce(function (r, id) {
    works.some(function (work) {
      return id === work.id && r.push(work);
    });
    return r;
  }, []);
};
