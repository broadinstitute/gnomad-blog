---
title: gnomAD-hosted public files moved to requester-pays bucket
date: 2021-08-09
order: 1
---
We recently [removed all gnomAD VCFs from our public buckets](https://gnomad.broadinstitute.org/news/2021-07-gnomad-vcfs-removed-from-public-bucket/), as these files are now hosted via public dataset programs on [three major cloud providers](https://gnomad.broadinstitute.org/news/2020-10-open-access-to-gnomad-data-on-multiple-cloud-providers/). We have now moved all remaining public gnomAD data to a requester-pays bucket and plan to make these files free to access through public dataset programs soon.

Until then, users will need to change the root bucket for public gnomAD files from `gs://gnomad-public` to `gs://gnomad-public-requester-pays`; the filepaths otherwise remain the same. For more information on accessing data in requester-pays buckets, see our previous announcement [here](https://gnomad.broadinstitute.org/news/2020-07-requester-pays-notice/#how-to-access-gnomad-data-in-the-requester-pays-bucket).