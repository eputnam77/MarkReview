'use strict';

const { spawnSync } = require('child_process');

function runPandiff(oldFile, newFile) {
  // Attempt to use the system "diff" command as a lightweight stand‑in for
  // the real Pandiff tool.  The function returns ``true`` when the command
  // exits without error, mimicking a successful comparison.
  const result = spawnSync('diff', [oldFile, newFile], {
    stdio: 'ignore',
  });
  return result.status === 0;
}

module.exports = { runPandiff };
