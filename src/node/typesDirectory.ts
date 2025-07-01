import fs from 'fs'

/** Ensure the types directory exists for generated declaration files. */
export function ensureTypesDirectory(dir = 'types'): boolean {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return fs.existsSync(dir)
}
