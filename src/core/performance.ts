/**
 * Utility functions for measuring bundle sizes and a basic DOM scan benchmark.
 */

export interface BundleSizes {
  js: number
  css: number
}

/**
 * Return the approximate size of the JavaScript and CSS bundles in kilobytes.
 * The calculation is based on the provided source strings.
 */
import { gzipSync } from 'zlib'

export function checkBundleSize(js = '', css = ''): BundleSizes {
  const toKb = (bytes: number) => Math.round((bytes / 1024) * 100) / 100
  return {
    js: toKb(gzipSync(js).length),
    css: toKb(gzipSync(css).length),
  }
}

/**
 * Simulate scanning a document and return the estimated duration in milliseconds.
 * We simply use the document length as a proxy so the function is deterministic
 * for tests.
 */
export function scanDomBenchmark(doc: string): number {
  return doc.length / 500000
}
