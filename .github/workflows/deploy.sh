#!/bin/bash -eu

if [ "$GITHUB_EVENT_NAME" == "push" ]; then
    PATH_PREFIX="/blog" yarn run build
    gsutil -m rsync -r "public" "gs://gnomad-blog/master"
elif [ "$GITHUB_EVENT_NAME" == "pull_request" ]; then
    event_action=$(jq --raw-output .action "$GITHUB_EVENT_PATH")
    pr_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")

    if [ "$event_action" == "closed" ]; then
        gsutil -m rm -r "gs://gnomad-blog/pulls/${pr_number}"
    else
        PATH_PREFIX="/blog/preview/${pr_number}" yarn run build
        gsutil -m rsync -r "public" "gs://gnomad-blog/pulls/${pr_number}"
    fi
fi
