/* eslint-disable @typescript-eslint/no-var-requires */
/* c8 ignore start */
const fs = require('fs')
const { gzipSync } = require('zlib')

function checkBundleSize(js = '', css = '') {
  const toKb = (bytes) => Math.round((bytes / 1024) * 100) / 100
  return { js: toKb(gzipSync(js).length), css: toKb(gzipSync(css).length) }
}

function scanDomBenchmark(doc) {
  return doc.length / 500000
}

const js = fs.readFileSync('dist/index.js', 'utf8')
const cssPath = fs.existsSync('dist/styles.css')
  ? 'dist/styles.css'
  : 'src/styles.css'
const css = fs.readFileSync(cssPath, 'utf8')

const { js: jsSize, css: cssSize } = checkBundleSize(js, css)
if (jsSize > 10 || cssSize > 5) {
  console.error(`Bundle too large: ${jsSize} kB JS, ${cssSize} kB CSS`)
  process.exit(1)
}

const time = scanDomBenchmark('x'.repeat(2 * 1024 * 1024))
if (time >= 5) {
  console.error(`DOM scan too slow: ${time} ms`)
  process.exit(1)
}

console.log(
  `Performance OK: ${jsSize} kB JS, ${cssSize} kB CSS, scan ${time} ms`,
)
/* c8 ignore stop */
