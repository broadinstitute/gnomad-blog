---
title: Regional Missense Constraint Metric in gnomAD
date: "2026-06-15"
order: 1
---

The regional missense constraint (RMC) track has now been added to the gene pages in the gnomAD v4 browser. 

<!-- end_excerpt -->

This track was previously only available on the v2 and ExAC browsers. 

Regional missense constraint was calculated on 19,375 Mane Select (v0.95) and canonical transcripts as defined by GENCODE v39 for protein-coding genes. This consists of 17,841 high quality transcripts (transcripts without outlier variant counts, such as having too many observed rare missense variants), and 1,534 transcripts with outlier counts. We caution that metrics may be less accurate in outlier transcripts.

Note that in the updated track, regions with low coverage (percent allele number or %AN < 90) or have observed to expected ratios significantly different from 1 are colored in gray.

For more information about how these data were generated, please see the RMC help [page](https://gnomad.broadinstitute.org/help/regional-constraint).

