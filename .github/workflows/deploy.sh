#!/bin/bash -eu

if [ "$GITHUB_EVENT_NAME" == "push" ]; then
    PATH_PREFIX="/blog" yarn run build

    gsutil -m rsync -r "public" "gs://gnomad-blog/tmp"
    gsutil -m setmeta -h "Cache-Control:private, max-age=0, no-transform" -r "gs://gnomad-blog/tmp"
    gsutil -m rsync -r "gs://gnomad-blog/tmp" "gs://gnomad-blog/master"
    gsutil -m rm -r "gs://gnomad-blog/tmp"

    curl \
      --request POST \
      --url "https://api.github.com/repos/${GITHUB_REPOSITORY}/statuses/${GITHUB_SHA}" \
      --header "authorization: Bearer ${GITHUB_TOKEN}" \
      --header "content-type: application/json" \
      --data '{
        "state": "success",
        "target_url": "https://gnomad.broadinstitute.org/blog",
        "description": "Site deployed",
        "context": "actions/deploy"
      }'

elif [ "$GITHUB_EVENT_NAME" == "pull_request" ]; then
    event_action=$(jq --raw-output .action "$GITHUB_EVENT_PATH")
    pr_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")

    if [ "$event_action" == "closed" ]; then
        gsutil -m rm -r "gs://gnomad-blog/pulls/${pr_number}"
    else
        # Do not include Google Analytics in preview builds
        unset GA_TRACKING_ID

        PATH_PREFIX="/blog/preview/${pr_number}" yarn run build
        gsutil -m rsync -r "public" "gs://gnomad-blog/pulls/${pr_number}"
        gsutil -m setmeta -h "Cache-Control:private, max-age=0, no-transform" -r "gs://gnomad-blog/pulls/${pr_number}"

        sha=$(jq --raw-output .pull_request.head.sha "$GITHUB_EVENT_PATH")

        curl \
          --request POST \
          --url "https://api.github.com/repos/${GITHUB_REPOSITORY}/statuses/${sha}" \
          --header "authorization: Bearer ${GITHUB_TOKEN}" \
          --header "content-type: application/json" \
          --data "{
            \"state\": \"success\",
            \"target_url\": \"https://gnomad.broadinstitute.org/blog/preview/${pr_number}\",
            \"description\": \"Site deployed\",
            \"context\": \"actions/deploy\"
          }"
    fi
fi
