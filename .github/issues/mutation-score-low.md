---
title: Mutation score below threshold
labels: [ready-for:fixer]
---

The mutation testing score is **52.41%**, which is below the required 60% threshold for feature branches.

```
--------------------------|--------|---------|----------|-----------|------------|----------|----------|
All files                 |  52.41 |   73.73 |      172 |         2 |         62 |       96 |        0 |
 adapters                 |   0.00 |    0.00 |        0 |         0 |          0 |        3 |        0 |
  milkdown.ts             |   0.00 |    0.00 |        0 |         0 |          0 |        1 |        0 |
  tiptap.ts               |   0.00 |    0.00 |        0 |         0 |          0 |        1 |        0 |
  toastui.ts              |   0.00 |    0.00 |        0 |         0 |          0 |        1 |        0 |
 api                      | 100.00 |  100.00 |       10 |         0 |          0 |        0 |        0 |
  server.ts               | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  user.ts                 | 100.00 |  100.00 |        8 |         0 |          0 |        0 |        0 |
 collaboration            | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  index.ts                | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
 core                     |  52.87 |   77.57 |       82 |         1 |         24 |       50 |        0 |
  accessibilityAudit.ts   | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  bulkExport.ts           | 100.00 |  100.00 |        4 |         0 |          0 |        0 |        0 |
  ciPipeline.ts           |  66.67 |   66.67 |        4 |         0 |          2 |        0 |        0 |
  comments.ts             |  86.36 |   90.48 |       19 |         0 |          2 |        1 |        0 |
  criticParser.ts         |  60.00 |   93.75 |       15 |         0 |          1 |        9 |        0 |
  docsUpdate.ts           | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  formatTracker.ts        |  66.67 |   66.67 |       15 |         1 |          8 |        0 |        0 |
  initLayout.ts           | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  legacyCleanup.ts        | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  performance.ts          |  50.00 |   62.50 |        5 |         0 |          3 |        2 |        0 |
  persistence.ts          |   0.00 |    0.00 |        0 |         0 |          0 |       38 |        0 |
  releaseAlpha.ts         | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  releaseGa.ts            | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  securitySemver.ts       | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
  usabilityMetrics.ts     |  42.86 |   42.86 |        6 |         0 |          8 |        0 |        0 |
 diff-headless            |  69.23 |   75.00 |       17 |         1 |          6 |        2 |        0 |
  index.ts                |  69.23 |   75.00 |       17 |         1 |          6 |        2 |        0 |
 keymap                   |  55.56 |   55.56 |        5 |         0 |          4 |        0 |        0 |
  index.ts                |  42.86 |   42.86 |        3 |         0 |          4 |        0 |        0 |
  preferences.ts          | 100.00 |  100.00 |        2 |         0 |          0 |        0 |        0 |
 node                     |  53.66 |   68.75 |       22 |         0 |         10 |        9 |        0 |
  cleanupPythonSources.ts |  44.44 |   66.67 |        4 |         0 |          2 |        3 |        0 |
  moveDevFiles.ts         |  64.71 |   73.33 |       11 |         0 |          4 |        2 |        0 |
  stubsMigration.ts       |  50.00 |   80.00 |        4 |         0 |          1 |        3 |        0 |
  typesDirectory.ts       |  42.86 |   50.00 |        3 |         0 |          3 |        1 |        0 |
 ui                       |  39.73 |   67.44 |       29 |         0 |         14 |       30 |        0 |
  changeBars.ts           |  31.82 |   50.00 |        7 |         0 |          7 |        8 |        0 |
  popupWidget.ts          |   0.00 |    0.00 |        0 |         0 |          0 |       19 |        0 |
  reviewPanel.ts          |  66.67 |   72.00 |       18 |         0 |          7 |        2 |        0 |
  toolbar.ts              |  80.00 |  100.00 |        4 |         0 |          0 |        1 |        0 |
 index.ts                 |  45.45 |   55.56 |        5 |         0 |          4 |        2 |        0 |
--------------------------|--------|---------|----------|-----------|------------|----------|----------|
```

Please improve the tests to cover the surviving mutants listed above.
