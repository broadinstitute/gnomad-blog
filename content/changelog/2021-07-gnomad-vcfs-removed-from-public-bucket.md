---
title: gnomAD VCFs removed from public bucket
date: "2021-07-08"
order: 1
---

Last year, as part of an effort to reduce costs, [we shifted our public Hail-formatted tables into requester-pays buckets](/2020-07-requester-pays-notice/). In keeping with our commitment to make gnomAD data as free and accessible to the world as possible, we continued to make VCFs free to download, paying for these downloads ourselves.

Over the last year, we’ve worked with major cloud providers to [make these VCFs available for free via their public dataset programs](/2020-10-open-access-to-gnomad-data-on-multiple-cloud-providers/). We’ve decided, as a result, to remove gnomAD VCF files from our own bucket, and encourage users to make use of the (identical) VCF files hosted by our cloud partners.

<!-- end_excerpt -->

For many months, the download links for VCFs on our browser have pointed to copies hosted by our cloud partners, so users won’t experience any disruption or notice any differences when they navigate to the browser to download gnomAD data. Users who were previously accessing VCF files by browsing our public bucket will need to change the bucket from which they pull files. These buckets are listed at https://gnomad.broadinstitute.org/downloads.
