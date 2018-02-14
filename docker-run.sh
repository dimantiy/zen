export JEKYLL_VERSION=3.7.2
docker run --rm \
  --volume=$PWD:/srv/jekyll \
  -p 35729:35729 -p 4000:4000 \
  -it jekyll/builder:$JEKYLL_VERSION \
  jekyll serve
