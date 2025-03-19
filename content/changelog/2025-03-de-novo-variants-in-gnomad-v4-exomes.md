---
title: De novo variants from gnomAD v4.1 exomes
date: 2025-03-21
order: 1
---
To expand the number of publicly available control *de novo* variants, we have released 1,955 coding *de novo* variants (DNVs) called from 1,517 trios in the gnomAD v4.1 exomes.

After applying a series of filters, we obtained a high-quality set of 1,955 coding DNVs. The observed de novo mutation rate per proband (~1.29 per exome) matches the expected rate.

We are continuing to refine our approach by integrating parent-specific *de novo* priors and better adjustments for false homozygous reference genotypes in the proband. We hope to release an updated dataset soon.

For more details on our de novo detection methods, visit our [gnomad_qc GitHub repository](https://github.com/broadinstitute/gnomad_qc/blob/main/gnomad_qc/v4/create_release/create_de_novo_release.py) and [gnomad_methods GitHub repository](https://github.com/broadinstitute/gnomad_methods/blob/1e459ab041853fdcf35678b0d66a2a8f34e4754b/gnomad/sample_qc/relatedness.py#L1516).

To download the DNV dataset, visit our [downloads page](https://gnomad.broadinstitute.org/data#v4-de-novo).