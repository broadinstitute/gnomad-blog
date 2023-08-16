---
title: ClinVar track bugfixes
date: "2023-08-17"
order: 1
---

The ClinVar track on Gene pages had several bugs that were identified and fixed, resulting in a more stable and accurate experience for users.

<!-- end_excerpt -->

Previously, several circumstances would cause the ClinVar variants plot to crash when clicking the "expand to all variants" button. Several edge cases and off-by-one errors that had existed in the logic to render this plot have been fixed, resulting in a more stable experience. Further, an edge case on reverse strand genes incorrectly caused some frameshift variants to render in the opposite direction and as the entire length of the gene, this has been fixed leading to a plot that accurately depicts these frameshift variants.

