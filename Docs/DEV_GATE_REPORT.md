# Dev Gate Report

## Mypy

- **Status:** Passed
- **Output:**
```
Success: no issues found in 2 source files
```

## Ruff

- **Status:** Passed
- **Output:**
```
All checks passed!
```

## Black

- **Status:** Passed
- **Output:**
```
All done! ✨ 🍰 ✨
29 files would be left unchanged.
```

## Pytest

- **Status:** Passed
- **Output:**
```
............................                                             [100%]
28 passed in 0.07s
```

## Coverage Attempt

- **Status:** Failed
- **Error:** pytest did not recognize coverage options; the `pytest-cov` plugin may not be installed in this environment.
- **Output:**
```
ERROR: usage: pytest [options] [file_or_dir] [file_or_dir] [...]
pytest: error: unrecognized arguments: --cov=src --cov-fail-under=70
  inifile: /workspace/MarkReview/pyproject.toml
  rootdir: /workspace/MarkReview
```

Coverage data could not be collected due to the missing plugin.
