---
title: Requester-Pays Notice to Users
date: 2020-07-09
categories:
  - Announcements
authors:
  - gnomAD Production Team
---

Last month the gnomAD project was billed thousands of dollars in cloud egress charges—above and beyond our normal expected costs—for users who were accessing Hail-formatted public gnomAD data. The vast majority of this excess cost was due to users spinning up machines in international regions and reading data from our US-region storage bucket.

As a result, we have decided to move gnomAD Hail tables and matrix tables to a [requester-pays](https://cloud.google.com/storage/docs/requester-pays) bucket, while keeping the VCFs and smaller public files free to download as usual. We decided to do this for the following reasons:

- From our beginnings as a project, we have been committed to making gnomAD data as free and accessible to the world as humanly possible. We pay for each VCF download of our data, and we have resisted proposals to add gating mechanisms (such as click-through agreements) to our data. We want to reaffirm our commitment to our users by continuing to make VCFs free to download to our growing user base.

- However, to maintain gnomAD, we must keep costs as low as possible and fund aspects of gnomAD that benefit the widest user base. Providing free access to the Hail-formatted versions of the data is very costly and benefits only a small proportion of our user base—those running cloud pipelines on the data. Therefore, we have decided to require users to supply Google Cloud billing information when they access Hail versions of gnomAD.

<!-- end_excerpt -->

## What does this mean for you?

- If you want to download gnomAD data in VCF format, nothing changes—it’s still free. You can continue to download files via the links on the browser or directly from our bucket using a gsutil command, and you can skip reading the rest of this message.

- If you want to run your Hail pipeline on gnomAD Hail tables or matrix tables, you will need to supply Google Cloud billing information when you run your pipeline. You will also need to update any hard-coded old paths in your pipeline to the new requester-pays paths. (If you are using the gnomAD Python [package](https://pypi.org/project/gnomad/) to reference gnomAD resources, these will be updated automatically.)

## How to access gnomAD data in the requester-pays bucket

When using hailctl to create Dataproc clusters, start clusters with `--requester-pays-allow-buckets gnomad-public-requester-pays`. More information can be found at [https://hail.is/docs/0.2/cloud/google_cloud.html#requester-pays](https://hail.is/docs/0.2/cloud/google_cloud.html#requester-pays)

When using gsutil to download files, add a `-u` argument with the ID of the GCP project to be billed. For example, `gsutil -u my-project cp -r gs://bucket-name/path/to/table.ht ./` More information can be found at [https://cloud.google.com/storage/docs/using-requester-pays#using](https://cloud.google.com/storage/docs/using-requester-pays#using)

## How to reduce your billing costs (if you’re running cloud pipelines on Hail formatted data)

Due to the Google Cloud [pricing model](https://cloud.google.com/compute/network-pricing), egress charges vary depending on the region in which the machines accessing the bucket data are spun up. For example, if a user requested machines in the Oceania region, the cost to read the Hail data stored in our US bucket is $0.15 per GB, which works out to $7500 to read 50 TB of data. This goes down to $0.08 per GB if reading from a non-Oceania, non-US, non-Canadian region ($4000 for the same 50 TB job); and $0.01 per GB ($500) if reading from a Canadian region.

*Our data lives in a US multi-region storage bucket*. This means that **if you spin up your cloud machines in any US region, you will pay $0 in egress charges** for reading the gnomAD Hail-formatted data. You may still incur charges for exporting the results of your pipeline to a bucket in a different region, but in most cases, these data are substantially smaller than the gnomAD data and will be negligible compared to a $100+ egress charge.

We strongly encourage users to choose a region for their Google Dataproc clusters that will not result in egress charges. Because we can’t control where users spin up machines, turning on requester-pays functionality will help us incentivize our users to reduce the cost of egress on Hail-formatted gnomAD data, as our users are the ones who control these costs.

(Alternately, users can copy the data into a bucket in their own region, which will incur a one-time egress charge, as well as standard storage costs for maintaining the copy. This approach will likely incur more costs than the strategy of spinning up compute in the US region to access the Hail-formatted gnomAD data, but it allows users flexibility in determining which compute regions they use.)

As our software engineering team has noted: Everyone is used to downloading data to their local machines. **Cloud providers let you reverse that arrangement and bring the compute to the data**, which is cheaper for large datasets.

## In the meantime

We are exploring other options for hosting gnomAD Hail tables and matrix tables for free. If you are a heavy gnomAD Hail user and find it impracticable to spin up compute in a US region, please get in touch with us ([gnomad@broadinstitute.org](mailto:gnomad@broadinstitute.org)), and we can explore the possibility of hosting copies of gnomAD in additional regions around the world.
