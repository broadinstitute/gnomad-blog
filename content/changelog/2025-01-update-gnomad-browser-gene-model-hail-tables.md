---
title: Update gnomAD browser gene model Hail Tables
date: 2025-01-16
order: 1
---

The gnomAD browser gene model Hail Tables that were previously released have been updated. The tables have been repartitioned from 2,000 to 100 partitions, this smaller amount of paritions is more appropriate for the size of these tables, which should improve efficiency when using them in computations. Futher, the GRCh38 gene model table now includes GTEx and pext data, and the structure of the GTEx and pext data has changed from the previous struct, to an array.

For more information about these tables, please refer to our [help text](http://gnomad.broadinstitute.org/help/v4-browser-hts) on the browser release tables. 

To download these tables, visit our [downloads page](http://gnomad.broadinstitute.org/downloads#v4-browser-tables).
