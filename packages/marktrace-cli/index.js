#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');
const glob = require('glob');
const critic = require('critic-markup');

function hasMarkup(text) {
  return /(\{\+\+|\{--|\{~~|\[>|<\]|\{>>)/.test(text);
}

async function processFile(file, mode) {
  const input = await fs.readFile(file, 'utf8');
  const doc = critic.parse(input);
  let output;
  if (mode === 'accept') {
    output = doc.accept();
  } else if (mode === 'reject') {
    output = doc.reject();
  } else {
    output = doc.strip();
  }
  await fs.writeFile(file, output);
  return hasMarkup(output);
}

async function main() {
  const [mode, pattern] = process.argv.slice(2);
  if (!['accept', 'reject', 'strip'].includes(mode) || !pattern) {
    console.error('Usage: marktrace <accept|reject|strip> <glob>');
    process.exit(2);
  }
  const files = glob.sync(pattern, { nodir: true });
  if (files.length === 0) {
    console.error('No files matched');
    process.exit(2);
  }
  let hasRemaining = false;
  await Promise.all(
    files.map(async (f) => {
      const remaining = await processFile(f, mode);
      hasRemaining = hasRemaining || remaining;
    }),
  );
  process.exit(hasRemaining ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
