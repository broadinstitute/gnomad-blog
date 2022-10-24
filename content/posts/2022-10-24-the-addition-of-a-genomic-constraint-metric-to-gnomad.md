---
title: The Addition of a Genomic Constraint Metric to gnomAD
date: 2022-10-24
order: 1
categories:
  - Announcements
authors:
  - Siwei Chen
  - Konrad Karcewski
  - Riley Grant
---
### Overview

A genomic constraint metric is now available on the gnomAD browser. We quantify the depletion of variation (constraint) at a 1kb scale with a signed Z score by comparing the observed variation to an expectation. In each tiling 1kb genomic region, the expected number of variants is predicted using an improved mutional model that takes into account both local sequence context and a variety of genomic features. A higher positive Z score (i.e., observing fewer variants than expectation) indicates higher constraint. To learn more about the genomic constraint, what it means, and how it was calculated, view the [full preprint on bioRxiv](https://www.biorxiv.org/content/10.1101/2022.03.20.485034v2).

This metric was calculated for the GRCh38 build of the human genome, and is available for the gnomAD dataset version 3.1.1 on both the Variant and Region pages.

* See the [genomic constraint table](http://gnomad.broadinstitute.org/variant/1-55040049-G-A?dataset=gnomad_r3) for the 1kb window a variant falls in.
* See the [genomic constraint track](http://gnomad.broadinstitute.org/region/1-55039447-55064852?dataset=gnomad_r3) for a given region
* See the [genomic constraint track](http://gnomad.broadinstitute.org/region/1-55020049-55060049?variant=1-55040049-G-A&dataset=gnomad_r3) in the 40kb region surrounding a specified variant.

All the data is also [available for download](http://gnomad.broadinstitute.org/downloads), under the research tab.
