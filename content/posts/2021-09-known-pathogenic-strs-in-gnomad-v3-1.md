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
   <img alt="STR Loci by Genomic Region" src="/news/preview/38/images/2022/01/str_genomic_region_pie_chart.png" height=300 />
</figure>

<figure>
   <figcaption>STR Loci by Inheritance Mode</figcaption>
   <img alt="STR Loci by Inheritance Mode" src="/news/preview/38/images/2022/01/str_inheritance_mode_pie_chart.png" height=280/>
</figure>

<figure>
   <figcaption></div>STR Loci by Motif Size</figcaption>
   <img alt="STR Loci by Motif Length" src="/news/preview/38/images/2022/01/str_motif_length_histogram.png" width=480/>
</figure>

### Technical Details

To genotype the 59 STR loci with disease associations, we chose to use ExpansionHunter [[Dolzhenko 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5668946/)] because 1) we found that it had the best accuracy among existing tools for detecting expansions at disease-associated loci across a wide range of repeat sizes - both shorter and longer than read length, and 2) it’s now widely used for STR research and diagnosis in rare disease cohorts, including in [[Ibanez 2020](https://www.biorxiv.org/content/10.1101/2020.11.06.371716v1)], [[Stranneheim 2021](https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-021-00855-5)], [[van der Sanden 2021](https://pubmed.ncbi.nlm.nih.gov/33846582/)]. 

In order to run ExpansionHunter on these 59 loci, we generated an ExpansionHunter [variant catalog](https://github.com/broadinstitute/str-analysis/tree/main/str_analysis/variant_catalogs) that specifies the reference coordinates and motif of each locus. 

We then ran an [I/O-optimized version](https://github.com/bw2/ExpansionHunter/tree/master/bin) of [ExpansionHunter v5](https://github.com/Illumina/ExpansionHunter) on the 19,241 of gnomAD v3.1 samples for which the raw read data files were still available. This includes 12,374 (64%) PCR-free samples, 2,424 (13%) PCR-plus samples and 4,443 (23%) samples with unknown PCR protocol. The per-sample PCR protocol information is displayed in the Read Data section of the STR page and is also included in the readviz metadata file \[link].

We then ran [REViewer](https://github.com/Illumina/REViewer) to generate read visualizations. Finally, we used python scripts in the [STR-analysis repo](https://github.com/broadinstitute/str-analysis) to aggregate results into the JSON format available for download.

ExpansionHunter allows users to optionally specify off-target regions. Specifying these for a locus allows ExpansionHunter to avoid underestimating very large expansions but also increases the chance that ExpansionHunter will overestimate some genotypes. 

After considering the trade-offs, we chose not to include off-target regions for any of the results shown in the browser.  In our experience with STR genotyping in rare disease cohorts, we have found that it is best to run ExpansionHunter without off-target regions on the first pass, even for loci such as DMPK or C9orf72 where we see very large expansions. Although this produces underestimated genotypes in highly-expanded samples, these genotypes are still outliers relative to other individuals in the cohort, and can therefore be flagged and re-genotyped later using off-target regions for the few cases where we suspect a very large (> ~350bp) expansion. 

Although we display only the results generated without off-target regions in the browser, we provide an additional [variant catalog](https://github.com/broadinstitute/str-analysis/tree/main/str_analysis/variant_catalogs) that does include off-target regions for all loci. We also provide the results of running this catalog on all gnomAD samples as a downloadable data file \[link]. 


### Loci with Non-Reference Pathogenic Motifs

Nine out of the 59 STR loci are unusual in that they vary among individuals not just in the allele sizes, but also in the motifs present at the locus. These have been termed “replaced/nested” loci by [Halman 2021]. Existing STR genotyping tools such as ExpansionHunter and GangSTR require users to pre-specify the motif, and so do not work well for loci where the motif is not predefined. Other tools such as ExpansionHunterDenovo and STRling do not have this limitation, but are not sufficiently accurate at these loci. As a temporary solution, we previously developed a specialized script - call_non_ref_pathogenic_motifs.py - which first detects the one or two motifs present at each of these loci in a given individual and then runs ExpansionHunter for each motif to estimate its allele size. The approach used by this script is, coincidentally, a simpler version of the approach used by STRling. Unbiased comparisons are difficult given the small number of positive controls and the fact that we designed the script based on these positive controls. However, we found that the script has good sensitivity on a handful of positive RFC1 controls and relatively high specificity, flagging fewer than 10 likely-false-negative samples in a cohort of over 4,000 rare disease WGS samples. A more detailed description of the approach is available on github [link] and in a separate blog post [link]. 

### Read Visualizations

We used the REViewer tool to generate read visualizations for all individuals at each locus. These images show the reads that ExpansionHunter considered when determining a genotype, and are primarily useful for identifying likely over-estimated genotypes and, to a lesser degree, under-estimated genotypes. Please note that we have included a section below on “Supplemental Details for Examining Read Visualizations” that users may find helpful. 

### Navigating STR Pages in the gnomAD Browser

The STR table [update link] is the best place to start for exploring the STR data. It contains the list of 59 disease-associated loci, their repeat motif, genomic region, inheritance mode, and disease association(s). 

As an example, we can look at the PABPN1 locus (chr14:23321473-23321490), which causes autosomal dominant oculopharyngeal muscular dystrophy (OPMD) when the number of GCG repeats expands to 7 or more on one allele. It should be noted that immediately to the right of the main GCG repeat sequence are 3 GCA repeats followed by a GCG. As GCA and GCG both code for alanine, early publications include these adjacent repeats in their definition of the locus, and therefore place the pathogenic threshold at  ≥ 11 repeats. Recent reviews such as [Depienne 2021] also use this definition. On the other hand, for technical reasons involving better ExpansionHunter accuracy on pure vs. non-pure repeats, we and others include only the 6 pure GCG repeats in our definition of the locus, and therefore define the pathogenic threshold as ≥ 7 repeats.

To see the PABPN1 STR page, we can scroll down in the table and click on “PABPN1”. Another option is to search the gnomAD browser for “PABPN1” and click on this note at the top of the PABPN1 gene page:
[TODO add image]


### Discussion

Discussion

### Acknowledgments

We thank Stephanie DiTroia, Grace VanNoy, and Nehir Kurtas for reviewing the list of known pathogenic loci and evaluating disease associations; Egor Dolzhenko for consultations on various topics related to ExpansionHunter, REViewer, and STRs; Depienne et al. and Halman et al. authors for the very helpful resources; Yossi Farjoun for mentorship during the initial stages of the project; Jackie Goldstein, Daniel King, Cotton Seed and the rest of the hail team for building Hail Batch and other tools that made it much easier to generate this callset.

### Supplemental Details for Examining Read Visualizations

Supplemental Details for Examining Read Visualizations