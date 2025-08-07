# TRACEABILITY

| Requirement                    | Implementation            | Tests                                |
| ------------------------------ | ------------------------- | ------------------------------------ |
| F-1 CriticMarkup parsing       | src/core/criticParser.ts  | **tests**/criticParser.test.ts       |
| F-2 Format change tracking     | src/core/formatTracker.ts | **tests**/formatTracker.test.ts      |
| F-3 Accessible palette         | src/styles.css            | **tests**/accessibilityAudit.test.ts |
| F-4 Change-bar decoration      | src/ui/changeBars.ts      | **tests**/changeBars.test.ts         |
| F-5 Toolbar toggles            | src/ui/toolbar.ts         | **tests**/toolbar.test.ts            |
| F-6 Pop-up widget              | src/ui/popupWidget.ts     | **tests**/popupWidget.test.ts        |
| F-7 Review panel               | src/ui/reviewPanel.ts     | **tests**/reviewPanel.test.ts        |
| F-8 Comments system            | src/core/comments.ts      | **tests**/comments.test.ts           |
| F-9 User identity hook         | src/api/user.ts           | **tests**/user.test.ts               |
| F-10 Persistence of marks      | src/core/persistence.ts   | **tests**/persistence.test.ts        |
| F-11 Keyboard-map utility      | src/keymap/index.ts       | **tests**/keymap.test.ts             |
| F-12 Generic attach API        | src/attach.ts             | **tests**/attach.test.ts             |
| F-13 Performance tests         | src/core/performance.ts   | **tests**/performance.test.ts        |
| F-14 Documentation site update | docs/                     | **tests**/docsUpdate.test.ts         |
