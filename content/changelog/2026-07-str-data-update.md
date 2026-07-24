---
title: Update gnomAD tandem repeat (TR) data
date: 2026-07-20
order: 1
---

This minor update to the [gnomAD TR pages](https://gnomad.broadinstitute.org/short-tandem-repeats?dataset=gnomad_r4) includes:
- Adding a new disease-associated TR locus: [RAI1](https://strchive.org/loci/FAME8_RAI1), so there's now data for 78 total TR loci (up from 77). Also adding pathogenic thresholds for 3 loci that already had TR data but previously lacked a disease association: [AFF3](https://strchive.org/loci/FRA2A_AFF3) (300), [CBL](https://strchive.org/loci/JBS_CBL) (101), and [ZNF713](https://strchive.org/loci/FRA7A_ZNF713) (450) copied from [STRchive](https://strchive.org/) [v2.24.2](https://github.com/dashnowlab/STRchive/blob/main/CITATION.cff).
- Updating pathogenic thresholds for [ATXN3](https://strchive.org/loci/SCA3_ATXN3) (56 → 60), [CACNA1A](https://strchive.org/loci/SCA6_CACNA1A) (20 → 21), [CNBP](https://strchive.org/loci/DM2_CNBP) (55 → 75), [FXN](https://strchive.org/loci/FRDA_FXN) (66 → 56), [MARCHF6](https://strchive.org/loci/FAME3_MARCHF6) (668 → 650), [NOTCH2NLC](https://strchive.org/loci/NIID_NOTCH2NLC) (90 → 66), [PHOX2B](https://strchive.org/loci/CCHS_PHOX2B) (24 → 26), [RUNX2](https://strchive.org/loci/CCD_RUNX2) (20 → 17), [SAMD12](https://strchive.org/loci/FAME1_SAMD12) (100 → 97), [TBP](https://strchive.org/loci/SCA17_TBP) (43 → 49), [XYLT1](https://strchive.org/loci/DBQD2_XYLT1) (110 → 72), and [ZFHX3](https://strchive.org/loci/SCA4_ZFHX3) (41 → 46). These changes are primarily based on syncing thresholds with [STRchive](https://strchive.org/) [v2.24.2](https://github.com/dashnowlab/STRchive/blob/main/CITATION.cff), while taking into account some differences in how loci are defined in gnomAD vs. STRchive (for example, [RUNX2](https://strchive.org/loci/CCD_RUNX2)).
- Adding manual genotype quality scores based on manual review for the shortest alleles at [PRE-MIR7-2](https://gnomad.broadinstitute.org/short-tandem-repeat/PRE-MIR7-2?dataset=gnomad_r4) , accounting for the fact that contractions at this locus are pathogenic.

<!-- end_excerpt -->

**Site Updates**

- Added a data-version label to the TR pages.

