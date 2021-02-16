const cheerio = require("cheerio");
const visit = require("unist-util-visit");

// This plugin converts relative image paths set by Netlify CMS to absolute paths

module.exports = ({ markdownAST, pathPrefix }) => {
  // Markdown images
  visit(markdownAST, "image", (node) => {
    node.url = node.url.replace(/^\.\.\/images\//, `${pathPrefix}/images/`);
  });

  // HTML images and videos
  visit(markdownAST, "html", (node) => {
    const $ = cheerio.load(node.value);

    $("img[src], video[src]").each(function () {
      const element = $(this);
      const url = element.attr("src");
      if (url.startsWith("../images/")) {
        node.value = node.value.replace(
          new RegExp(url, `g`),
          url.replace(/^\.\.\/images\//, `${pathPrefix}/images/`)
        );
      }
    });
  });
};
