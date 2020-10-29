---
title: 'gnomAD v3.1 New Content, Methods, Annotations, and Data Availability'
date: '2020-10-29'
categories:
  - Announcements
  - Releases
authors:
  - Grace Tiao
  - Julia Goodrich
---
We’re proud to announce the gnomAD v3.1 release of 759,302,267 short nuclear variants (644,267,978 passing variant quality filters) observed in 76,156 genome samples.

In this release, we added several new cohorts with substantial genetic diversity, including 780 samples from several dozen populations collected as part of the Human Genome Diversity Project; 246 samples of Japanese ancestry; and 2,435 samples from the 1000 Genomes Project. (Note that samples from the 1000 Genomes Project previously included in gnomAD were exomes only.)

This is the first release for which we have a designated population label for samples of Middle Eastern ancestry, and we are thrilled to be able to include these in the following population breakdown for the v3.1 release:

| Population | Description                     | Genomes |
| ---------- | ------------------------------- | ------- |
| afr        | African/African-American        | 20,744  |
| ami        | Amish                           | 456     |
| amr        | Latino/Admixed American         | 7,647   |
| asj        | Ashkenazi Jewish                | 1,736   |
| eas        | East Asian                      | 2,604   |
| fin        | Finnish                         | 5,316   |
| nfe        | Non-Finnish European            | 34,029  |
| mid        | Middle Eastern                  | 158     |
| sas        | South Asian                     | 2,419   |
| oth        | Other (population not assigned) | 1,047   |

### Topics

The changes and new features in this release include:

* Innovation in incremental joint calling
* Documentation of functions and code used to generate the callset
* Individual-level genotypes available for HGDP + 1KG subsets
* Read visualizations in noncoding regions
* New subset availability for frequency annotations
* New in-silico prediction annotations
* Tweaks and updates to VEP, dbSNP rsIDs, homozygous genotypes in common variants, and terminology for individuals’ chromosomal sex
* Fully free access to downloadable datasets on multiple cloud providers

We’ll discuss each of these features in greater detail in the sections below and, at the end, we’ll share updated plots for v3.1 sample and variant QC.

### Incremental joint-calling

