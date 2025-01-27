---
title: gnomAD toolbox
date: 2025-01-27
order: 1
categories:
  - Announcements
authors:
  - Katherine Chao
  - Michael Wilson
  - Julia Goodrich
  - Qin He
  - gnomAD Production Team
---
We have released a new utility, the gnomAD toolbox, to enable easier analysis of gnomAD data. Community feedback has highlighted challenges with the usage of our downloadable files, which have become increasingly difficult to parse due to their growing size. As the gnomAD project continues to scale, we expect the size of these files to increase further. To ensure continued access to these data and empower all users, we have created a new open-source repository containing utility functions that allow users to query gnomAD data without requiring any data downloads.

Downloading the full gnomAD short variant release is not viable for all of our users due to the space required to store the data (~1.4 TB total for the v4 exomes and genomes VCFs!) and the resources required to compute over such a large dataset. However, certain queries, such as determining the total number of singleton variants found within the gnomAD dataset, are only answerable by wrangling our downloadable data. To make these analyses more accessible to **all** users, we have created a new utility GitHub repository called the [gnomAD toolbox](https://github.com/broadinstitute/gnomad-toolbox). After installing the repository and its required software dependencies, the toolbox enables analyses on a user's local computer without requiring a local copy of gnomAD data or prior knowledge of cloud computing.

The gnomAD toolbox is a work in progress. Our initial implementation includes building functionality that calculates metrics on the short variant data requested by users via our [forum](https://discuss.gnomad.broadinstitute.org/) or email, including: 

1. How to explore various release files (variants, all sites AN, coverage, etc.)

   ![Screenshot of Jupyter notebook with code importing gnomAD release files](../images/toolbox_screenshot_1.png "Importing gnomAD release files")
2. How to filter variants in a specific gene

   ![Screenshot of Jupyter notebook with code filtering to variants in a specific gene](../images/toolbox_screenshot_2.png "Filtering to variants in a specific gene")
3. How to filter variants by VEP consequences

   ![Screenshot of Jupyter notebook with code filtering variants by VEP consequence](../images/toolbox_screenshot_3.png "Filtering variants by VEP consequence")
4. How to get the frequency information for specific genetic ancestry group(s)

   ![Screenshot of Jupyter notebook with code accessing frequency information for specific genetic ancestry group(s)](../images/toolbox_screenshot_4.png "Accessing frequency information for specific genetic ancestry group(s)")
5. How to get variant counts by frequency bin

   ![Screenshot of Jupyter notebook with code counting variants by frequency bin](../images/toolbox_screenshot_5.png "Counting variants by frequency bin")
6. How to filter to predicted loss-of-function (pLoF) variants that we used to compute constraint metrics

   ![Screenshot of Jupyter notebook filtering to pLoF variants used to compute gene constraint metrics](../images/toolbox_screenshot_6.png "Filtering to pLoF variants used to compute gene constraint metrics")

We are interested in crafting this toolbox with input from our community. We encourage our users to discuss any other desired functionality on our [forum](https://discuss.gnomad.broadinstitute.org/), and we highly encourage anyone interested in contributing new functionality to the toolbox to do so via [pull request](https://github.com/broadinstitute/gnomad-toolbox/pulls).
