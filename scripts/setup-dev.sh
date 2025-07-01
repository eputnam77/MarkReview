#!/usr/bin/env bash
set -euo pipefail

# Install Node dependencies
if command -v pnpm >/dev/null 2>&1; then
    pnpm install --frozen-lockfile
else
    corepack pnpm install --frozen-lockfile
fi

# Display the dev gate commands
cat <<'EOT'
To run the development checks locally execute:

pnpm exec eslint src
pnpm exec prettier --check src
pnpm exec tsc -p tsconfig.json --noEmit
pnpm audit --production
pnpm exec vitest run --coverage --coverage.failUnder=70
EOT

