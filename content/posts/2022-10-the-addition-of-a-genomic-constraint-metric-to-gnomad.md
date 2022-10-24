---
title: The Addition of a Genomic Constraint Metric to gnomAD
date: 2022-10-24
order: 1
categories:
  - Announcements
authors:
  - Siwei Chen
  - Konrad Karczewski
  - Riley Grant
---
### Overview

A genomic constraint metric is now available on the gnomAD browser. We quantify the depletion of variation (constraint) at a 1kb scale with a signed Z score by comparing the observed variation to an expectation. In each tiling 1kb genomic region, the expected number of variants is predicted using an improved mutational model that takes into account both local sequence context and a variety of genomic features. A higher positive Z score (i.e., observing fewer variants than expected) indicates higher constraint. To learn more about the genomic constraint metric, what it means, and how it was calculated, view the [full preprint on bioRxiv](https://www.biorxiv.org/content/10.1101/2022.03.20.485034).

This metric was calculated for the GRCh38 build of the human genome, and is available for the gnomAD dataset version 3.1.2 on both the Variant and Region pages. The Z score ranges from -10 to 10. Z >= 2.18 (yellow) and Z >= 4.0 (red) represent the top 10% and top 1% of constrained non-coding regions, respectively.

* See the [genomic constraint track](http://gnomad.broadinstitute.org/region/9-22100000-22130000?dataset=gnomad_r3) for a given region

  <figure>
    <figcaption>Location of the Genomic Constraint Track on the Region Page</figcaption>
    <img alt="Genomic Constraint Region Track Zoomed Out" src="../images/2022/10/gc_region_track_zoomed_out.png" width="900" />
  </figure>

  <figure>
    <figcaption>Closer View of a Portion of the Genomic Constraint Track</figcaption>
    <img alt="Genomic Constraint Region Track" src="../images/2022/10/gc_region_track.png" width="900" />
  </figure>

* See the [genomic constraint table](https://gnomad.broadinstitute.org/variant/9-22116221-T-C?dataset=gnomad_r3) for the 1kb region surrounding a specified variant

  <figure>
    <figcaption>The Genomic Constraint Table on the Variant Page</figcaption>
    <img alt="Table of Genomic Constraint" src="../images/2022/10/gc_variant_table.png" height="240" />
  </figure>

* Click the region linked below a variant's constraint table to see the [genomic constraint track with the variant location shown](https://gnomad.broadinstitute.org/region/9-22096221-22136221?variant=9-22116221-T-C&dataset=gnomad_r3) for the 40kb region surrounding it

  <figure>
    <figcaption>A Portion of the Genomic Constraint Track with a Selected Variant</figcaption>
    <img alt="Genomic Constraint Region Track with Selected Variant" src="../images/2022/10/gc_region_track_with_variant.png" width="900" />
  </figure>

All the data is also [available for download](http://gnomad.broadinstitute.org/downloads#research-genomic-constraint).
