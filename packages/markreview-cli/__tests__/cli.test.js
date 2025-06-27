const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const cli = path.resolve(__dirname, '../index.js');
const tmp = path.join(__dirname, 'tmp.md');

afterEach(() => {
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
});

describe('markreview CLI', () => {
  test('accepts changes', () => {
    fs.writeFileSync(tmp, 'Hello {++World++}');
    const { status } = spawnSync('node', [cli, 'accept', tmp]);
    const out = fs.readFileSync(tmp, 'utf8');
    expect(status).toBe(0);
    expect(out).toBe('Hello World');
  });

  test('rejects changes', () => {
    fs.writeFileSync(tmp, 'Hello {--World--}');
    const { status } = spawnSync('node', [cli, 'reject', tmp]);
    const out = fs.readFileSync(tmp, 'utf8');
    expect(status).toBe(0);
    expect(out).toBe('Hello ');
  });

  test('strips markup', () => {
    fs.writeFileSync(tmp, 'Hello {++World++}{--Mars--}');
    const { status } = spawnSync('node', [cli, 'strip', tmp]);
    const out = fs.readFileSync(tmp, 'utf8');
    expect(status).toBe(0);
    expect(out).toBe('Hello World');
  });
});
