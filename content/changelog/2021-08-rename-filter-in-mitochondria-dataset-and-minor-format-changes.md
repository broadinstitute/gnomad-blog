---
title: Rename filter in mitochondria dataset and minor format changes
date: 2021-08-03
order: 1
---
<!-- end_excerpt -->

* We corrected:

  1. dbSNP rsIDs. The dbSNP resource we used to annotate rsIDs was not split for multi-allelic variants, so if a variant was multi-allelic in the dbSNP b154 VCF, this variant received no rsID annotation. This has been fixed in the release Hail Table and VCFs. When adding this fix we noticed that some variants can have multiple rsIDs associated with them, so we now store rsID as a set instead of a string in the release Hail Table. 
* We changed:

  1. The name of the "heteroplasmy_below_10_percent" filter to "heteroplasmy_below_min_het_threshold" to maintain consistency in the filter name while allowing for flexibility in changes to the value of the threshold in the future.

  2. The header of the VCF for  "indel_stack" to specify heteroplasmic variants.
* We added:

  1. A global annotation  ("global_annotation_description") that contains the descriptions for annotations found in the Hail Table.