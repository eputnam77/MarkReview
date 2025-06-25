# docusaurus-plugin-trackchanges

Adds [remark-critic-markup](https://www.npmjs.com/package/remark-critic-markup) to the MDX pipeline and ensures the runtime assets are available by copying `marktrace.js` and `marktrace.css` into your site's `static` directory at build time.

The runtime script highlights added text in blue and deleted text in red, ensuring WCAG&nbsp;AA contrast. It marks changed paragraphs with a vertical bar and provides a floating selector to switch between **Original**, **Markup**, and **Accepted** views. The current view is stored in `localStorage` so it persists across page loads. Keyboard shortcuts allow `m` to toggle the view, `a` to accept the edit under the cursor, and `r` to reject it.
