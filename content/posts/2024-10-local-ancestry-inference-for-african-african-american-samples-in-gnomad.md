---
title: Local Ancestry Inference for African/African American Samples in gnomAD
date: 2024-10-11
order: 1
categories:
  - Announcements
  - Release
authors:
  - Pragati Kore*
  - Michael Wilson*
  - Katherine Chao
  - Elizabeth Atkinson
---
**Announcement**

We have now released an extension of local ancestry-informed frequency work from the inferred [Admixed American genetic ancestry group](https://gnomad.broadinstitute.org/news/2021-12-local-ancestry-inference-for-latino-admixed-american-samples-in-gnomad/) to the inferred African/African American genetic ancestry group (n=20,805) within gnomAD v4.0. This implementation of local ancestry inference (LAI) resolves the admixed ancestries of African/African American samples into their respective African and European haplotypes, leading to better-informed functional and/or clinical classifications.

<!-- end_excerpt -->

The new local ancestry-informed frequency data includes 24,204,574 bi-allelic variants with low genotype missingness (call rate > 0.9) and an allele frequency greater than 0.1% within this genetic ancestry group. This release of gnomAD LAI-informed data provides alternate allele counts, allele numbers, and frequencies partitioned by continental genetic ancestries, with the extension of fine-scale ancestry resolution to the African/African American genetic ancestry group aiming to further improve the interpretation of genetic variation within admixed individuals.

**Methods**

We adapted the [previously described](https://gnomad.broadinstitute.org/news/2021-12-local-ancestry-inference-for-latino-admixed-american-samples-in-gnomad/) gnomAD LAI pipeline for the African/African American genetic ancestry group to account for the sample composition and the larger sample size when compared to the Admixed American genetic ancestry group. The reference panel was composed of [harmonized AFR and EUR supergroups](https://docs.google.com/spreadsheets/d/1jenSz_HnbA1kBESaUmur3Ob72-EPXJgfUWhbz5UdltA/edit?gid=0#gid=0) from the Human Genome Diversity Project and the 1000 Genomes Project<sup>1</sup>. We did not include groups with recent admixture events, specifically the Americans of African Ancestry in Southwest USA (ASW) and African Caribbean in Barbados (ACB) groups in order to avoid an EM iteration in RFMix2 and therefore additional computational cost. For more information on our genetic ancestry groups, our reference panels, and how we think about genetic ancestry, please visit our [genetic ancestry blog post](https://gnomad.broadinstitute.org/news/2023-11-genetic-ancestry/). The updated computational pipeline, written in Hail Batch, is publicly available via [GitHub](github.com/broadinstitute/gnomad_local_ancestry). 

**Results**

![](../images/lai_afr_admixture.png)

We analyzed the gnomAD African/African American genetic ancestry group using [ADMIXTURE](https://dalexander.github.io/admixture/) with a 5% ancestry inclusion threshold. These samples' admixed genetic ancestry is broken down into primarily two-way African and European components, with 32% of individuals having more than 95% AFR genetic ancestry and 68% primarily two-way admixed individuals. As such, we modeled genetic ancestry for this group with a two-way AFR/EUR reference panel.

![](../images/lai_afr_apol1.png)

LAI enables identification of disease-risk variants that occur at higher frequencies within specific genetic ancestry components. For example, the gnomAD variant 22-36265860-A-G in *APOL1*, linked with increased susceptibility to focal segmental glomerulosclerosis (FSGS), HIV-associated nephropathy (HIVAN), and hypertensive end-stage kidney disease (ESKD)<sup>2</sup>, shows a 27% allele frequency in African haplotypes of the African/African American genetic ancestry group<sup>3</sup>, compared to a 1% gnomAD-wide ("global") frequency.

![](../images/lai_afr_cftr.png)

LAI is useful in resolving allele frequencies for rare variants as well as common. Another example is the gnomAD variant 7-117606754-G-A in *CFTR*, associated with cystic fibrosis<sup>4</sup>. This variant shows a 0.1% allele frequency in African haplotypes of the African/African American genetic ancestry group, compared to a 0.007% gnomAD-wide ("global") frequency. These variant examples highlight the importance of more precise allele frequencies in accurately identifying the distribution of genetic risk factors within diverse genetic ancestry groups. 

**Conclusion**

By calculating and releasing LAI-informed data, we provide a higher-resolution view of allele frequencies, which is obscured when assessing frequency at the genetic ancestry group-level, enabling more equitable and precise genomic research. We look forward to continuing to further refine gnomAD allele frequency presentations in future releases to better reflect the continuous nature of genetic ancestry<sup>5,6</sup>. 

**References**

1. Koenig, Z., Yohannes, M. T., Nkambule, L. L., Zhao, X., Goodrich, J. K., Kim, H. A., Wilson, M. W., Tiao, G., Hao, S. P., Sahakian, N., Chao, K. R., Walker, M. A., Lyu, Y., Consortium, gnomAD P., Rehm, H. L., Neale, B. M., Talkowski, M. E., Daly, M. J., Brand, H., … Martin, A. R. (2024). A harmonized public resource of deeply sequenced diverse human genomes. BioRxiv. https://doi.org/10.1101/2023.01.23.525248
2. Kopp, J. B., Nelson, G. W., Sampath, K., Johnson, R. C., Genovese, G., An, P., Friedman, D., Briggs, W., Dart, R., Korbet, S., Mokrzycki, M. H., Kimmel, P. L., Limou, S., Ahuja, T. S., Berns, J. S., Fryc, J., Simon, E. E., Smith, M. C., Trachtman, H., … Winkler, C. A. (2011). APOL1 Genetic Variants in Focal Segmental Glomerulosclerosis and HIV-Associated Nephropathy. *Journal of the American Society of Nephrology : JASN*, *22*(11), 2129. <https://doi.org/10.1681/ASN.2011040388>
3. Genovese, G., Friedman, D. J., Ross, M. D., Lecordier, L., Uzureau, P., Freedman, B. I., Bowden, D. W., Langefeld, C. D., Oleksyk, T. K., Uscinski Knob, A. L., Bernhardy, A. J., Hicks, P. J., Nelson, G. W., Vanhollebeke, B., Winkler, C. A., Kopp, J. B., Pays, E., & Pollak, M. R. (2010). Association of trypanolytic ApoL1 variants with kidney disease in African Americans. Science, 329(5993), 841–845. 
4. Padoa, C., Goldman, A., Jenkins, T., & Ramsay, M. (1999). Cystic fibrosis carrier frequencies in populations of African origin. Journal of Medical Genetics, 36(1), 41. /pmc/articles/PMC1762947/?report=abstract
5. <https://www.nationalacademies.org/our-work/use-of-race-ethnicity-and-ancestry-as-population-descriptors-in-genomics-research>
6. Lewis, A. C. F., Molina, S. J., Appelbaum, P. S., Dauda, B., Di Rienzo, A., Fuentes, A., Fullerton, S. M., Garrison, N. A., Ghosh, N., Hammonds, E. M., Jones, D. S., Kenny, E. E., Kraft, P., Lee, S. S., Mauro, M., Novembre, J., Panofsky, A., Sohail, M., Neale, B. M., & Allen, D. S. (2022). Getting genetic ancestry right for science and society. Science (New York, N.Y.), 376(6590), 250–252. <https://doi.org/10.1126/science.abm7530>