To create gnomAD v3, the first version of this genome release, we took advantage of a new sparse (but lossless) data format developed by Chris Vittal and Cotton Seed on the Hail team to store individual genotypes in a fraction of the space required by traditional VCFs. In a previous blog [post](https://gnomad.broadinstitute.org/blog/2019-10-gnomad-v3-0/) describing this innovation, we noted that one advantage of this new format was the possibility of appending new data to existing callsets without needing to re-process samples already joint called as part of prior gnomAD releases—effectively solving the “N+1” joint calling problem.

For gnomAD v3.1, we made good on this promise, adding 4,598 new genomes in gVCF form to the already extant, joint-called gnomAD v3 callset stored in the sparse Hail Matrix Table format. This is, to our knowledge, the first time that this procedure has been done. Chris Vittal added the new genomes for us in six hours—shaving off almost a week of compute time (or several million core hours) that would have been required if we had created the callset from scratch.

The total cost of the addition was about $400, or \~$0.09 per new sample and \~$0.004 per existing sample. By contrast, creating the callset from scratch would have cost ~$13,000.

### The gnomAD Python package

Over the last year, we’ve collectively poured thousands of hours into curating and fully [documenting](https://broadinstitute.github.io/gnomad_methods/api_reference/) a public code repository with Python functions we repeatedly use to produce large callsets, including but not limited to gnomAD. The gnomAD v3.1 [production pipeline](https://github.com/broadinstitute/gnomad_qc) drew heavily on this resource, and we hope that others will benefit from it as well.

The package includes functions to help users handle sparse Matrix Tables, annotate variants with VEP, lift over sites from GRCh37 to GRCh38 (or vice versa), infer ancestry and cryptic relatedness within a callset, infer chromosomal sex, train and evaluate random forests variant filtering models, interact with linkage disequilibrium Block Matrices, export data to standard VCF format, and much more.

Users can access the entire repository with a simple command:

`$ pip install gnomad`

### The gnomAD HGDP and 1000 Genomes callset

We’re delighted to provide, for the first time, [downloads](https://gnomad.broadinstitute.org/downloads) with individual-level genotypes for a subset of gnomAD that is available to the public with no access restrictions. We hope this resource will be useful for a broad range of research applications — serving as a diverse reference panel for haplotype phasing and genotype imputation, for example, or as a training set for ancestry inference.

The samples included in this subset are drawn from the [1000 Genomes Project](https://www.nature.com/articles/nature15393) and the [Human Genome Diversity Project](https://science.sciencemag.org/content/367/6484/eaay5012), which contain some of the most genetically diverse populations present in gnomAD. Collectively they represent human genetic diversity sampled across >60 distinct populations from Africa, Europe, the Middle East, South and Central Asia, East Asia, Oceania, and the Americas.

To create this callset, we re-processed raw data from the 1000 Genomes Project and HGDP to meet the [functional equivalence](https://www.nature.com/articles/s41467-018-06159-4) standard and joint-called the re-processed data with the rest of the gnomAD callset. (See “Incremental joint calling” above for more details on the joint-calling process.) The callset contains all high-quality samples (n=3942) from these projects that passed gnomAD sample QC filters. These files therefore contain data for individuals (n=662) that we did not ultimately include in the gnomAD v3.1 aggregate allele frequencies, as these individuals were found to be second-degree related (or closer) to other individuals in the larger gnomAD callset. We have provided a sample metadata table containing each sample’s status of inclusion or exclusion in the v3.1 release, along with sample-level quality control metrics and ancestry labels to accompany the VCF. (This information is directly annotated as column annotations in the Matrix Table version of the callset.)

All variants found in this cohort of samples are included, along with the variant filter status, metrics used to assess variant quality, and gnomAD v3.1 allele frequencies.

All called genotypes are included in this dataset, including low-quality genotypes that we filtered before computing gnomAD allele counts, allele numbers, and allele frequencies. To reproduce gnomAD genotype filtering, users should filter to genotypes with genotype quality (GQ) >= 20, depth (DP) >=10 (5 for haploid genotypes on sex chromosomes), and allele balance (AB) >= 0.2 and <= 0.8 (for heterozygous genotypes only).

### Read visualizations for non-coding regions

Since our beginning as a project, we’ve made read data visualizations available for representative genotypes for most of the variants we observe in gnomAD exome data. Generating read visualizations for v3.1 whole genome data, however, has been considerably more challenging, as 99% of the genome is non-coding: there’s a lot more genomic territory to cover in whole-genome data.

Consider the following numbers: to support non-coding read visualizations in this release, we generated over 2.5 billion read visualizations representing nearly 600 million unique variants observed in gnomAD v3.1. To be exact, we collected reads for 2,573,960,015 non-reference genotypes observed across 584,562,724 unique variants.

We needed a creative approach to generate, store, and serve up this data efficiently on the browser. Ben Weisburd on our team conceived a process that allowed us to extract reads for multiple variants from each individual sample, thus producing an individual mini-BAM — a file containing all the sequencing reads aligning to a specified list of variants in a given individual — for each available sample in gnomAD. (Not all samples in gnomAD had available read data, which is why some variants in v3.1 are missing read visualizations.)

He then combined these individual mini-BAMs into composite, multi-sample mini-BAMs comprised of data from 50 individuals each; replaced the original read group tags with hashes to anonymize the combined data; and recorded which genotypes and loci were covered in each 50-sample composite file. (Read group tags were replaced as a precaution against re-identification of individuals included in each multi-sample mini-BAM: read group tags, which are assigned to a given sequencing run, might otherwise be used to re-link genotypes across the genome for a specific individual. After replacing tags with hashes, the genotype data stored in a composite mini-BAM is completely unlinked to individuals.)

The browser queries a database that contains an index of genotype hashes, loci, and composite filepaths: each time you pull up a variant page with available read visualizations, the browser queries this database to discover which composite file to load into IGV and which unique read group hash to use to extract the reads specific to the genotype you’re viewing.

With this carefully engineered system in place, we’re excited to make read data visualizations for non-coding variants available for the very first time.

### Subsets

By popular request, we’ve computed allele counts and allele frequencies for major subsets of gnomAD v3.1, as follows:

* Non-v2: only genome samples that are new to the v3 or v3.1 release and not included in the v2 genomes
* Non-TOPMed: only samples that are not present in the Trans-Omics for Precision Medicine (TOPMed)/BRAVO release. The allele counts in this subset can thus be added to those of BRAVO to enable federated use of both datasets
* Non-cancer: only samples from individuals who were not ascertained for having cancer in a cancer study
* Controls and biobanks: only samples collected specifically as controls for disease studies, or samples belonging to biobanks (e.g. BioMe, Genizon) or general population studies (e.g., 1000 Genomes, HGDP, PAGE)
* Non-neuro: only samples that were not collected as part of a neurologic or psychiatric case/control study, or samples collected as part of a neurologic or psychiatric case/control study but designated as controls

Subset-specific allele counts and allele frequencies are available on variant pages by clicking on the drop-down menu at the top-right corner of the page:

![](https://storage.googleapis.com/gnomad-blog-assets/2020/10/drop_down_subsets_v3_1.png)

Viewers will note that in addition to the gnomAD population frequencies, population frequencies specific to the HGDP and 1000 Genomes cohorts are available:

![](https://storage.googleapis.com/gnomad-blog-assets/2020/10/1kg_table.png)

We provided allele counts and population frequencies for HGDP and 1000 Genomes to allow users to observe and compare the distribution of variant alleles across a diverse range of distinct human populations.

### In-silico prediction annotations

We have added a number of variant annotations to help users interpret the clinical and functional effects of variants without needing to navigate to other websites and databases:

* [REVEL](https://sites.google.com/site/revelgenomics/), an ensemble score for predicting the pathogenicity of missense variants (based on 13 other variant predictors)
* [CADD](https://cadd.gs.washington.edu/) v1.6, a score predicting deleteriousness for both SNVs and indels
* [SpliceAI](https://github.com/Illumina/SpliceAI), an deep learning predictor for variant effects on splicing
* [PrimateAI](https://github.com/Illumina/PrimateAI), a deep neural network-trained score for classifying pathogenicity of missense mutations

We would particularly like to thank Kishore Jaganathan and Kyle Farh at Illumina for their material assistance in generating SpliceAI annotations for v3.1 variants.

### Tweaks and updates

This latest release uses an updated version ([v101](https://uswest.ensembl.org/info/docs/tools/vep/script/vep_download.html#new)) of the Variant Effect Predictor (VEP) based on the most recent Gencode [v35](https://www.gencodegenes.org/human/release_35.html) gene models to provide consequence annotations. We have also updated the dbSNP release ([b154](https://ncbiinsights.ncbi.nlm.nih.gov/2020/06/11/dbsnp-human-build-154-release-alfa-data/#:~:text=dbSNP%20human%20build%20154,%20now,Reference%20SNP%20(rs)%20records.)) we use to annotate reference SNP identification (rsID) numbers. Users have alerted us to occasional rsID annotation errors in previous releases, which were caused by our pipeline matching rsIDs by chromosomal locus only. We now annotate rsIDs using both locus and allele information, which should reduce errors and ambiguities in annotation.

Another error mode identified in our previous releases is a technical artifact wherein homozygous alternate genotypes (particularly at long indel sites) were called as heterozygous genotypes despite having very high allele balances characteristic of homozygous alternate genotypes. This problem, described in greater detail [here](https://www.biorxiv.org/content/10.1101/784157v1.full.pdf), is caused by sample contamination, which can introduce stray reads supporting a reference allele at a site where the majority of reads contain an alternate allele. The genotype likelihood model used by our variant caller (GATK HaplotypeCaller) did not handle this condition properly.

The issue is now fixed for new gVCFs generated by HaplotypeCaller moving forward. However, for this release, the majority of variant calls were already generated using an uncorrected version of HaplotypeCaller. We therefore made an adjustment to heterozygous genotypes with highly skewed allele balance (>0.9) at common variant sites (>0.01 AF), setting these genotypes to homozygous alternate genotypes. This change is reflected in the aggregate allele frequencies, allele numbers, and allele counts displayed on the browser as well as in the genotype data released for the gnomAD HGDP and 1000 Genomes callset.

Finally, we have changed the labels we use to classify individuals by chromosomal sex from “male” and “female” to “XY” and “XX,” respectively. While we have always used the terms “male” and “female” to refer to an individual’s chromosomal sex and not to gender, we recognize that this terminology is overloaded and could cause confusion to users. We also note that the terms “male” and “female,” when referring to chromosomal sex, can be applied to individuals with sex chromosomal aneuploidies, such as 47,XYY or 45,X. Since we remove samples with sex chromosomal aneuploidies from gnomAD during the QC process, we felt the most straightforward sex classification labels were “XX” and “XY.” This change is now reflected in both the v3.1 download files and in the browser.

### Free data access on multiple cloud providers

One recent development we’re excited to share with users is the availability of all gnomAD data on three cloud providers: Amazon Web Services, Microsoft Azure, and Google Cloud. All VCFs and Hail Tables from each gnomAD release are now available to download or read for free from each of these providers. Working in partnership with their public data hosting programs, we hope to encourage an even wider range of individuals and institutions to make use of gnomAD data for innovative research in human genetics and for the development of translational tools and medicines to treat and cure disease. For more details on how to access gnomAD through these cloud providers, read our blog post [here](https://gnomad.broadinstitute.org/blog/2020-10-open-access-to-gnomad-data-on-multiple-cloud-providers/).