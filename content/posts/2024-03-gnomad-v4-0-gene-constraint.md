---
title: gnomAD v4.0 Gene Constraint
date: 2024-03-08
order: 1
categories:
  - Announcements
authors:
  - Katherine Chao
  - Kristen Laricchia
  - Julia Goodrich
  - Konrad Karczewski
  - Kaitlin Samocha
---
We updated our [gene constraint](https://gnomad.broadinstitute.org/help/constraint) metrics following the release of gnomAD [v4.0](https://gnomad.broadinstitute.org/news/2023-11-gnomad-v4-0/). gnomAD v4.0 expanded the scale of our constraint calculations – our new metrics include nearly **6x** more samples than our previous calculations – and enabled constraint estimation in genome reference build GRCh38.

There have been a few significant updates to our constraint calculations, and we continue to iterate on our methods. In this blog post, we discuss the differences between the v2.1.1 and v4.0 gene constraint calculations. **Note that the v4.0 metrics are still experimental. We recommend that anyone using the v4.0 constraint results should consider the metric to be in a beta stage, and anyone looking for a more established version should continue to use the gnomAD v2.1.1 constraint metrics.**

## Differences between v2.1.1 and v4.0
There are three major differences between gnomAD v2.1.1 and gnomAD v4.0 gene constraint:
- The number of samples included in the calculations
- The loci included in the calculations
- Updated loss-of-function observed/expected upper bound fraction (LOEUF) threshold recommendation

### Samples included in constraint calculations
The gnomAD v4.0 gene constraint calculations included 730,947 exomes, all aligned to genome reference build GRCh38. The gnomAD v2.1.1 metrics, on the other hand, included only 125,748 exomes aligned to GRCh37. This sample size increase means a deepened understanding of mutational constraint due to the accompanying increase in the number of observed and expected variants.

Note that Z-scores are a measure of *statistical* significance and are therefore sensitive to sample size. This means that a gene with the exact same observed/expected (`oe`) ratio will have different Z-scores between gnomAD v2.1.1 and gnomAD v4.0. For example, [SCN1A](https://gnomad.broadinstitute.org/gene/ENSG00000144285?dataset=gnomad_r4) has 55% of expected missense variants in v2 (590 obs / 1071 exp) with a Z-score of 5.2. In v4, the ratio of observed/expected variants stays fairly stable (56%), but we now observe >2x as many variants (1291 obs / 2287 exp), and thus our measure of statistical significance has become larger (Z = 7.6).

### Loci included in constraint calculations
The v4.0 gene constraint metrics were calculated across high coverage bases (median exome depth ≥ 30) only. This is a departure from the v2.1.1 metrics, which included all possible coding bases in the exome with a correction for low coverage bases (details provided in the Supplement<sup>1</sup>). In addition, v4.0 gene constraint is only available across the autosomes; constraint on the sex chromosomes is not yet available. Any users interested in assessing constraint in genes on either chromosome X or chromosome Y can still investigate these genes using the v2.1.1 results.

### LOEUF guidance
The loss-of-function observed/expected upper bound fraction (LOEUF) score is a continuous metric<sup>2</sup> designed to demonstrate a gene's intolerance to loss-of-function variation. We encourage our users to use LOEUF as a continuous metric but realize that certain applications require a threshold for easier interpretation. Due to expected shifts in the LOEUF distribution between gnomAD v2.1.1 and v4.0, we now recommend a threshold of **LOEUF < 0.6** for v4.0 (compared to **LOEUF < 0.35** for v2). We note that the genes in each LOEUF decile are fairly stable between gnomAD v2.1.1 and v4.0 (e.g., nearly all genes in the first decile before are still in the first decile). Optional alternative approaches would be to use LOEUF decile or the pLI metric (where the recommended cut off is still <0.9) to define LoF constrained genes. 

## More updates will be forthcoming
We are continuing to refine our gene constraint methods to fully leverage the scale of gnomAD v4.0 and are hoping to share additional updates in the near future, including adding constraint metrics calculated on chromosome X. We encourage users to explore the v4.0 results and provide feedback or ask questions on our new [forum](https://discuss.gnomad.broadinstitute.org/).

#### References and notes
1. Karczewski, K. J., Francioli, L. C., Tiao, G., Cummings, B. B., Alföldi, J., Wang, Q., Collins, R. L., Laricchia, K. M., Ganna, A., Birnbaum, D. P., Gauthier, L. D., Brand, H., Solomonson, M., Watts, N. A., Rhodes, D., Singer-Berk, M., England, E. M., Seaby, E. G., Kosmicki, J. A., … MacArthur, D. G. The mutational constraint spectrum quantified from variation in 141,456 humans. Nature 581, 434–443 (2020). <https://doi.org/10.1038/s41586-020-2308-7>
2. "Continuous metric" here refers to LOEUF's ability to provide insight across the full spectrum of LoF constraint. Because LOEUF is built directly on the observed/expected (`oe`) variant ratio, it is a more direct measure of biological significance. For example, an `oe` of 0.11 seen in [CHD7](https://gnomad.broadinstitute.org/gene/ENSG00000171316?dataset=gnomad_r4) is built on the LoF `oe` within this gene of 0.08, which means that only 8% of the expected LoF variation has been observed in gnomAD data. pLI, on the other hand, is a dichotomous metric designed to separate genes into two categories: highly constrained against LoF (pLI > 0.9) or not constrained against LoF (pLI < 0.1). Very few genes have pLI values between 0.1-0.9, and values within this range aren't easily interpretable.
