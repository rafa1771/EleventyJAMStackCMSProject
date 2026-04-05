const { DateTime } = require("luxon");
const site = require("./src/_data/site.js");

module.exports = function (eleventyConfig) {
  function normalizeTags(tags) {
    if (Array.isArray(tags)) return tags;
    return tags ? [tags] : [];
  }

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addCollection("heroImages", (collectionApi) => {
    return collectionApi.getAll().filter((item) => {
      const tags = normalizeTags(item.data.tags);
      const hasHeroTag = site.heroImageTags.some((tag) => tags.includes(tag));

      return hasHeroTag && item.data.image;
    });
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
