# docusaurus-plugin-trackchanges

Adds [remark-critic-markup](https://www.npmjs.com/package/remark-critic-markup) to the MDX pipeline and ensures the runtime assets are available by copying `marktrace.js` and `marktrace.css` into your site's `static` directory at build time. The plugin also injects `<link>` and `<script>` tags so no manual import is required.

The runtime script highlights added text in blue and deleted text in red, ensuring WCAG&nbsp;AA contrast. Substitutions, comments and highlights are styled so the full CriticMarkup syntax renders correctly. It marks changed paragraphs with a vertical bar and provides a floating selector to switch between **Original**, **Markup**, and **Accepted** views. The current view is stored in `localStorage` so it persists across page loads. Keyboard shortcuts allow `m` to toggle the view, `a` to accept the edit under the cursor, and `r` to reject it.
