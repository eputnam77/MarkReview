const DEFAULT_KEYS: Record<string, string> = {
  accept: 'KeyA',
  reject: 'KeyR',
  comment: 'KeyC',
}

/** Bind an action to a keyboard code. */
export function bindAction(action: string, defaultCode: string): void {
  DEFAULT_KEYS[action] = defaultCode
}

/** Return the current keymap. */
export function loadKeymap(): Record<string, string> {
  return { ...DEFAULT_KEYS }
}
