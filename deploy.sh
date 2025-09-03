#!/usr/bin/env sh
# abort on errors
set -e

# echo commands (useful for CI/debugging)
set -o pipefail

# build
# Auto-detect package manager
if command -v yarn >/dev/null 2>&1; then
	yarn run build
elif command -v pnpm >/dev/null 2>&1; then
	pnpm run build
else
	npm run build
fi
# navigate into the build output directory (Vite outDir is 'docs' in vite.config.ts)
cd docs
# ensure GitHub Pages doesn't run Jekyll (which can ignore files under _* paths)
touch .nojekyll
# if you are deploying to a custom domain locally
# echo 'www.example.com' > CNAME

# Note: Deployment is handled by GitHub Actions (see .github/workflows/pages.yml)
# This script only builds locally into 'docs/'.
cd -
