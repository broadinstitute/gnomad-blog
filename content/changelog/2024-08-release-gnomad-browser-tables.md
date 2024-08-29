---
title: Release gnomAD browser tables
date: 2024-08-29
order: 1
---

The Hail Tables that underlie the gnomAD browser are now available for public use. These tables closely mirror the structure of the browser, enabling users familiar with the gene and variant pages to easily access the full set of underlying data in a format consistent with the browser's organization.

For more information about these tables, please refer to our [help text](http://gnomad.broadinstitute.org/help/v4-browser-hts) on the browser release tables. 

To download these tables, visit our [downloads page](http://gnomad.broadinstitute.org/downloads#v4-browser-tables).

<!-- end_excerpt -->

**Three tables are now available:**

- gnomAD v4.1 browser variants Hail Table
- GRCh38 browser gene models Hail Table
- GRCh37 browser gene models Hail Table

### browser variants Hail Table

The browser variant table consolidates data from the gnomAD [exome](https://gnomad.broadinstitute.org/downloads#v4-variants), [genome](https://gnomad.broadinstitute.org/downloads#v4-variants), and [joint frequency](https://gnomad.broadinstitute.org/downloads#v4-joint-freq-stats) releases into a single, unified table. Frequency information is stored as a dictionary, and the key-value pairs allow for easy access to specific frequencies.

### GRCh38/GRCh37 Gene Models Hail Tables

The gene models tables aggregate relevant information from multiple sources into a single table. For each gene, data is included from GENCODE, HGNC, and MANE transcripts. Information from GTEx, and various gnomAD secondary analyses are available in the GRCh37 table but are not yet available in the GRCh38 table.

