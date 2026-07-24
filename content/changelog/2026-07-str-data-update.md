---
title: Update gnomAD tandem repeat (TR) data
date: 2026-07-20
order: 1
---

This minor update to the [gnomAD TR pages](https://gnomad.broadinstitute.org/short-tandem-repeats?dataset=gnomad_r4) includes:
- Added a new disease-associated TR locus: [RAI1](https://strchive.org/loci/FAME8_RAI1), so there's now data for 78 total TR loci (up from 77). Also adding pathogenic thresholds for three loci that already had TR data but previously lacked a disease association: [AFF3](https://strchive.org/loci/FRA2A_AFF3) (300), [CBL](https://strchive.org/loci/JBS_CBL) (101), and [ZNF713](https://strchive.org/loci/FRA7A_ZNF713) (450) copied from [STRchive](https://strchive.org/) [v2.24.2](https://github.com/dashnowlab/STRchive/blob/main/CITATION.cff).

- Updated pathogenic thresholds for the following loci. These changes are primarily based on syncing thresholds with [STRchive](https://strchive.org/) [v2.24.2](https://github.com/dashnowlab/STRchive/blob/main/CITATION.cff), while taking into account some differences in how loci are defined in gnomAD vs. STRchive (for example, [RUNX2](https://strchive.org/loci/CCD_RUNX2) has a reference region that's narrower by three trinucleotide repeats in gnomAD compared to STRchive, so the pathogenic threshold is also lower by three repeats):

  - [ATXN3](https://strchive.org/loci/SCA3_ATXN3) (CTG x 56 → 60)
  - [CACNA1A](https://strchive.org/loci/SCA6_CACNA1A) (CTG x 20 → 21)
  - [CNBP](https://strchive.org/loci/DM2_CNBP) (CAGG x 55 → 75)
  - [FXN](https://strchive.org/loci/FRDA_FXN) (GAA x 66 → 56)
  - [MARCHF6](https://strchive.org/loci/FAME3_MARCHF6) (ATTTT x 668 → 650)
  - [NOTCH2NLC](https://strchive.org/loci/NIID_NOTCH2NLC) (GGC x 90 → 66)
  - [PHOX2B](https://strchive.org/loci/CCHS_PHOX2B) (GCN x 24 → 26)
  - [RUNX2](https://strchive.org/loci/CCD_RUNX2) (GCN x 20 → 17)
  - [SAMD12](https://strchive.org/loci/FAME1_SAMD12) (AAAAT x 100 → 97)
  - [TBP](https://strchive.org/loci/SCA17_TBP) (GCA x 43 → 49)
  - [XYLT1](https://strchive.org/loci/DBQD2_XYLT1) (GCC x 110 → 72)
  - [ZFHX3](https://strchive.org/loci/SCA4_ZFHX3) (GCC x 41 → 46)

- Added manual genotype quality scores based on manual review of the shortest alleles at [PRE-MIR7-2](https://gnomad.broadinstitute.org/short-tandem-repeat/PRE-MIR7-2?dataset=gnomad_r4) , since contracted alleles (TTTG x 3 repeats) at this locus are pathogenic. Unsurprisingly, all 33 alleles called as having three repeats are clear genotyping errors:

  ![PRE-MIR7-2 allele size distribution showing all 3-repeat alleles flagged as low quality](../images/2026/pre-mir7-2-contracted-alleles.png)

  ![Read visualization of a PRE-MIR7-2 sample genotyped as 3/4 repeats, showing a clear genotyping error](../images/2026/pre-mir7-2-genotyping-error-example.png)

  Screenshots from the [PRE-MIR7-2](https://gnomad.broadinstitute.org/short-tandem-repeat/PRE-MIR7-2?dataset=gnomad_r4) page. Thanks to [Helmut Grasberger](https://discuss.gnomad.broadinstitute.org/t/tandem-repeat-pre-mir7-2/747) for flagging this issue.

<!-- end_excerpt -->

**Site Updates**

- Added a data-version label to the TR pages.

