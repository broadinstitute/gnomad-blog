---
title: De novo variants in gnomAD v4 exomes
date: 2025-03-21
order: 1
---
To expand the number of publicly available control *de novo* variants, we identified *de novo* variants (DNVs) in 1,517 releasable trios from gnomAD v4 exomes. We adapted Hail’s [hl.de_novo](https://hail.is/docs/0.2/methods/genetics.html#hail.methods.de_novo) to align with [Kaitlin Samocha’s original de novo caller](https://github.com/ksamocha/de_novo_scripts/tree/master), incorporating PLs of the trios, a de novo prior probability, and a population frequency prior.

After applying a series of filters, we obtained a high-quality set of 1,955 coding DNVs. The observed de novo mutation rate per proband (~1.29 per exome) matches the expected rate.

Our team is currently working on implementing a more sophisticated algorithm developed by Mark Daly’s group. This approach will integrate a parent-specific de novo prior and account for false homozygous reference genotypes in the proband to further improve accuracy.

For more details on our de novo detection methods, visit our [gnomad_qc GitHub repository](https://github.com/broadinstitute/gnomad_qc/blob/main/gnomad_qc/v4/create_release/create_de_novo_release.py).

To download the DNV dataset, visit our [downloads page]().