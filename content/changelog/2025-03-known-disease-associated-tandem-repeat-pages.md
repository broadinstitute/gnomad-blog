---
title: Update known disease-associated tandem repeat (TR) pages
date: 2025-03-20
order: 1
---

We have updated the [gnomAD TR pages](https://gnomad.broadinstitute.org/short-tandem-repeats?dataset=gnomad_r4). Changes include: 
- Adding 9 recently discovered disease-associated TR loci  
- Introducing a "Color by" feature to the allele size histograms which allows users to see basic genotype quality scores derived from either manual review of read visualizations or from ExpansionHunter confidence intervals
- Removing all PCR-plus samples and samples with 100bp reads

<!-- end_excerpt -->


**Loci**

We added these 9 recently discovered disease-associated TR loci:  
[RILPL1](https://gnomad.broadinstitute.org/short-tandem-repeat/RILPL1?dataset=gnomad_r4), 
[THAP11](https://gnomad.broadinstitute.org/short-tandem-repeat/THAP11?dataset=gnomad_r4), 
[ZFHX3](https://gnomad.broadinstitute.org/short-tandem-repeat/ZFHX3?dataset=gnomad_r4),
[FGF14](https://gnomad.broadinstitute.org/short-tandem-repeat/FGF14?dataset=gnomad_r4), 
[ABCD3](https://gnomad.broadinstitute.org/short-tandem-repeat/ABCD3?dataset=gnomad_r4), 
[NAXE](https://gnomad.broadinstitute.org/short-tandem-repeat/NAXE?dataset=gnomad_r4), 
[PRE-MIR7-2](https://gnomad.broadinstitute.org/short-tandem-repeat/PRE-MIR7-2?dataset=gnomad_r4), 
[FAM193B](https://gnomad.broadinstitute.org/short-tandem-repeat/FAM193B?dataset=gnomad_r4), 
and [EP400](https://gnomad.broadinstitute.org/short-tandem-repeat/EP400?dataset=gnomad_r4).

We also added 9 other TR loci, including [NOTCH2NLA](https://gnomad.broadinstitute.org/short-tandem-repeat/NOTCH2NLA?dataset=gnomad_r4), [FRA10AC1](https://gnomad.broadinstitute.org/short-tandem-repeat/FRA10AC1?dataset=gnomad_r4), and [TMEM185A](https://gnomad.broadinstitute.org/short-tandem-repeat/TMEM185A?dataset=gnomad_r4), which, to our knowledge, are not currently linked to rare diseases, but have historically appeared in various STR catalogs as suspected disease-causing loci. 

The updated dataset now includes a total of 77 TR loci. 


**Samples**

We also updated the TR callset to remove 732 samples that had 100bp read lengths. All remaining samples have 150bp reads. We also removed all PCR-plus samples. We then added 626 PCR-free genome samples from the Human Genome Diversity Project (HGDP). The updated dataset now has genotypes from 16,328 genomes for 73 of the loci, and from 14,035 genomes for 4 loci (NAXE, PRE-MIR7-2, FAM193B, and EP400) with 
the difference being due to changes in cloud access to read data. 

**Genotype Quality Scores**

We added two genotype quality scores: **Q** and **ManualReviewGenotypeQuality**.  

The **Q** score ranges between 0 (low quality) and 1 (high quality) and is based on the ratio between the allele size and the width of the confidence interval reported by ExpansionHunter. It is described in more detail in [[Jam 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10028971)] and is evaluated in [[Weisburd 2023](https://pubmed.ncbi.nlm.nih.gov/37214979/)].

The **ManualReviewGenotypeQuality** is available for 4,819 out of 1,411,171 (0.3%) genotypes, and is based on manual review of read visualizations.
To select which genotypes to review for each locus, we started with the longest alleles at the tail of the allele size distribution and then 
reviewed progressively shorter alleles either until we reached a natural stopping point, or until we had reviewed over 100 genotypes for that locus. 
We looked for informative image features described in [[Dolzhenko 2022](https://pubmed.ncbi.nlm.nih.gov/35948990/)] and our [previous blog post](https://gnomad.broadinstitute.org/news/2022-01-the-addition-of-short-tandem-repeat-calls-to-gnomad/#supplemental-details-for-examining-read-visualizations) and recorded the genotype quality as:  
* `High` - if the genotype appears to be accurate  
* `Medium` - if the genotype is probably accurate, but there are indications that it might be wrong by 3 or more repeats  
* `Low` - if the genotype is probably wrong by 3 or more repeats  

For most loci, two people reviewed the genotypes, and the average of their responses was taken as the final genotype quality. 

**User Interface**

The user interface now includes a new "Color by" selector under the allele size histogram, enabling a color overlay based on genotype quality scores or other annotations. 
Then, in addition to "Linear" and "Log" options in the y-Scale selector, users can now choose "Linear: truncated" to more easily see the tail of the distribution. 
The External Resources section now includes a link to STRchive - a new website that provides up-to-date information on pathogenic thresholds, phenotypes, ages of onset, and other important aspects of known disease-associated loci.  Finally, the Read Data section includes new options and metadata related to the genotype quality scores.

**Downloads**

The updated Downloads table (which contains 1 row for each TR genotype) has several new columns.
`ManualReviewGenotypeQuality` and `Q` columns contain the newly-added genotype qualities, while the `PublicProjectId` and `PublicSampleId` columns contain the source project and individual ids (example: "Human Genome Diversity Project" and "HGDP01400") for 3,102 samples from the HGDP and 1000 Genomes projects.

