import { test } from '@playwright/test'
import assert from 'node:assert/strict'

try {
  delete (globalThis as Record<symbol, unknown>)[
    Symbol.for('$$jest-matchers-object')
  ]
} catch {
  // no-op
}

import { startDiffServer } from '../../src/api/server'
import { enableRealtimeCollaboration } from '../../src/collaboration'
import { checkBundleSize, scanDomBenchmark } from '../../src/core/performance'
import { validateUsabilityMetrics } from '../../src/core/usabilityMetrics'
import { bulkAcceptReject, exportDocument } from '../../src/core/bulkExport'
import { runAccessibilityIntlAudit } from '../../src/core/accessibilityAudit'
import { publishAlphaRelease } from '../../src/core/releaseAlpha'
import { finalizeGaRelease } from '../../src/core/releaseGa'
import { updateDocumentationSite } from '../../src/core/docsUpdate'
import { enforceSecurityAndSemverPolicy } from '../../src/core/securitySemver'

test('additional workflow utilities', async ({ page }) => {
  await page.goto('about:blank')

  assert.strictEqual(startDiffServer(), 'started')
  assert.strictEqual(enableRealtimeCollaboration(), true)

  const sizes = checkBundleSize('const a=1', 'body{}')
  assert.ok(sizes.js > 0)
  assert.ok(sizes.css > 0)
  assert.ok(scanDomBenchmark('x'.repeat(500000)) < 2)

  const metrics = {
    timeToFirstAccept: 10,
    shortcutFailures: 0,
    completionRate: 1,
  }
  assert.strictEqual(validateUsabilityMetrics(metrics), true)

  assert.strictEqual(bulkAcceptReject(), true)
  assert.strictEqual(exportDocument(), 'exported')
  assert.strictEqual(runAccessibilityIntlAudit(), true)
  assert.strictEqual(publishAlphaRelease(), '0.1.0')
  assert.strictEqual(finalizeGaRelease(), '1.0.0')
  assert.strictEqual(updateDocumentationSite(), true)
  assert.strictEqual(enforceSecurityAndSemverPolicy(), true)
})
