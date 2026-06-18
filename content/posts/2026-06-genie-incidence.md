---
title: New data available in the Genetic Prevalence and Incidence Estimator (GenIE)
date: 2026-06-15
order: 1
categories:
  - Announcements
  - Release
authors:
  - Samantha Baxter
  - Rachel Ungar
  - Mutaz Amin
  - Elissa Alarmani
  - Riley Grant
  - Carmen Glaze
  - Kaitlin Samocha
  - Anne O'Donnell-Luria
---

**Overview**  
Today we announce the latest update to our tool, the Genetic Prevalence and Incidence Estimator (GenIE, [https://genie.broadinstitute.org](https://genie.broadinstitute.org)), which **now includes estimates of genetic incidence of *de novo* variation (GIDNV)**. This new feature uses [gnomAD v4.1.1 constraint data](https://gnomad.broadinstitute.org/news/2026-03-gnomad-v4-1-1/) to estimate the frequency of suspected *de novo* disease-causing variation at zygote creation. 

<!-- end_excerpt -->

GenIE is a tool that democratizes the process of evaluating the genetic incidence and prevalence of rare disease. [GenIE was co-developed in partnership with the Chan Zuckerberg Initiative Rare as One Network](https://www.medrxiv.org/lookup/content/short/2026.03.30.26349539v1), with the goal of being accessible to the entire genomics community<sup>1</sup>. To learn more about pre-existing GenIE functionality please read [our previous blog post](https://gnomad.broadinstitute.org/news/2024-06-genie/). 

New GenIE features:

* *De novo* incidence rates provided on the [GenIE dashboard](https://genie.broadinstitute.org/dashboard/)  
* Gene-specific pages providing missense and loss of function GIDNV rates

**Background**

Understanding the frequency of a condition is crucial for researchers and pharmaceutical companies to set goals and allocate resources effectively<sup>2</sup>. There are multiple measures used to try to understand how rare or common a disease is in a population. This [diagram from Eric Minikel](https://www.cureffi.org/2019/06/05/using-genetic-data-to-estimate-disease-prevalence/) highlights three types of measurements for disease frequency:

* **Prevalence**: The number of people symptomatic with a disease at any given point in time  
* **Incidence**: The number of new cases (or sometimes new births) per unit time  
* **Lifetime risk**: The probability of any person developing the disease at some point in their life

<div style="margin-left: 4rem;">
    <figure>
        <img alt="Prevalence vs incidence vs lifetime risk" src="../images/2026/06/genie-prevalence-incidence-lifetime-risk.png">
    </figure>
</div>

These measurements work quite well for common diseases where diagnoses are well understood, medical records often capture the diagnosis, and there are a large number of cases to be sampled within a given population.

However, the frequency of most rare diseases remains unknown. Traditional methods of estimating incidence and prevalence, such as case counting in medical records using ICD-10 codes (International Classification of Diseases, 10th Revision)<sup>3</sup>, often yield biased and inaccurate results. Many rare diseases lack specific ICD-10 codes, and even when available, physician recognition or molecular diagnosis and correct coding is required for inclusion in electronic medical records. Another approach, newborn screening, can estimate incidence but is only available for a limited number of conditions, varies between states or programs, and is inconsistently implemented worldwide. 

Given these challenges, researchers have increasingly turned to population genetic databases, particularly the Genome Aggregation Database (gnomAD), to address this challenge. The two primary metrics that can be yielded from population databases are:

* **Genetic Prevalence**: Estimates the proportion of a population with a causal genotype for a genetic disorder  
* **Genetic Incidence**: Estimated rate of causal genotypes at zygote creation

While these measurements have commonalities with the traditional measurements of prevalence and incidence, there are distinctions. To illustrate these differences we use the epidemiologist’s bathtub. In this analogy, prevalence is illustrated by all the water collected in the tub at any given time, and incidence is the rate of new water entering the tub. The water draining from the tube is the rate or death and/or recovery.  

For rare Mendelian disease we propose a new analogy, the genetic epidemiology sink. The water in the sink represents genetic prevalence, the estimated number of individuals with a causal genotype for a genetic disorder in a given population. Genetic incidence, the rate of causal genotypes at zygote creation, is represented by two sources of water, introduced through inherited variation and *de novo* (newly arising) variation. It is important to note that both of these measurements are based on genotype, not phenotype. The drain represents the disease mortality rate. Since genetic variation remains in the population even with treatment or cures, recovery rate is not a factor for these metrics.

<div style="margin-left: 4rem;">
    <figure>
        <img alt="Epidemiologists bathtub and epidemiologists sink" src="../images/2026/06/genie-bathtub-sink-analogy.png">
    </figure>
</div>


Most published genetic prevalence estimates focus on the genetic prevalence of autosomal recessive conditions, often calculated using the well-established Hardy–Weinberg equilibrium equation. However, genes associated with diseases with autosomal recessive inheritance account for only \~50% of all known rare diseases<sup>4</sup>. When variation is inherited (right faucet in the sink analogy), population data provides allele frequency data that can be used to estimate the chance of individuals in a population passing causal variants to their offspring. However, some conditions are caused predominantly by newly arising (*de novo*) variation, often  diseases with early onset and high morbidity. For these conditions, the contribution from inherited variation would be minimal and we thus need to estimate the rate at which causal *de novo* variation is introduced in the population (the left faucet in the sink analogy), which presents challenges for estimating frequency using population data. Some attempts have been made to estimate the incidence of *de novo* diseases in neurodevelopmental disorders, but to date there has been no tool that provides estimates across all dominant diseases<sup>5, 6</sup>. 

Our model continues to build on previous work by López-Rivera et al<sup>5</sup>, and our co-investigator Samocha<sup>7</sup>. With additional modifications to improve the performance, and more transparency into the data used in the calculations, we now provide estimates of genetic incidence of *de novo* variation (GIDNV) on the [GenIE dashboard](https://genie.broadinstitute.org/dashboard/). 

**Methods**

Genetic incidence of *de novo* variation (GIDNV) estimates the rate of new disease-causing variation entering the population. To do this, we first identify how many expected *de novo* variants there are in a given gene (mutation rate), and then estimate the proportion of these variants that are expected to be disease-causing. This is done for both missense and loss-of-function (LoF) variants, summed together, and then multiplied by two to account for both chromosomes.

This is represented by the formula: 

GIDNV \= (\[(*𝑜𝑒\_𝑚𝑖𝑠\_prior* − 𝑜𝑒\_𝑚𝑖𝑠 ) 𝑚𝑢\_𝑚𝑖𝑠\] \+ \[(*𝑜𝑒\_lof\_prior* − 𝑜𝑒\_𝑙𝑜𝑓) 𝑚𝑢\_𝑙𝑜𝑓\]) x 2

<div style="margin-left: 4rem;">
    <figure>
        <img alt="Table displaying a summary of the terms involved in the GIDNV calculation" src="../images/2026/06/genie-incidence-calculations-table.png">
    </figure>
</div>

In more detail, the number of expected *de novo* mutations per gene is indicated by the mutation rate, *mu*, calculated in gnomAD v4.1.1<sup>8</sup>. The proportion of these expected *de novo* mutations that are disease causing is estimated using the scaling factor *oeprior\-oemis*.  This is equivalent to the depletion of the observed / expected (oe) from the non-disease gene average, where oe represents how conserved a gene is for having variants in a given mutational class. If *oe\_mis\_prior*\<*oe\_mis*, the adjusted mutation rate would be negative. As this is not biologically meaningful, a mutation rate of zero is assigned since we assume that means there are no disease-causing variants in the gene. The same holds for *oe\_lof\_prior*\<*oe\_lof*. Given there are two copies of each chromosome, the ultimate value is multiplied by 2\. 

### **Results**

The GIDNV results for disease-associated genes are now available on the GenIE dashboard.  The results are displayed as “Estimated incidence of *de novo* variation (per 100,000).” The gene-wide result is displayed on the dashboard. If you click on the result, it will bring you to a gene-specific page that will provide the more detailed formula, values used for the calculations, and break down the GIDNV results by variant type. 

<div style="margin-left: 4rem;">
    <figure>
        <img alt="Location of incidence link on dashboard" src="../images/2026/06/genie-dashboard-incidence-location.png">
    </figure>
</div>

We have also added gene-specific flags for clonal hematopoiesis of indeterminate potential (CHIP)<sup>9, 10</sup> or clonal expansion spermatogonia (CES) genes<sup>11</sup>. These genes provide a competitive growth advantage by playing a role in cell proliferation and could impact the accuracy of these results.

The GenIE dashboard allows you to scroll or search for a gene of interest.  You can also download the full results and annotations for all genes on the dashboard using the “Download CSV” link below the gene list. If you are interested in accessing the GIDNV results for all genes, not just the ones listed on the dashboard, you can find those in [the all genes download on the dashboard](https://genie.broadinstitute.org/dashboard/).

### **Conclusion**

While genetic incidence of *de novo* variation is a useful value in understanding the incidence and prevalence of a rare disease, GIDNV are not equal to those measurements.

**GIDNV ≠ incidence of rare disease**

There are various factors that need to be considered when interpreting the GIDNV.  Some of these factors include:

**1. Percentage of cases that are *de novo* vs inherited**
   All Mendelian conditions have a different contribution of inherited vs *de novo* variation.  When trying to determine the incidence or prevalence of a disease, both sources of variation need to be taken into consideration. For later onset or more mild autosomal dominant conditions, the frequency of heterozygous pathogenic variants in the population, available on the dashboard, can help estimate the contribution from inherited variation.  
**2. Mechanism of disease**
   The protein-level mechanistic effect is a key part of understanding a variant’s pathogenicity. Variants can fall into one of three categories: loss-of-function (LoF), gain-of-function, (GoF) or dominant negative<sup>12</sup>. Different protein impacts can cause different diseases even within the same gene. Other genes will only cause disease through LoF or GoF variants. Understanding the mechanism of disease for a particular gene will impact the accuracy of these results. For example, GoF variants often occur at specific sites or cluster around hotspots<sup>13</sup>, and therefore a gene-wide estimate may not be appropriate for that disease, if only a handful of possible variations will result in disease.      
**3. Variant class spectrum of pathogenic variants**
   As discussed in disease mechanisms, not all variant types will cause disease in every gene.  GIDNV includes combined data from missense and LoF variants, but we also provide the missense-specific and LoF-specific estimates. If only one of these variant types is known to cause disease then these variant type specific estimates should be used instead of the combined estimate. Additionally, if disease is caused by variant types other than *de novo* missense and LoF (e.g., repeat expansions), those sources of variation are not currently included in these estimates.  
**4. Impacts to life expectancy**
   By reducing the *oe\_prior* to the average for all genes, we believe we have accounted for some of the *de novo* variation that is incompatible with life, and thus is not seen in the population. However, GIDNV may still include some *de novo* variation that could lead to early miscarriage or neonatal loss. This is one possible explanation for why you may see a higher GIDNV than expected based on other disease frequency metrics.  
**5. Reduced penetrance and variable expressivity**
   For all genetic-based estimates (genetic prevalence, genetic incidence, GIDNV), disease spectrum, including reduced penetrance and variable expressivity, need to be considered when interpreting the results. If a disease has reduced penetrance (where not every individual with the genotype will develop disease), these estimates are expected to be higher than clinical diagnosis-based prevalence and incidence estimates.  Variable expressivity means that some variation could have a different clinical diagnosis or present differently than a classic presentation, and those cases would be counted in the genetics-based estimate.

*Limitations*

Limitations of this method include:

* This method does not account for inherited variation  
* Not all *de novo* variation is disease-causing   
* Missense variants can have different protein-level effects (LoF, GoF and dominant-negative) that are typically challenging to predict   
* Mechanism of disease may influence the accuracy of these results  
* This method does not account for reduced fertility, miscarriages, incomplete penetrance or variable expressivity

*Future Directions*

Estimating the genetic incidence and prevalence of dominant diseases requires integrating both *de novo* and inherited variation rates. We will develop an interface that combines GIDNV results with gnomAD allele frequencies, an integration that has not yet been achieved in the field. This effort will also involve curating conditions listed on the dashboard to improve the accuracy of prevalence estimates.

We will also continue to refine these estimates by leveraging resources for understanding the percentage of *de novo* missense variants that cause disease. We also plan to build a more comprehensive calculator that will allow users to modify these estimates based on other factors such as age of onset, reduced penetrance, and disease mechanism. Finally we also plan to continue to add new annotations that can help guide interpretation of the results.

*Technical Details*

GenIE uses the gnomAD [4.1.1 release constraint downloads](https://gnomad.broadinstitute.org/data#v4-constraint) as the primary source for mutation rates and oe values. Genome-wide priors were estimated as the average oe from non-OMIM genes and non-olfactory genes, where olfactory genes were identified from [https://www.genenames.org/data/genegroup/\#\!/group/141](https://www.genenames.org/data/genegroup/#!/group/141)<sup>8</sup>.

GenIE’s uses React and TypeScript on the Frontend, with Chakra as a UI component library. GenIE’s backend is written in Python, using Django Rest Framework. To process user submitted requests for lists, a Python worker using Hail is created by a request from Google Cloud PubSub. Infrastructure is managed using Terraform, and the app deployed in Google Cloud Run, using Google Cloud Build.

The source code necessary to reproduce the analyses is available on [GitHub](https://github.com/broadinstitute/genetic-prevalence-estimator).

**Acknowledgments and Contact Information**  
Thank you to the gnomAD production team, especially Ruchit Panchal for their help with this project. Thank you to Heidi Rehm, Moriel Singer-Berk, and Katie Russell for their support and open feedback.

A special thanks to the patient-led organizations who helped in the development of this functionality, especially Justin West and [KCNT1 Epilepsy Foundation](https://www.kcnt1epilepsy.org/). This tool would not be possible without their support, insights, feedback and collaboration. Finally, thank you to the CZI Science in Society and Rare as One team, Tania Simoncelli, Heidi Bjornson-Pennell, Andra Stratton and Maddy Pensiero, who have believed in this tool from the very beginning.

We would like to acknowledge the Chan Zuckerberg Initiative Donor-Advised Fund at the Silicon Valley Community Foundation \[2020-224274, 2022-316726, DAF2025-360376\] (https://doi.org/10.37921/236582yuakxy) (funder DOI 10.13039/100014989). 

Questions about the work described in this post may be directed to [samantha@broadinstitute.org](mailto:samantha@broadinstitute.org).

**References:**

1\.	Baxter SM, Singer-Berk M, Glaze C, et al. The power of partnership: Democratizing genetic prevalence to empower patient advocacy. *medRxiv*. Published online March 31, 2026:2026.03.30.26349539. doi:[10.64898/2026.03.30.26349539](http://dx.doi.org/10.64898/2026.03.30.26349539)

2\.	Kariampuzha WZ, Alyea G, Qu S, et al. Precision information extraction for rare disease epidemiology at scale. *J Transl Med*. 2023;21(1):157.

3\.	CDC. ICD-10-CM. Classification of Diseases, Functioning, and Disability. June 11, 2024\. Accessed May 22, 2026\. [https://www.cdc.gov/nchs/icd/icd-10-cm/index.html](https://www.cdc.gov/nchs/icd/icd-10-cm/index.html)

4\.	Amberger JS, Bocchini CA, Scott AF, Hamosh A. OMIM.org: leveraging knowledge across phenotype-gene relationships. *Nucleic Acids Res*. 2019;47(D1):D1038-D1043.

5\.	López-Rivera JA, Pérez-Palma E, Symonds J, et al. A catalogue of new incidence estimates of monogenic neurodevelopmental disorders caused by de novo variants. *Brain*. 2020;143(4):1099-1105.

6\.	Gillentine MA, Wang T, Eichler EE. Estimating the prevalence of DE Novo monogenic neurodevelopmental disorders from large cohort studies. *Biomedicines*. 2022;10(11):2865.

7\.	Samocha KE, Robinson EB, Sanders SJ, et al. A framework for the interpretation of de novo mutation in human disease. *Nat Genet*. 2014;46(9):944-950.

8\.	Guez J, Goodrich JK, Moldovan MA, et al. Integrating 730,947 exome sequences with clinical literature improves gene discovery. *medRxiv*. Published online March 25, 2026\. doi:[10.64898/2026.03.23.26349081](http://dx.doi.org/10.64898/2026.03.23.26349081)

9\.	Niroula A, Sekar A, Murakami MA, et al. Distinction of lymphoid and myeloid clonal hematopoiesis. *Nat Med*. 2021;27(11):1921-1927.

10\.	Jaiswal S, Fontanillas P, Flannick J, et al. Age-related clonal hematopoiesis associated with adverse outcomes. *N Engl J Med*. 2014;371(26):2488-2498.

11\.	Seplyarskiy V, Moldovan MA, Koch E, et al. Hotspots of human mutation point to clonal expansions in spermatogonia. *Nature*. 2025;647(8089):429-435.

12\.	Gerasimavicius L, Livesey BJ, Marsh JA. Loss-of-function, gain-of-function and dominant-negative mutations have profoundly different effects on protein structure. *Nat Commun*. 2022;13(1):3895.

13\.	Long X, Xue H. Genetic-variant hotspots and hotspot clusters in the human genome facilitating adaptation while increasing instability. *Hum Genomics*. 2021;15(1):19.
