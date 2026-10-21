---
title: Long-Read Genome Data in gnomAD
date: 2026-10-22
order: 1
categories:
  - Announcements
  - Release
authors:
  - Xuefang Zhao
  - Karan Jaisingh
  - Katherine Chao
  - Daniel Ben-Isvy
  - Ben Weisburd
  - Yulia Mostovoy
  - Alex Yenkin
  - Hang Su
  - Kiran Garimella
  - Heidi Rehm
  - Konrad Karczewski
  - Kaitlin Samocha
  - Matthew Solomonson
  - Harrison Brand
  - Michael E. Talkowski
---
We announce the beta release of the first gnomAD long-read (**gnomAD-LR**) resource, comprising long-read genome sequencing (lrGS) data from **1,319 samples**. The release includes two complementary datasets: 1,027 participants self-identifying as Black or African American in the All of Us Research Program (AoU)<sup>1</sup>, and 292 publicly available samples from the Human Pangenome Reference Consortium (HPRC)<sup>2</sup> and the Human Genome Structural Variation Consortium (HGSVC)<sup>3</sup>**.** The samples included here were sequenced using PacBio HiFi technology.<sup>1</sup> Variants in the high-coverage HPRC and HGSVC cohorts have been phased, with haplotypes and phased methylation profiles provided in this resource. Detailed information of the samples can be found in the AoU data quality report and recent publications ([https\://support.researchallofus.org/hc/en-us/articles/50655639562900-All-of-Us-Genomics-Multi-omics-Quality-Report](https://support.researchallofus.org/hc/en-us/articles/50655639562900-All-of-Us-Genomics-Multi-omics-Quality-Report)).<sup>1,3,4</sup>

## Background

Short-read genome sequencing (srGS) has been widely adopted by large genomic initiatives and national biobanks. Given the ambiguous alignment of short DNA sequences for repetitive sequences such as tandem repeats (TRs) and segmental duplications (SDs), variants in these regions are not always fully characterized by srGS. Applications of lrGS can overcome this limitation with reads spanning tens to hundreds of kilobases and can detect variation across complex genomic regions<sup>3,5,6</sup>. Consequently, a growing number of studies are evaluating lrGS for fundamental, population, clinical research<sup>7–9</sup>, thus necessitating an lrGS-based population reference to support variant filtering and interpretation, which we release here as **gnomAD-LR**.

The current lrGS datasets used here include the deeply sequenced (\>30X coverage) and haplotype-resolved assemblies and the comprehensive variant callset of the HPRC and HGSVC, and the 1,027 moderate-coverage (\~8X) lrGS data generated and analyzed during Phase I of the AoU Long Read Working group. Notably, gnomAD-LR differs from a standard gnomAD srGS release. In most gnomAD releases, sequencing metrics, data sources, and callsets are harmonized and uniformly filtered. Here, we sought to maximize the number of lrGS samples accessible in the field, and to capture as much global population representation as possible. The datasets were thus included from the HPRC, HGSVC, and AoU despite differences in sequencing depth, genetic ancestry representation, and source material (blood-derived DNA in AoU, cell line derived DNA in HPRC and HGSVC). Nonetheless, we have uniformly processed and analyzed all data using standardized and open source methods from AoU, the HGSVC, and HPRC. Consistent with all gnomAD resources, all data are being publicly released without use restriction.

## Overview of the datasets

The gnomAD LR resource represents a total of **87.9M** variants. The total dataset includes 72.4M variants from 1,027 samples in AoU and 51.1M variants from the 292 HPRC/HGSVC samples, with 35.6M variants shared by both. Most variants are single nucleotide variants (SNVs; 72.7M). The resource also includes 14.3M small deletions and insertions (indels, 1-49 bp) and 818.1k structural variants (SVs) (**Figure 1A, Table 1**). On average, we discover 4.4M SNVs, 984k indels, and 26.8k SVs per genome (**Figure 1B).** As expected, larger variants that tend to have bigger functional impacts are seen less often (**Figure 1C**). By comparison to srGS from the 1000 Genomes Project and gnomAD<sup>10–12</sup>, these data represent substantial increases per genome in short variants (10% of SNVs and 20% of indels), and dramatic increases in SV per genome (\>150%;). We genotyped approximately 5.7M TR sites<sup>13–15</sup>. We found alternative alleles within 4.7M of the TR sites, including 42.6k sites that reside within coding sequences. An average of 1.3M alternative TR alleles were observed per individual genome, including 2,522 that reside within coding sequences of 1,535 genes.

![Overview of the gnomAD-LR datasets](../images/figure1.png "Figure 1")

**Figure 1\. Overview of the gnomAD-LR datasets.** Top row, HPRC/HGSVC samples; bottom row, AoU Phase I samples. **(A)** Number of variants per cohort, by variant type and size. **(B)** Per-sample variant counts, colored by inferred genetic ancestry. **(C)** Variant size distribution.

**Table 1\. Count of variants in gnomAD-LR split by variant type**

| Cohort     | SNV        | Indel (1-49 bp) | SV (≥50 bp) |
| ---------- | ---------- | --------------- | ----------- |
| Combined   | 72,686,661 | 14,349,665      | 818,140     |
| HPRC/HGSVC | 41,338,660 | 9,448,544       | 305,175     |
| AoU        | 59,237,824 | 12,440,939      | 727,037     |

## Improved variant discovery in repetitive sequences with lrGS

We compared gnomAD-LR with two existing short-read variant databases, dbSNP and gnomAD<sup>12,16,17</sup>. Most SNVs and indels from gnomAD-LR were already present in at least one of these srGS resources. In contrast, 25.1% of SVs between 50-500 bp and 54.0% of SVs greater than 500 bp are unique to gnomAD-LR (**Figure 2**). Most of these lrGS-specific SVs fall within SDs and TRs. These variants localized to highly repetitive sequences in the genome accounted for 88.3% of lrGS-specific deletions and 89.2% of lrGS-specific insertions. In the remaining 90.3% of the genome outside SD/SR regions, most SVs were already captured by srGS resources (89.3% of deletions and 75.4% of insertions).

![Overlap of gnomAD-LR variants with short-read resources](../images/figure2.png "Figure 2")

**Figure 2\. Overlap of gnomAD-LR variants with short-read resources.** Top row, HPRC/HGSVC samples; bottom row, AoU Phase I samples. **(A)** Number of variants by type and size (solid bars, left axis, log10 scale) and the proportion also present in short-read resources (dbSNP or gnomAD v4; hatched bars). **(B)** Proportion of variants present in short-read resources, by variant type, size, and genomic context: unique sequence, RepeatMasker repeats, segmental duplications, and simple repeats.

## Impact of lrGS variants on gene function

We predicted the functional impact of each variant using the Ensembl Variant Effect Predictor (VEP)<sup>18</sup> and GATK SVAnnotate<sup>11</sup>. Among rare variants (allele frequency \[AF\] \< 1%), 30.8k of SNVs, 21.4k of small indels, and 9.9k of SVs were predicted to result in loss-of-function (pLoF) and collectively impacted 18,058 genes. On average, each genome harbored a rare pLoF variant in 89 genes: 48 altered by SNVs, 30 by indels, and 11 by SVs (**Figure 3A**).

We next compared these variants with gnomAD v4 LOEUF scores<sup>17</sup>, a gene constraint metric derived from short-read data. As expected, more constrained genes are less likely to be disrupted by rare pLoF variants in the lrGS data (**Figure 3B**\-**C**). We also find that SVs discovered by lrGS are better tagged by nearby SNVs in linkage disequilibrium (LD), particularly in highly repetitive SD and SR regions. In these regions, the median maximum r² between common (AF ≥1%) SVs and SNVs within 1 Mb is 0.56 in gnomAD-LR, compared with 0.24 for srGS in gnomAD v4. Outside SD/SR regions, SVs are well tagged by nearby SNVs in both datasets (median r² \= 0.89; **Figure 3D**). These data suggest that SNVs and SVs localized to repetitive sequences display more accurate genotyping by lrGS and thus higher average LD, which will ultimately have implications for SV analyses in population genetic and trait association studies.

![Impact of lrGS variants](../images/figure3.png "Figure 3")

**Figure 3\. Impact of lrGS variants. (A)** Median count of genes per genome disrupted by rare (AF \< 1%) pLoF variants of any type (left), and by SNVs, indels (1-49 bp), and SVs (≥50 bp) separately (right). **(B)** Proportion of genes carrying rare pLoF variants in each LOEUF decile  (gnomAD v4), from most constrained (left) to least constrained (right). **(C)** Observed/expected ratio of rare pLoF SVs across LOEUF percentiles in the public (blue) and AoU Phase I (orange) samples. **(D)** LD (r²) between SVs and nearby SNVs for SVs in repetitive (SD/SR) and unique sequences, from short-read (gnomAD v4, blue) and long-read (gnomAD-LR, orange) data. White dots mark medians.

## Exploring the data in the gnomAD-LR browser

The gnomAD-LR beta browser ([https\://long-read-beta.gnomad.broadinstitute.org/](https://long-read-beta.gnomad.broadinstitute.org/)) displays all variants, from SNVs to large SVs, with site-level summary statistics. We illustrate these features below using the *CEL* gene as an example. Each gene page shows the per-base lrGS sequencing depth alongside srGS coverage from gnomAD for direct comparison (**Figure 4**). Variants are listed in a variant table annotated with allele frequencies (overall and by genetic ancestry group), overlap with existing srGS resources, and predicted functional consequences. The table can be filtered by variant type and consequence, and each variant name has a link to the full details. Fully phased haplotypes of the HPRC and HGSVC samples are shown in the “Haplotype View”, together with per-haplotype methylation profiles for the HPRC samples (**Figure 5**). Methylation data are not accessible in Phase I of AoU, but will be accessible in future AoU releases. In this view, SNVs are drawn as dots and other variants as bars. Insertions appear as single-base bars, while the length of each deletion or TR bar reflects its size. For each TR, the browser also shows the distribution of allele lengths and repeat copy numbers across the cohort.

![Illustration of sequencing coverage tracks on gnomAD-LR browser](../images/figure5.png "Figure 4")

**Figure 4\. Illustration of sequencing coverage tracks on gnomAD-LR browser.**

![View of phased haplotypes and matched methylation profile on gnomAD-LR browser](../images/figure6.png "Figure 5")

**Figure 5\. View of phased haplotypes and matched methylation profile on gnomAD-LR browser.**

## Code and data availability

We applied the same data processing and variant discovery pipelines used in the AoU Long Read Working Group for Phase I of the AoU lrGS dataset. Technical details described in the AoU Phase I paper (see Garimella et al.<sup>1</sup>). Short variants from HPRC and HGSVC samples were generated using the same pipeline, while the SV call sets were generated as part of the 1000 Genomes Project long-read analyses.<sup>4</sup> Pipelines for quality evaluation, phasing, and variant annotation are organized at [https\://github.com/talkowski-lab/lr-pipeline/](https://github.com/talkowski-lab/lr-pipeline/). VCFs for both datasets are available for [download](https://long-read-beta.gnomad.broadinstitute.org/data#lr).

## Feedback

The current release of gnomAD-LR is a beta version. We are continuing to refine the gnomAD-LR display and encourage users to provide feedback or ask questions on our [forum](https://discuss.gnomad.broadinstitute.org/c/long-reads/14).

## Acknowledgements

We thank the participants of the All of Us Research Program, who donated their biological samples and data. The development of the gnomAD-LR browser was supported by a grant to the Broad Institute All of Us Genome Center (OT2OD03812), as well as the National Human Genome Research Institute (U24HG011450).

## References

1. Garimella, K. V. *et al.* Population-scale long-read sequencing in the All of Us Research Program. *medRxiv* (2025) doi:[10.1101/2025.10.02.25336942](http://dx.doi.org/10.1101/2025.10.02.25336942).
2. Lucas, J. K. *et al.* HPRC2: A human pangenome reference with near-complete coverage of common genetic variation. *bioRxiv* (2026) doi:[10.64898/2026.07.21.739710](http://dx.doi.org/10.64898/2026.07.21.739710).
3. Logsdon, G. A. *et al.* Complex genetic variation in nearly complete human genomes. *Nature* **644**, 430–441 (2025).
4. Lin, J. *et al.* A high-resolution human pangenome structural variant resource for improved disease association. *medRxiv* (2026) doi:[10.64898/2026.08.21.26361050](http://dx.doi.org/10.64898/2026.08.21.26361050).
5. Ebert, P. *et al.* Haplotype-resolved diverse human genomes and integrated analysis of structural variation. *Science* **372**, eabf7117 (2021).
6. Zhao, X. *et al.* Expectations and blind spots for structural variation detection from long-read assemblies and short-read genome sequencing technologies. *Am. J. Hum. Genet.* **108**, 919–928 (2021).
7. Sanchis-Juan, A. *et al.* Structural variant discovery and diagnostic impact in rare diseases from short-read and long-read sequencing. *medRxiv* (2026) doi:[10.64898/2026.06.22.26356238](http://dx.doi.org/10.64898/2026.06.22.26356238).
8. de Bitter, T. J. J. *et al.* Clinical long-read genome sequencing for rare-disease diagnostics. *N. Engl. J. Med.* **395**, 405–408 (2026).
9. Jensen, T. D. *et al.* Integration of transcriptomics and long-read genomics prioritizes structural variants in rare disease. *Genome Res.* **35**, 914–928 (2025).
10. Byrska-Bishop, M. *et al.* High-coverage whole-genome sequencing of the expanded 1000 Genomes Project cohort including 602 trios. *Cell* **185**, 3426–3440.e19 (2022).
11. Collins, R. L. *et al.* A structural variation reference for medical and population genetics. *Nature* **581**, 444–451 (2020).
12. Chen, S. *et al.* A genomic mutational constraint map using variation in 76,156 human genomes. *Nature* **625**, 92–100 (2024).
13. Weisburd, B. *et al.* Defining a tandem repeat catalog and variation clusters for genome-wide analyses and population databases. *Am. J. Hum. Genet.* **113**, 915–928 (2026).
14. Ren, J., Gu, B. & Chaisson, M. J. P. Vamos: Variable-number tandem repeats annotation using efficient motif sets. *Genome Biol.* **24**, 175 (2023).
15. Dolzhenko, E. *et al.* Characterization and visualization of tandem repeats at genome scale. *Nat. Biotechnol.* **42**, 1606–1614 (2024).
16. Sherry, S. T. *et al.* dbSNP: the NCBI database of genetic variation. *Nucleic Acids Res.* **29**, 308–311 (2001).
17. Guez, J. *et al.* Integrating 730,947 exome sequences with clinical literature improves gene discovery. *medRxiv* (2026) doi:[10.64898/2026.03.23.26349081](http://dx.doi.org/10.64898/2026.03.23.26349081).
18. Hunt, S. E. *et al.* Annotating and prioritizing genomic variants using the Ensembl Variant Effect Predictor-A tutorial. *Hum. Mutat.* **43**, 986–997 (2022).
