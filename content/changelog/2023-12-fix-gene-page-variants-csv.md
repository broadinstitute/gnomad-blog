---
title: Fix gene page variant table export to csv
date: "2023-12-01"
order: 1
---

The CSV file containing the information in the variant table for a given gene has been corrected to display the proper counts for each genetic ancestry group.

Any user utilizing a CSV file generated from a v4 gene page should re-download the CSV file to ensure they have the correct data.

<!-- end_excerpt -->

On the gene page, users can download the information present in the variant table to a CSV file for local usage. With the release of v4, this CSV file contained faulty counts for AC, AN, AF, and Number of Homozygotes for certain genetic ancestry groups. When adding up the exome and genome counts for a given variant, differing indexes of genetic ancestry groups in a list resulted in the browser incorrectly combining counts for different groups. 

This has now been corrected, and any v4 variants CSV file downloaded before this was patched (Dec 01, 2023) should be re-downloaded.
