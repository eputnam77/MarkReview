import { test } from '@playwright/test'
import assert from 'node:assert/strict'

try {
  // Vitest adds a non-configurable expect symbol which conflicts with Playwright
  // tests when run in the same process. Ignore failures when removing.
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete (globalThis as Record<symbol, unknown>)[
    Symbol.for('$$jest-matchers-object')
  ]
} catch {
  // no-op
}

import { attach } from '../../src/index'
import { initTiptapAdapter } from '../../src/adapters/tiptap'
import { parseCriticMarkup } from '../../src/core/criticParser'
import { trackFormatChanges } from '../../src/core/formatTracker'
import { diffDoc } from '../../src/diff-headless'
import { persistMarks } from '../../src/core/persistence'
import { applyChangeBars } from '../../src/ui/changeBars'
import { CommentThread, createCommentThread } from '../../src/core/comments'
import { attachPopupControls } from '../../src/ui/popupWidget'
import {
  buildReviewPanel,
  registerPanelExtension,
  getPanelExtensions,
} from '../../src/ui/reviewPanel'
import { bindAction, loadKeymap } from '../../src/keymap'
import { openPreferencesDialog } from '../../src/keymap/preferences'

test('full workflow integration', async ({ page }) => {
  await page.goto('about:blank')

  const changes = parseCriticMarkup('a {++b++} {--c--}')
  assert.strictEqual(changes.length, 2)

  const bars = applyChangeBars('a {++b++}', { width: 3 })
  assert.strictEqual(bars.count, 1)
  assert.ok(bars.css.includes('width:3px'))

  const diff = diffDoc('a\n', 'b\n')
  assert.ok(diff.includes('- a'))
  assert.ok(diff.includes('+ b'))

  const fmt = trackFormatChanges('a b', 'a c')
  assert.deepStrictEqual(fmt, ['-b', '+c'])

  assert.strictEqual(persistMarks('x {--y--}', false), 'x y')

  const thread: CommentThread = createCommentThread()
  attachPopupControls('comment', '{++hello++}', thread)
  assert.strictEqual(thread.list().length, 1)

  const panel = buildReviewPanel([{ id: '1', type: 'add', text: 'b' }])
  assert.deepStrictEqual(panel.ids, ['1'])

  registerPanelExtension({ id: 'ext', mount() {}, dispose() {} })
  assert.strictEqual(getPanelExtensions().length, 1)

  bindAction('accept', 'KeyZ')
  assert.strictEqual(loadKeymap().accept, 'KeyZ')
  assert.strictEqual(openPreferencesDialog(), true)

  const dummyEditor = {}
  const ctrl = attach(dummyEditor)
  assert.strictEqual(ctrl.editor, dummyEditor)

  const ctrl2 = initTiptapAdapter(dummyEditor)
  assert.strictEqual(ctrl2.editor, dummyEditor)
})
