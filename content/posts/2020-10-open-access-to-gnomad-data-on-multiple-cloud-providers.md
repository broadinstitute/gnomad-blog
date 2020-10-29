---
title: Open access to gnomAD data on multiple cloud providers
date: '2020-10-29'
categories:
  - Announcements
authors:
  - Grace Tiao
---
We’re very pleased to announce that gnomAD data is now [available](https://gnomad.broadinstitute.org/downloads) as a free public dataset on Amazon Web Services, Microsoft Azure, and Google Cloud. **Researchers may download and read gnomAD data for free in all regions from all three cloud providers.**

From our beginnings as a project, we have been committed to making gnomAD data as free and accessible to the world as possible. Working in partnership with Amazon, Microsoft, and Google’s public data hosting programs, we have expanded the number of cloud platforms on which gnomAD data is fully free to access. Researchers will no longer need to maintain personal copies of gnomAD data on these cloud platforms, eliminating long-term storage costs as well as transfer fees associated with copying gnomAD data into private cloud storage.

Access through these cloud providers also enables researchers to integrate gnomAD data with other genomics datasets, such as the [UK Biobank Pan-Ancestry Summary Statistics on AWS](https://registry.opendata.aws/broad-pan-ukb/), [Human PanGenomics Project on AWS](https://registry.opendata.aws/hpgp-data/), [Azure Genomics Data Lake](https://azure.microsoft.com/en-us/services/open-datasets/catalog/genomics-data-lake/), [Library of Integrated Network-Based Cellular Signatures (LINCS) on Google Cloud](https://console.cloud.google.com/marketplace/product/umiami-lincs/umiami-lincs?filter=solution-type:dataset&filter=category:genomics&id=2000bf1c-07e6-496e-896e-df1f4d47ee63), and [Human Variant Annotation Datasets on Google Cloud](https://console.cloud.google.com/marketplace/product/bigquery-public-data/human-variant-annotation-public?filter=solution-type:dataset&filter=category:genomics&id=9e418c65-7c29-471f-8539-9557e96f807c).

As we anticipate further exponential growth of human genomic datasets over the next few years, we believe that the computational genomics community can benefit from free and open access to shared datasets. By reducing unnecessary duplication of terabyte- and petabyte-scale genomic datasets, we as a community can save scarce environmental, capital, and human resources that would otherwise be spent maintaining many copies across separate institutions.

In doing so, we hope to encourage an even wider range of individuals and institutions to make use of gnomAD data for innovative research in human genetics and for the development of translational tools and medicines to treat and cure disease.

All gnomAD data, stretching back to our earliest release, is now available through these cloud providers, along with supporting resources (such as truth sets and interval lists used in the creation of gnomAD releases, and data from our latest [collection](https://www.nature.com/immersive/d42859-020-00002-x/index.html) of papers in *Nature*). Individual links to specific resources hosted by each cloud provider are updated on our [Downloads](https://gnomad.broadinstitute.org/downloads) page.

For further details about gnomAD and other open datasets hosted on each provider, please see:

* [Broad Institute gnomAD data now accessible on the Registry of Open Data on AWS](https://aws.amazon.com/blogs/industries/broad-institute-gnomad-data-now-accessible-on-the-registry-of-open-data-on-aws/)
* [Genome Aggregation Database (gnomAD): Now available on Azure Open Datasets](https://techcommunity.microsoft.com/t5/healthcare-and-life-sciences/genome-aggregation-database-gnomad-now-available-on-azure-open/ba-p/1824798)
* [Providing open access to the Genome Aggregation Database (gnomAD) on Google Cloud](https://cloud.google.com/blog/topics/healthcare-life-sciences/google-cloud-providing-free-access-to-genome-aggregation-database)

## **How to access the data**

### Registry of Open Data on AWS

Files can be browsed and downloaded using the [AWS Command Line Interface](https://docs.aws.amazon.com/cli/).

`aws s3 ls gs://gnomad-public-us-east-1/release/`

### Azure Open Datasets

Files can be browsed and downloaded using [AzCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10) or [Azure Storage Explorer](https://azure.microsoft.com/en-us/features/storage-explorer/).

`azcopy ls https://azureopendatastorage.blob.core.windows.net/gnomad/`

### Google Cloud Public Datasets

Files can be browsed and downloaded using [gsutil](https://cloud.google.com/storage/docs/gsutil).

`gsutil ls gs://gcp-public-data--gnomad/release/`