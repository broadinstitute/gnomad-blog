---
title: gnomAD v3.1 Mitochondrial DNA Variants
date: '2020-11-17'
categories:
  - Announcements
  - Releases
authors:
  - Kristen Laricchia
  - Sarah E. Calvo
---
### Overview

Mitochondrial DNA (mtDNA) variants for gnomAD are now available for the first time! We have called mtDNA variants for 56,434 whole genome samples in the v3.1 release. This initial release includes population frequencies for 10,850 unique mtDNA variants defined at more than half of all mtDNA bases. The vast majority of variant calls (98%) are homoplasmic or near homoplasmic, whereas 2% are heteroplasmic. Variation in mitochondrial genomes contributes to many human diseases and has had unique value in the study of human evolutionary genetics. We hope that the addition of mtDNA to gnomAD will enable researchers to better understand the role of mtDNA variation in both health and disease states.

Previous gnomAD callsets have not included mtDNA variants because their properties do not fit the assumptions that we use with our nuclear variant calling pipeline. These properties include:

<!-- end_excerpt -->

* A circular genome: Alignment of reads from the circular mtDNA to its linear representation in the human reference assembly can cause mapping problems.
* Heteroplasmy: Cells each contain hundreds to thousands of mtDNA copies. Most variants are homoplasmic, meaning they are present in all mtDNA molecules in a cell, and represent differences between the given individual and the reference human mitochondrial genome. However, some variants are heteroplasmic, or present in only a fraction of the cell’s mtDNA molecules. A key challenge is to call heteroplasmic variants (particularly at low fractions) and to distinguish low heteroplasmy variants from technical artifacts or contamination.
* NUMTs: Nuclear sequences of mitochondrial origin (termed “NUMTs”) are derived from pieces of mtDNA that have integrated into the nuclear genome over the course of human evolution. Many NUMTs are part of the reference human genome assembly; however, polymorphic NUMTs exist that are present only in some individuals. Reads derived from NUMTs often mis-align to the mtDNA and generate false positive calls at low heteroplasmy. Conversely, reads genuinely arising from the mtDNA genome can be mis-aligned to the NUMTs in the reference genome.

To address these issues, we developed a new mtDNA calling pipeline and used it to create the gnomAD v3.1 mtDNA callset. Our mtDNA data include allele frequencies for heteroplasmic and homoplasmic variants, haplogroup-specific allele frequencies, predicted consequences for protein and tRNA variants, and links to mitochondrial resources.

### Creating the v3.1 mtDNA Call Set

#### mtDNA Calling Pipeline for Single Samples

