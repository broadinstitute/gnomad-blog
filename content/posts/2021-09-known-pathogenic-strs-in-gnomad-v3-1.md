---
title: The Addition of Short Tandem Repeat Calls to gnomAD
date: 2022-01-21
order: 1
categories:
  - Announcements
authors:
  - Ben Weisburd
  - Grace VanNoy
  - Nick Watts
---
### Overview

We have generated short tandem repeat (STR) calls for 59 disease associated loci by running ExpansionHunter [[Dolzhenko 2019](https://academic.oup.com/bioinformatics/article/35/22/4754/5499079)] on 19,241 whole genome samples from gnomAD v3.1. 

This release includes:

* Distributions of STR genotypes in the general population, with subsets by ancestry group and sex
* Visualizations of the read data for all samples at all 59 loci
* Collected reference information including disease associations and inheritance modes
* [Downloadable variant catalogs](https://github.com/broadinstitute/str-analysis/tree/main/str_analysis/variant_catalogs) for running ExpansionHunter on these 59 loci for either GRCh38 or GRCh37, with or without off-target regions.
* A specialized approach for calling loci such as RFC1 where the pathogenic motif(s) differ from the motif in the reference genome
* Downloadable data underlying the displayed distributions, as well as additional results not displayed in the browser - such as genotypes called using off-target regions [**TODO link**]



### Background

About STRs

### Disease-Associated Loci

Disease-Associated Loci

### Technical Details

Technical Details

### Loci with Non-Reference Pathogenic Motifs

Loci with Non-Reference Pathogenic Motifs

### Read Visualizations

Read Visualizations

### Navigating STR Pages in the gnomAD Browser

Navigating STR Pages in the gnomAD Browser

### Discussion

Discussion


### Acknowledgments

We thank Stephanie DiTroia, Grace VanNoy, and Nehir Kurtas for reviewing the list of known pathogenic loci and evaluating disease associations; Egor Dolzhenko for consultations on various topics related to ExpansionHunter, REViewer, and STRs; Depienne et al. and Halman et al. authors for the very helpful resources; Yossi Farjoun for mentorship during the initial stages of the project; Jackie Goldstein, Daniel King, Cotton Seed and the rest of the hail team for building Hail Batch and other tools that made it much easier to generate this callset.

### Supplemental Details for Examining Read Visualizations

Supplemental Details for Examining Read Visualizations
