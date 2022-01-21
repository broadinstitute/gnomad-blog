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
* A specialized approach for calling loci such as *RFC1* where the pathogenic motif(s) differ from the motif in the reference genome
* Downloadable data table containing all results displayed in the browser, as well as additional results such as genotypes generated using off-target regions [**TODO link**]

These resources can be used as a comparison set for STR calls in rare disease cohorts, allowing users to see whether particular genotypes are common or rare. Additionally, we hope the provided variant catalogs and reference information will allow more researchers to genotype these loci in their own cohorts. Finally, the plots, read visualizations, and data file are designed to enable exploration of interesting questions related to disease-associated STR loci. 

### Background

Short tandem repeats (STRs) are nucleotide sequences that consist of a short motif that repeats consecutively. For example, the *HTT* gene contains an STR locus at [chr4:3074877-3074933](https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr4%3A3074877%2D3074933&hgsid=1232944787_Aj84fZJCMhu3R1w3kBZGgLqXAaqW) where the CAG motif (also known as the “repeat unit”) occurs 19 times. The human genome has millions of STR loci with various motifs. These loci can mutate through mechanisms such as strand slippage during replication, resulting in either an increase (i.e., expansion) or decrease (i.e., contraction) in the number of repeats. Collectively, STRs have a very high mutation rate, contributing approximately the same number of de novo mutations per generation as single nucleotide variants (SNVs), indels, and structural variants (SVs) combined <sup>\[1]</sup>. During the last 30 years, approximately 60 STR loci have been identified as causal for monogenic diseases. In most cases, these loci cause disease only if they expand beyond a certain pathogenic threshold. For example, the CAG STR in the *HTT* gene causes [Huntington Disease](https://omim.org/entry/143100?search=Huntington%20Disease&highlight=disease%20huntington) when it expands beyond 40 repeats. Some of the disease-associated STR loci also have an intermediate range below the pathogenic threshold that is associated with milder disease or reduced penetrance. For example, the intermediate range for *HTT* is between 36 and 40 CAG repeats. For some disease-associated loci such as *RFC1* and *DAB1*, individuals may differ not only in the number of repeats, but also in the motif(s) that are present at the locus. Additionally, only a subset of these motifs may be disease-causing. For example, most individuals have AAAAG repeats within the *RFC1* locus at [chr4:39348425-39348479](https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr4%3A39348425%2D39348479&hgsid=1179869963_NhDZlzqODCQBWm5vvpmhXBdovC3N). However, some individuals have AAGGG repeats instead. Biallelic expansions of the AAGGG motif cause [CANVAS](https://www.omim.org/entry/614575), while expansions of the AAAAG motif do not cause disease.

<font size="-1">1. [[Steely 2021](https://www.biorxiv.org/content/10.1101/2021.11.22.469627v1.full)] estimates 85 de novo changes in repeat length at STR loci per generation. [[Trost 2021](https://academic.oup.com/hmg/article/30/R2/R174/6325570)] reviews de novo mutation rate estimates for other variant classes.</font>

### Disease-Associated Loci

We collected and curated known pathogenic loci from sources such as [[Depienne 2021](https://pubmed.ncbi.nlm.nih.gov/33811808/)], [STRipy](https://stripy.org/database), [OMIM](https://www.omim.org/), and [GeneReviews](https://www.ncbi.nlm.nih.gov/books/NBK1116/). This yielded a catalog of 59 unique loci with the following characteristics:

<figure>
   <figcaption>STR Loci Inheritance Modes</figcaption>
   <img alt="STR Loci Inheritance Modes" src="/news/preview/56/images/2022/01/str_inheritance_mode_pie_chart.png" height=280/>
</figure>

<figure>
   <figcaption>STR Loci Genomic Regions</figcaption>
   <img alt="STR Loci Genomic Regions" src="/news/preview/56/images/2022/01/str_genomic_region_pie_chart.png" height=300 />
</figure>

<figure>
   <figcaption>STR Loci Motif Sizes</figcaption>
   <img alt="STR Loci Motif Sizes" src="/news/preview/56/images/2022/01/str_motif_length_histogram.png" width=480 />
</figure>

### Technical Details

To genotype the 59 STR loci with disease associations, we chose to use ExpansionHunter [[Dolzhenko 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5668946/)] because 1) we found that it had the best accuracy among existing tools for detecting expansions at disease-associated loci across a wide range of repeat sizes - both shorter and longer than read length, and 2) it’s now widely used for STR research and diagnosis in rare disease cohorts, including in [[Ibanez 2020](https://www.biorxiv.org/content/10.1101/2020.11.06.371716v1)], [[Stranneheim 2021](https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-021-00855-5)], [[van der Sanden 2021](https://pubmed.ncbi.nlm.nih.gov/33846582/)].

In order to run ExpansionHunter on these 59 loci, we generated an ExpansionHunter [variant catalog](https://github.com/broadinstitute/str-analysis/tree/main/str_analysis/variant_catalogs) that specifies the reference coordinates and motif of each locus.

We then ran an [I/O-optimized version](https://github.com/bw2/ExpansionHunter/tree/master/bin) of [ExpansionHunter v5](https://github.com/Illumina/ExpansionHunter) on the 19,241 gnomAD v3.1 samples for which the raw read data files were still available. We also ran [REViewer](https://github.com/Illumina/REViewer) to generate read visualizations for all samples at all 59 loci. Finally, we used python scripts in the [STR-analysis repo](https://github.com/broadinstitute/str-analysis) to aggregate results and generate the STR data file available for download.

ExpansionHunter gives users the option to specify off-target regions which allow it to more accurately estimate large expansion sizes beyond fragment length (> ~350bp). However, off-target regions also increase the chance that ExpansionHunter will overestimate some genotypes. For more information about off-target regions, see [[Dolzhenko 2017](https://pubmed.ncbi.nlm.nih.gov/28887402/)] and [[Mousavi 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6735967/)]. In our experience with STR genotyping in rare disease cohorts, we have found that it is best to first run ExpansionHunter without off-target regions, even for loci such as *DMPK* or *C9orf72* where we see very large expansions. Although this produces underestimated genotypes in some highly-expanded samples, these genotypes still turn out to be outliers relative to other individuals in the cohort, and can therefore be flagged and re-genotyped later using off-target regions. After considering the trade-offs, we chose to display only the results generated without using off-target regions. However, we provide results from running ExpansionHunter both with and without off-target regions in the downloadable data file [**TODO link**]. Additionally, we share two sets of [variant catalogs](https://github.com/broadinstitute/str-analysis/tree/main/str_analysis/variant_catalogs) - both with and without off-target regions [**TODO link**].

The dataset includes 12,372 (64%) PCR-free samples, 2,423 (13%) PCR-plus samples and 4,446 (23%) samples with unknown PCR protocol. The per-sample PCR protocol information is displayed in the **Read Data** section of the STR pages and is also included in the STR data file available for download [**TODO link**].

### Loci with Non-Reference Pathogenic Motifs

Nine out of the 59 STR loci are unusual in that they vary among individuals not just in the allele sizes, but also in the motifs present at the locus. These have been termed “replaced/nested” loci by [[Halman 2021](https://www.biorxiv.org/content/10.1101/2021.06.13.448220v1)]. Existing STR genotyping tools such as ExpansionHunter and GangSTR require users to pre-specify the motif, and so do not work well for loci where the motif can vary. Other tools such as [ExpansionHunterDenovo](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-020-02017-z) do not have this limitation, but are not sufficiently sensitive to distinguish samples with two different motifs from samples with a single motif on both alleles. For example, for the RFC1 locus, they would not be able to distinguish a sample that has a homozygous expansion of the *AAGGG* motif from a sample that instead has a short *AAAAG* allele and a long *AAGGG* allele - a difference that is important for distinguishing carriers from affected individuals. 
As a temporary solution, we addressed these limitations by developing  [call_non_ref_pathogenic_motifs.py](https://github.com/broadinstitute/str-analysis/blob/main/str_analysis/call_non_ref_pathogenic_motifs.py). This script  first detects the one or two motifs present at each of these loci in a given individual and then runs ExpansionHunter for each motif to estimate its allele size. The approach used by this script is, coincidentally, a simpler version of the approach used by the recently-released [STRling](https://www.biorxiv.org/content/10.1101/2021.11.18.469113v1) tool. Unbiased comparisons are difficult given the small number of positive controls and the fact that we designed the script based on the positive controls we had available. However, we found that the script had slightly better sensitivity than STRling on positive *RFC1* controls while maintaining high specificity. A more detailed description of the script is available on [github](https://github.com/broadinstitute/str-analysis) and in a separate blog post [**TODO link**].

### Read Visualizations

We used the [REViewer tool](https://www.illumina.com/science/genomics-research/articles/reviewer-alignments-short-reads-long-repeat.html) to generate read visualizations for all individuals at each locus. These images show the reads that ExpansionHunter considered when determining a genotype, and are primarily useful for identifying likely over-estimated genotypes and, to a lesser degree, under-estimated genotypes. We have included a section below -  **“Supplemental Details for Examining Read Visualizations”** - that describes how to interpret these images.

### Navigating STR Pages in the gnomAD Browser

The [STR table](http://34.120.124.6/short-tandem-repeats?dataset=gnomad_r3) [**TODO update link**] is the best place to start for exploring the STR data. It contains the list of 59 disease-associated loci, their repeat motif, genomic region, inheritance mode, and disease association(s).

<img alt="PABPN1 Page Top Section Screenshot" src="/news/preview/56/images/2022/01/str_list_page_screenshot.png" />

As an example, we can look at the *PABPN1* locus ([chr14:23321473-23321490](https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr14%3A23321473%2D23321490&hgsid=1256012389_xPVkREAQbc4QH9gHhkBErs2IwRwC)), which causes autosomal dominant [oculopharyngeal muscular dystrophy (OPMD)](https://www.omim.org/entry/164300) when the number of GCG repeats expands to 7 or more on one allele. It should be noted that immediately to the right of the main GCG repeat sequence are 3 GCA repeats followed by a GCG. As GCA and GCG both code for alanine, early publications include these adjacent repeats in their definition of the locus, and therefore place the pathogenic threshold at  ≥ 11 repeats. Recent reviews such as [[Depienne 2021](https://pubmed.ncbi.nlm.nih.gov/33811808/)] also use this definition. On the other hand, for technical reasons involving better ExpansionHunter accuracy on pure vs. non-pure repeats, we and [others](https://stripy.org/database/PABPN1) include only the 6 pure GCG repeats in our definition of the locus, and therefore define the pathogenic threshold as ≥ 7 repeats.

To see the *PABPN1* STR page, we can scroll down in the table and click on “PABPN1”. Another option is to search the gnomAD browser for “PABPN1” and click on this note at the top of the *PABPN1* gene page:

<img alt="STR page link example" src="/news/preview/56/images/2022/01/str_gene_page_PABPN1_link_screenshot.png" width=380 />

The STR page shows reference information about the locus and the associated disease, followed by the Allele Size Distribution. This histogram summarizes the numbers of GCG repeats found in gnomAD individuals. The y-axis represents alleles, so each individual contributes 2 counts to the distribution, except for STR loci on the X chromosome where male genotypes are hemizygous and thus contribute only 1 count.

<img alt="PABPN1 Page Top Section Screenshot" src="/news/preview/56/images/2022/01/str_PABPN1_page_top_section_screenshot.png" />

<img alt="PABPN1 Allele Size Distribution Screenshot #1" src="/news/preview/56/images/2022/01/str_PABPN1_page_allele_size_distribution_screenshot1.png" />

This distribution for the *PABPN1* locus appears to show that all alleles are in the Normal range: ≤ 6 repeats. However, we can switch the scale from “Linear” to “Log” using the drop-down in the bottom right. This allows us to see the long tail of alleles with 7 or more repeats:

<img alt="PABPN1 Allele Size Distribution Screenshot #2" src="/news/preview/56/images/2022/01/str_PABPN1_page_allele_size_distribution_screenshot2.png" />

The normal and pathogenic ranges are indicated by horizontal arrows at the top of the plot, as well as by dashed vertical lines at the thresholds. It should be noted that compared with larger expansions, OPMD caused by 7 repeats has been shown to present with reduced  penetrance, later onset, or milder disease unless identified in homozygosity [[Richard 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5272966/)]. Because the **Allele Size Distribution** counts each allele independently, it does not tell us diplotypes (e.g., how many individuals have a 6/7 compound heterozygous genotype vs a 7/7 homozygous genotype). However, if we scroll down to the **Genotype Distribution** and look at bin x=7, y=6, we see that it’s darker than the bin at x=7, y=7, which means more individuals have the 6/7 genotype. If we mouse over the bins, we can see the exact counts: 67 individuals have a 6/7 genotype and 1 individual has a 7/7 genotype.

<img alt="PABPN1 Genotype Distribution Screenshot" src="/news/preview/56/images/2022/01/str_PABPN1_page_genotype_distribution_screenshot.png" />

Given that the prevalence of OMPD in the general population is estimated at 1 in 100,000, we expect to see fewer than 2 individuals in the pathogenic range, especially since the gnomAD dataset attempts to exclude cases with rare disease.

However, the typical age of onset for OPMD is 40 to 60 years old, so genotype positive individuals are less likely to be affected when recruited and therefore less likely to be excluded from gnomAD. If we scroll down to the **Age Distribution**, we see a plot where the y-axis represents age bins.

<img alt="PABPN1 Age Distribution Screenshot" src="/news/preview/56/images/2022/01/str_PABPN1_page_age_distribution_screenshot.png" />

Mousing over the bins such as the one in the top-right shows several individuals of age 60-65yo, including the individual with 38 repeats, a genotype less likely to be present in the general population. However, one can evaluate the quality of the genotype data through read visualization.

To evaluate this, we can scroll down to the **Read Data** section and click the “Show read data” button. This displays the read visualization images - starting with the sample that has the longest expansion:

<img alt="PABPN1 Read Data Section Screenshot" src="/news/preview/56/images/2022/01/str_PABPN1_page_read_data_section_screenshot1.png" />

Users can click “Next Sample” and “Previous Sample” buttons to see more images generated by the [REViewer tool](https://www.illumina.com/science/genomics-research/articles/reviewer-alignments-short-reads-long-repeat.html) for all individuals at this locus in order of expansion size. Another option is to first use the “Min repeats” or “Max repeats” filters and the Population and Sex filters to select individuals of interest. Above each image, users can see the population, sex, and age (if available) of the individual along with the ExpansionHunter genotype and confidence intervals for allele 1 and allele 2. Because some of the images are wider than the screen, users can scroll the image horizontally or right-click and select “Open Image in New Tab” to see the full image.

Looking at the reads supporting the pathogenic *PABPN1* genotypes we see that the first image is from the individual with the 6/38 genotype. It has two sections: the top section shows reads that support the short allele, and the bottom section shows reads that support the long allele. Here we see multiple deletions in both the repeat sequence (orange) and flanking regions (blue):

<img alt="PABPN1 Readviz Example #1" src="/news/preview/56/images/2022/01/str_PABPN1_page_read_data_full_svg_image_example.svg" />

This suggests that most or all reads supporting the long allele are misaligned, and that the genotype is very likely to be incorrect (see **Supplemental Details** for more information).

Clicking the “Next Sample” button, we see subsequent samples also have questionable alignments underlying their long allele sizes. In some cases, the reads are full of mismatches rather than deletions, but the conclusion is the same. By reviewing these images, we find that all alleles > 9 repeats are likely to be technical artifacts. Only when we reach the 6/9 genotypes do we find several well supported 9-repeat alleles with multiple spanning read alignments that lack mismatches or indels:

<img alt="PABPN1 Readviz Example #2" src="/news/preview/56/images/2022/01/str_PABPN1_page_read_data_full_svg_image_example2.svg" />

The age of one of these 6/9 individuals is 25-30 years old. However, there is also a high quality 6/8 genotype in a European individual with age 60-65.

In summary, these read visualizations suggest that many pathogenic-range PABPN1 alleles with lengths beyond 7 repeats are technical artifacts as well as highlight some challenges in interpreting STR calls and the importance of validation.

### Discussion

Tools to automatically filter ExpansionHunter genotypes are needed, and are an active research area. Additionally, a full understanding of pathogenic thresholds and disease penetrance at different repeat sizes and in different populations is still lacking for most loci.

Although we have collected normal and pathogenic thresholds from different reference sources and provide them in the browser, these thresholds should be treated as approximate. Even for loci with long-established disease associations, it can be difficult to draw exact lines separating normal, intermediate, and pathogenic genotypes due to the variability in disease phenotypes across individuals and populations, and ambiguity in STR locus boundaries.

Overall, we expect pathogenic thresholds and other reference information to continue to undergo revisions as STR research continues.

We hope that this release of the STR callset browser and data files will contribute to the study of STR variation and assist with using WGS for the diagnosis of STR disorders. We encourage users to write to [gnomad@broadinstitute.org](gnomad@broadinstitute.org) with any questions or comments.

### Acknowledgments

We thank Nehir Kurtas and Stephanie DiTroia for helping to curate the list of disease-associated STR loci and reviewing the literature on pathogenic alleles; Katherine Chao for suggestions and code reviews; Egor Dolzhenko for consultations on ExpansionHunter, REViewer, and other topics; Depienne et al. and Halman et al. authors for publishing these very useful resources; Yossi Farjoun for mentorship during the initial stages of the project; Jackie Goldstein, Daniel King, Cotton Seed and the rest of the Hail team for building Hail Batch and other tools that simplified the process of generating this dataset.

### Supplemental Details for Examining Read Visualizations

Below we describe visual features of [REViewer](https://www.illumina.com/science/genomics-research/articles/reviewer-alignments-short-reads-long-repeat.html) images and show how these can be used to identify overestimated or underestimated genotypes:  

 ▪ Deletion(s) within a read are shown as gaps: <span><img  src="/news/preview/56/images/2022/01/str_supplementary_section_inline_image1_deletions.png" width=115 /></span>.
  Multiple deletions within a read may indicate an erroneous alignment and raise the chances of this being an overestimated expansion size. For example, the true genotype here is 51 x CGG rather than 64 x CGG, and multiple deletions in reads that are located entirely within the repeat sequence (along with the G mismatches in their left halves) suggest that these reads are misaligned [[full image](https://broadinstitute.github.io/StrPileups/page_GE_case623.html)]:

<span><img alt="Readviz Example: Deletions" src="/news/preview/56/images/2022/01/str_supplementary_section_full_image1_deletions.png" /></span>

▪ Insertion(s) within a read are shown as vertical black bars (analogous to the purple bar in IGV): <span><img  src="/news/preview/56/images/2022/01/str_supplementary_section_inline_image2_insertions.png" width=95 /></span>.  When many reads contain insertions beyond the already plotted sequence, this raises the chances that the expansion size has been underestimated. For example, the true genotype below is 42 x GCA instead of 40 x CAG. All three spanning reads hint at this, due to insertions between their repetitive (orange) and right flanking (blue) regions - annotated with a red circle [[full image](https://broadinstitute.github.io/StrPileups/page_GE_case25.html)]:

  <span><img alt="Readviz Example: Insertions" src="/news/preview/56/images/2022/01/str_supplementary_section_full_image2_insertions.png" /></span>

▪ When all except one or two reads support a shorter genotype, there’s an increased chance the expansion size is overestimated. For example, the true genotype here is 22/22 x CAG instead of 22/42 [[full image](https://broadinstitute.github.io/StrPileups/page_GE_case253.html)]. The single read supporting a 42 repeat genotype is annotated with a red circle below:

  <span><img alt="Readviz Example: Only one supporting read" src="/news/preview/56/images/2022/01/str_supplementary_section_full_image3_only_one_supporting_read.png" /></span>

▪ The darker-color and lighter-color shading of reads in the example above distinguishes  reads that only support one of the two allele sizes (dark color) vs reads that equally support both allele sizes (light color). In the example above, the reads with shorter repetitive regions are consistent with either the 22 repeat allele, or the 42 repeats, further highlighting that the long allele size estimate rests on evidence from only one read.

▪ Mismatches with the reference (eg. SNVs) appear as letters within reads: <span><img  src="/news/preview/56/images/2022/01/str_supplementary_section_inline_image3_mismatches.png" width=70 /></span>. These are useful for exploring STR interruptions and as additional indicators of the true expansion size. In the previous example, lining up the “T” interruptions in the left-flanking reads with the “T” interruptions in the right-flanking reads suggests the correct 22 x CAG genotype instead of 42 x CAG.

▪ Soft-clipped bases appear at the beginning or end of a read and represent bases that the aligner considered to be unaligned. They appear as a string of mismatches at the end of a read (like in IGV): <span><img  src="/news/preview/56/images/2022/01/str_supplementary_section_inline_image4_soft_clips.png" width=125 /></span>. As with deletions, the presence of soft-clipped bases may indicate poor quality alignments and therefore point to an overestimated expansion size. However, in some cases they may suggest an underestimate instead. For example, the three reads showing additional CAGs in their soft-clipped bases below hint that the true genotype may be longer than 47 x CAG. Indeed, PCR confirmed the true genotype to be 54 x CAG in this sample [[full image](https://broadinstitute.github.io/StrPileups/page_GE_case80.html)]:

  <span><img alt="Readviz Example: Soft Clips" src="/news/preview/56/images/2022/01/str_supplementary_section_full_image4_soft_clips.png" /></span>