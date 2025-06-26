#!/usr/bin/env bash
# scripts/next-agent.sh
# -----------------------------------------------
# Echo the short ID of the next Codex agent
# (planner, architect, scaffolder, builder, etc.)
# or nothing if no agent needs to run.
# Expected to run inside a GitHub Actions runner.

set -euo pipefail

# Branch name like "feat/login"
BRANCH="${GITHUB_REF#refs/heads/}"

# Look up the open PR for this branch (if any)
PR_JSON=$(gh pr list --head "$BRANCH" --state open --json number,labels -q '.[0]' || true)

if [[ -z "$PR_JSON" ]]; then
  # No open PR → nothing to do (e.g. direct push to main)
  echo ""
  exit 0
fi

# Look for a label that starts with ready-for:
LABEL=$(echo "$PR_JSON" | jq -r '.labels[].name' | grep -E '^ready-for:' || true)

if [[ -n "$LABEL" ]]; then
  # Strip the prefix to get the agent ID
  echo "${LABEL#ready-for:}"
  exit 0
fi

# Fallback: if the last CI run failed, ask fixer to step in
STATUS=$(gh run list --branch "$BRANCH" --json status -q '.[0].status' || echo "success")
if [[ "$STATUS" == "failure" ]]; then
  echo "fixer"
  exit 0
fi

# Nothing to route
echo ""
