import fs from 'fs'
import path from 'path'

/** Move project management files into the `dev/` directory. */
export function moveProjectManagementFiles(
  root = '.',
  dryRun = true,
): string[] {
  const files = ['AGENTS.md', 'TASKS.md', 'ROADMAP.md', 'NOTES.md']
  if (dryRun) return files
  const destDir = path.join(root, 'dev')
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir)
  for (const f of files) {
    const src = path.join(root, f)
    const dest = path.join(destDir, f)
    if (fs.existsSync(src)) fs.renameSync(src, dest)
  }
  return files
}
