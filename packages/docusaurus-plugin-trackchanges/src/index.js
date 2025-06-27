const fs = require('fs');
const path = require('path');

module.exports = function (context) {
  const { siteDir, baseUrl = '/' } = context;
  const staticDir = path.join(siteDir, 'static');
  const assetsDir = __dirname;
  const assets = ['markreview.css', 'markreview.js'];

  return {
    name: 'docusaurus-plugin-trackchanges',

    configureMDX(mdxOptions) {
      const remark = require('remark-critic-markup');
      mdxOptions.remarkPlugins = [...(mdxOptions.remarkPlugins || []), remark];
      return mdxOptions;
    },

    async loadContent() {
      await fs.promises.mkdir(staticDir, { recursive: true });
      await Promise.all(
        assets.map(async (name) => {
          const src = path.join(assetsDir, name);
          const dest = path.join(staticDir, name);
          if (fs.existsSync(src)) {
            await fs.promises.copyFile(src, dest);
          }
        }),
      );
    },

    injectHtmlTags() {
      return {
        headTags: [`<link rel="stylesheet" href="${baseUrl}markreview.css" />`],
        postBodyTags: [`<script src="${baseUrl}markreview.js"></script>`],
      };
    },
  };
};
