---
title: Update gnomAD tandem repeat (TR) data
date: 2026-07-24
order: 1
---

We have updated the [gnomAD TR pages](https://gnomad.broadinstitute.org/short-tandem-repeats?dataset=gnomad_r4). Changes include:
- Adding a new disease-associated TR locus: RAI1
- Additional manual review of read visualizations for PRE-MIR7-2
- New External Resources links: TRExplorer and the ExpansionHunter catalog used to generate the callset

<!-- end_excerpt -->

**Loci**
- Added [RAI1](https://gnomad.broadinstitute.org/short-tandem-repeat/RAI1?dataset=gnomad_r4) as a new disease-associated TR locus.
- The dataset now includes 78 total TR loci (up from 77).

**Genotype Quality Scores**
- Reviewed an additional 66 genotypes for [PRE-MIR7-2](https://gnomad.broadinstitute.org/short-tandem-repeat/PRE-MIR7-2?dataset=gnomad_r4), most of which were flagged as low quality.
- Completed an initial manual review pass for RAI1.

**External Resources**
- Added a link to **TRExplorer**, pre-filled to search the gene's pathogenic repeats.
- Added a link to the exact **ExpansionHunter catalog** file used to generate the current gnomAD TR callset.

**Site Updates**
- Added a data-version label to the TR list page, so it's always clear which callset a given view reflects.

<!--
TODO before publishing:
- EP400 is currently undergoing a locus-definition change and re-review (large shifts in manual-review quality scores between releases: high 286->130, low 6->100, medium 8->14). Not finalized as of this draft -- confirm status and either add a bullet here or hold for a follow-up entry once the new definition is settled.
- FAM193B and NAXE: verified unchanged this release (no new review, same allele counts) -- confirmed NOT part of this changelog, despite earlier assumptions.
- Sample/genome cohort composition unchanged this release (allele totals identical for every locus except the new RAI1) -- no "Samples" section needed, unlike the March 2025 entry.
- Numbers above computed by diffing gs://gnomad-browser/STRs/gnomAD_STR_distributions__gnomad-v2__2025_03_17.json.gz vs ..._2026_07_20.json.gz (AlleleCountHistogram per locus), not from a canonical release-notes doc -- spot check before publishing.
-->
