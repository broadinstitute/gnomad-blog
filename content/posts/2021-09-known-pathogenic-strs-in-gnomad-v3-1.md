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
* [Downloadable variant catalogs](https://github.com/broadinstitute/str-analysis/tree/main/str_analysis/variant_catalogs) for running ExpansionHunter on these 59 loci for either GRCh38 or GRCh37, with or without off-target regions
* A specialized approach for calling loci such as RFC1 where the pathogenic motif(s) differ from the motif in the reference genome
* Downloadable data table containing all results displayed in the browser, as well as additional results such as genotypes generated using off-target regions [**TODO link**]



### Background

Short tandem repeats (STRs) are nucleotide sequences that consist of a short motif that repeats consecutively. For example, the HTT gene contains an STR locus at [chr4:3074877-3074933](https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr4%3A3074877%2D3074933&hgsid=1232944787_Aj84fZJCMhu3R1w3kBZGgLqXAaqW) where the CAG motif (also known as the “repeat unit”) occurs 19 times. The human genome has millions of STR loci with various motifs. These loci can mutate through mechanisms such as strand slippage during replication, resulting in either an increase (i.e., expansion) or decrease (i.e., contraction) in the number of repeats. Collectively, STRs have a very high mutation rate, contributing approximately the same number of de novo mutations per generation as single nucleotide variants (SNVs), indels, and structural variants (SVs) combined \[1]. During the last 30 years, approximately 60 STR loci have been identified as causal for monogenic diseases. In most cases, these loci cause disease only if they expand beyond a certain pathogenic threshold. For example, the CAG STR in the HTT gene causes [Huntington Disease](https://omim.org/entry/143100?search=Huntington%20Disease&highlight=disease%20huntington) when it expands beyond 40 repeats. Some of the disease-associated STR loci also have an intermediate range below the pathogenic threshold that is associated with milder disease or reduced penetrance. For example, the intermediate range for HTT is between 36 and 40 CAG repeats. For some disease-associated loci such as RFC1 and DAB1, individuals may differ not only in the number of repeats, but also in the motif(s) that are present at the locus. Additionally, only a subset of these motifs may be disease-causing. For example, most individuals have AAAAG repeats within the RFC1 locus at [chr4:39348425-39348479](https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr4%3A39348425%2D39348479&hgsid=1179869963_NhDZlzqODCQBWm5vvpmhXBdovC3N). However, some individuals have AAGGG repeats instead. Biallelic expansions of the AAGGG motif cause [CANVAS](https://www.omim.org/entry/614575), while expansions of the AAAAG motif do not cause disease.

1. [[Steely 2021](https://www.biorxiv.org/content/10.1101/2021.11.22.469627v1.full)] estimates 85 de novo changes in repeat length at STR loci per generation. [[Trost 2021](https://academic.oup.com/hmg/article/30/R2/R174/6325570)] reviews de novo mutation rate estimates for other variant classes.

### Disease-Associated Loci

We collected and curated known pathogenic loci from sources such as [[Depienne 2021](https://pubmed.ncbi.nlm.nih.gov/33811808/)], [STRipy](https://stripy.org/database), [OMIM](https://www.omim.org/), and [GeneReviews](https://www.ncbi.nlm.nih.gov/books/NBK1116/). This yielded a catalog of 59 unique loci with the following characteristics:

<figure>
   <figcaption>STR Loci by Genomic Region</figcaption>
   <img alt="STR Loci by Genomic Region" src="/news/preview/38/images/2022/01/str_genomic_region_pie_chart.png" />
</figure>

<figure>
   <figcaption>STR Loci by Inheritance Mode</figcaption>
   <img alt="STR Loci by Inheritance Mode" src="/news/preview/38/images/2022/01/str_inheritance_mode_pie_chart.png" />
</figure>

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