We developed a mitochondria mode of GATK MuTect2 to call variants in GRCh38 chrM (identical to the revised Cambridge Reference Sequence, rCRS, GenBankNC_012920.1) on individual samples. This pipeline, which can be run on the [Terra platform](https://terra.bio/), addresses challenges specific to calling mtDNA variants.

* Circular genome: The mtDNA non-coding “control region” spans the artificial break in the circular genome (coordinates chrM:16024-16569 and chrM:1-576), which can make it challenging to call variants in this region. Therefore to call control region variants, we extracted all chrM reads and realigned them to a mitochondrial reference that was shifted by 8,000 bases, called variants on this shifted alignment, and then converted coordinates back to their original positions.
* Heteroplasmic variants: Unlike nuclear variants, which are called as either heterozygous or homozygous, mtDNA variants are called at all heteroplasmy levels using a specialized mitochondria mode of the GATK MuTect2 variant caller (a variant caller that was originally designed to call somatic variants in tumor samples). MuTect2 calls are then stringently filtered as described below.
* Haplogroups: mtDNA does not recombine and is inherited maternally. Closely related mtDNA sequences have historically been grouped together in “haplogroups.” There are over 5000 haplogroups from diverse populations available in the [Phylotree database](https://www.phylotree.org/). The pipeline annotates a specific haplogroup for each sample using [Haplocheck](https://github.com/genepi/haplocheck).

We would like to note that we have tested our pipeline only on WGS samples. Because many exome capture technologies specifically block mtDNA reads from being sequenced, many exomes lack sufficient mtDNA coverage to accurately call variants, particularly those with low heteroplasmy.

#### mtDNA Calling Pipeline for gnomAD Call Set

To generate the gnomAD mtDNA call set, we combined single sample VCFs and applied stringent quality control filters for samples, variants, and genotypes as described below. Specifically, we excluded samples with low or high mtDNA copies/cell or with evidence of mtDNA contamination. For this release we also filtered out variants with heteroplasmy < 10% in order to avoid false positives derived from contamination, sequencing errors, and NUMT misalignment. Subsequent releases will include variants below 10% heteroplasmy that pass additional QC filters.

*Genome Variant Calls*

The [pipeline](https://portal.firecloud.org/?return=terra#methods/mitochondria/MitochondriaPipeline/25) described above was run on individual samples using the Terra platform. Homoplasmic reference calls were assigned to non-variant sites with coverage > 100X, whereas non-variant sites with coverage <= 100X were labeled as missing data and not used for calculation of population allele frequencies.

In contrast to the notation for nuclear homozygous and heterozygous genotypes, the mtDNA VCF file denotes homoplasmic genotypes as “1/1,” indicating 95-100% alternate bases, and heteroplasmic genotypes as “0/1,” indicating < 95% alternative bases. Calls below 1% heteroplasmy were completely removed. For the initial v3.1 release, a “heteroplasmy_below_10_percent” genotype filter was applied to calls below 10% heteroplasmy.

*Sample Exclusion Criteria*

The samples included in the mtDNA callset are a subset of the samples available for the nuclear genome in gnomAD v3.1. We implemented several filters to remove low-quality samples:

* Low or high mtDNA copy number: Samples with an estimated mtDNA copy number less than 50 were removed (N=6,505 samples) since they are prone to contamination and NUMT-derived false positive calls. Mitochondrial copy number was calculated as 2*mean mitochondrial coverage/median autosomal coverage. Samples with a mitochondrial copy number greater than 500 were also removed (N=5,633 samples) because we observed that these samples are more likely to originate from cell lines, which contain higher numbers of cell culture related heteroplasmies likely due to somatic mutations and selection. DNA source information (i.e. blood, saliva, cell line) is not routinely available for samples in gnomAD.
* Mitochondrial contamination: 1,803 samples were removed if mtDNA contamination estimates exceeded 2%, based on the maximum from nuclear contamination (VerifyBamID freemix value), mtDNA haplogroup contamination (Haplocheck), or an internal algorithm to flag contamination or NUMT misalignment. This internal algorithm estimates contamination by examining haplogroup markers that should show 100% alternative alleles (i.e., are fully homoplasmic) but are observed at high heteroplasmy instead (85-99.8% alternate alleles). It is defined for each sample as one minus the mean heteroplasmy of any haplogroup-defining variants observed with heteroplasmy (85-99.8% alternate alleles) if at least 3 such variants are present; otherwise estimated contamination is defined as one minus the mean heteroplasmy of haplogroup-defining variants with heteroplasmy 85-100%.
* Access to read data: We excluded 5,781 gnomAD v3.1 samples for which we no longer had access to read data.

The pipeline for mtDNA callset assembly and annotation was implemented in [Hail](https://hail.is/index.html).

*Site-level Filters and Flags*

All alleles at certain problematic sites were filtered out or flagged.

* `artifact_prone_site` (filter): This is one of 6 specific mtDNA positions (301, 302, 310, 316, 3107, 16182) where sequence context makes it difficult to distinguish true variants from technical artifacts, and therefore all variants overlapping these sites are filtered out. The homopolymer tracts at location chrM:300-317 (AAACCCCCCCTCCCCCGC) cause Illumina sequencing errors in all samples and cause (i) a large coverage dip in this region, (ii) reads with many apparent indels near position chrM:310T, and (iii) apparent substitutions of chrM:301A>C, chrM:302A>C, chrM:310T>C, and chrM:316G>C. Similarly, homopolymer tracts at location chrM:16180-16193 (AAAACCCCCTCCCC) cause errors and apparent indels at position chrM:16182. The reference genome contains “N” at position chrM:3107, which causes misalignment of many reads.
* `indel_stack` (filter): Similar to artifact-prone sites, certain indels create a homopolymer tract that causes a drop in coverage and technical sequencing artifacts in multiple individuals. For example, an individual with an insertion at position chrM:5892 would typically show multiple alternate alleles (e.g., REF=T, ALT=TC, TCC, TCCC, TCCCCC, TCCCCC, TCCCCCCCC), which represents a multi-allelic call in this sample. Indels that are only present within multi-allelic calls across all samples in the callset are filtered out using this flag. For example, of the 182 different indel variants observed at position chrM:5892, 102 are only detected within multi-allelic calls and are filtered out as `indel_stack`, whereas alternate variants such as chrM:5892T>TC and chrM:5892T>TCC are not always in multi-allelic calls and will pass filters.
* `npg` (filter): No sample had a pass genotype for the variant.
* `common_low_heteroplasmy` (flag): This flag is present if the variant is found at an overall frequency of > 0.001 across all samples with a PASS genotype and heteroplasmy level > 0 and < 50% (includes variants < 1% heteroplasmy which are subsequently filtered). Variants that are common at low heteroplasmy are likely to be enriched for sequencing errors and NUMT misalignments; they may also represent recurrent somatic mutations.

*Genotype-level Filters*

Genotype filters are applied separately to each genotype in each sample. Only variants that pass genotype filters are displayed by default, although specialized searches (i.e., searching for the particular variants or toggling the “Filtered variants” checkbox) can allow users to view variants in which all genotypes were filtered. The number of filtered genotypes is reported in the excluded allele count (“excluded_AC”), and a histogram is available on variant pages to view the counts of specific filters across different heteroplasmy levels, but these genotypes are not used for allele count and allele frequency calculations. Low heteroplasmic calls should be treated with caution and may be enriched with artifacts, but we want to make information on these calls available to benefit the community and allow users to put their own calls in context, such as to evaluate potential shared error modes.

* `base_qual`: Median base quality of alternate allele was below minimum (using default of 20 for “min-median-base-quality” parameter)
* `heteroplasmy_below_10_percent`: Heteroplasmy level was below 10%
* `position`: Median distance of variant allele from end of reads was below minimum (using default of 1 for “[min-median-read-position](https://gatk.broadinstitute.org/hc/en-us/articles/360036715731-FilterMutectCalls#--min-median-read-position)” parameter)
* `strand_bias`: Evidence for alternate allele comes from one read direction only
* `weak_evidence`: Mutation does not meet likelihood threshold
* `contamination`: Fails MuTect2 contamination filter based on Haplocheck (does not take into account the freemix value or our internal algorithm for calculating contamination)

*Variant Annotations*

To make the mtDNA data more usable, we provide multiple variant annotations on the website and in the downloadable callset. Some of these are listed below.

* We do not calculate an overall allele count and allele frequency. Instead, separate allele counts and frequencies are provided for both homoplasmic and heteroplasmic variants as well as for each top-level haplogroup. For example, the “AF_hom” annotation provides the overall allele frequency taking into account only variants that were called homoplasmic in samples with that variant (heteroplasmy 95-100%).
* We annotate variants that PhyloTree Build 17 defines as homoplasmic within at least one haplogroup with the flag, “hap\_defining\_variant.”
* In-silico prediction annotations for tRNA variants were obtained from [PON-mt-tRNA](http://structure.bmc.lu.se/PON-mt-tRNA/), [MITOMAP](https://www.mitomap.org/MITOMAP), and [HmtVar](https://www.hmtvar.uniba.it/).
* VEP annotations are provided using the VEP annotation pipeline for nuclear variants with the following modification: the VEP distance parameter was set to 0 to avoid “upstream” and “downstream” annotations.
* We edited some annotations generated by LOFTEE since the assumptions for the nuclear genome do not apply to the mtDNA: (i) the “SINGLE\_EXON” flag was removed, as all mtDNA transcripts are single exon; (ii) “LC” (low confidence) loss-of-function variants due to “END\_TRUNC” were edited to “HC” (high confidence), again because all mtDNA transcripts are short, single exon genes not subject to nonsense mediated decay; and (iii) the “END\_TRUNC” filter was removed. All other annotations with LOFTEE remain unchanged, and caution should be taken to interpret the annotations in the context of the mitochondrial genome.

Downloads for mtDNA variants are provided separately from the nuclear variants.

### Authors

Kristen Laricchia, Nicole Lake, Nick Watts, Megan Shand, Andrea Haessly, Laura Gauthier, David Benjamin, Eric Banks, Jose Soto, James Emery, Grace Tiao, Daniel MacArthur, Monkol Lek, Vamsi K. Mootha, Sarah E. Calvo

### Author Contributions

This project was a major collaborative effort. Kristen Laricchia was the lead analyst. Sarah Calvo provided leadership, expert knowledge, and detailed examination of the data. Nicole Lake conducted analyses to aid in quality control. David Benjamin developed the mitochondria mode of MuTect2. Megan Shand and Andrea Haessly developed the mitochondrial pipeline and WDL with guidance from Laura Gauthier and Eric Banks and assistance from Jose Soto and James Emery. Nick Watts adapted the gnomAD browser to incorporate mitochondria-specific annotations. Grace Tiao provided oversight of the collaboration. Daniel MacArthur, Monkol Lek, and Vamsi Mootha provided leadership and analytical advice.

### Acknowledgments

We thank Heidi Rhem and Mark Daly for gnomAD leadership; Sebastian Schoenherr for assistance in understanding Haplocheck; Konrad Karczewski for reviewing the code for callset assembly and annotation; Kiran Garimella for assistance in understanding NUMTs with long-read data; David Thorburn, John Christodoulou, and members of their labs for their feedback on displaying mtDNA variants on the browser. This work was supported in part by a Broad Institute Scientific Projects to Accelerate Research and Collaboration (SPARC) grant.