#!/bin/bash

export BASE_ASSETS_PATH=$1
export ASSET_BUNDLE_SERVER=$2
export TARGET_S3_URL=$3
export BUILD_NUMBER=$4
export GIT_COMMIT=$5
export BUILD_VERSION="${BUILD_NUMBER} (${GIT_COMMIT})"

# To build + push to S3 run:
# hab studio run "bash scripts/hab-build-and-push.sh"
# On exit, need to make all files writable so CI can clean on next build

trap 'chmod -R a+rw .' EXIT

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "$DIR/.."

rm /usr/bin/env
ln -s "$(hab pkg path core/coreutils)/bin/env" /usr/bin/env
hab pkg install -b core/coreutils core/bash core/node core/git core/aws-cli

npm ci --verbose --no-progress
npm run build
mkdir dist/pages
mv dist/*.html dist/pages

aws s3 sync --acl public-read --cache-control "max-age=31556926" dist/assets "$TARGET_S3_URL/assets"
aws s3 sync --acl public-read --cache-control "no-cache" --delete dist/pages "$TARGET_S3_URL/pages/latest"
