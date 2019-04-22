#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn
yarn build

# cp ga
cp ./google*.html ./docs

# navigate into the build output directory
cd docs

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin git@github.com:HiDIKI/hidiki.github.io.build.git
git config user.name hidekuma
git config user.email d.hidekuma@gmail.com
git add -A
git commit -m 'DEPLOY'
git push -f --set-upstream origin master

# if you are deploying to https://<USERNAME>.github.io
git push

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
