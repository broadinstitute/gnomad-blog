---
title: Population frequency display modified
date: "2023-08-24"
order: 1
---

Previously, for a given population, when a variant had an allele number (AN) of 0, the Allele Frequency (AF) in the population frequencies table would be displayed as 0. This was misleading, as it implied understanding of the frequency of the variant, where there was none.

Now, in those cases, the AF is now displayed as a '-' character. This helps users distinguish at a glance when there is no frequency information known about a variant for a given population or subpopulation.

<!-- end_excerpt -->


