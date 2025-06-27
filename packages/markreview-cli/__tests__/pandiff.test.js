const { runPandiff } = require('../pandiff');

test('runs pandiff on two files', () => {
  const result = runPandiff('old.md', 'new.md');
  expect(result).toBe(true);
});
