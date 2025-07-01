/**
 * Placeholder utilities for bundle size and DOM performance checks.
 */

export interface BundleSizes {
  js: number
  css: number
}

export function checkBundleSize(): BundleSizes {
  return { js: 0, css: 0 }
}

export function scanDomBenchmark(_doc: string): number {
  return 0
}
