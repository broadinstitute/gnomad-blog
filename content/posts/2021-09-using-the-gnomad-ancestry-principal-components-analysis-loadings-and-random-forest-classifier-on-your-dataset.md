---
title: Using the gnomAD ancestry principal components analysis loadings and
  random forest classifier on your dataset
date: 2021-09-27
order: 1
authors:
  - Julia Goodrich
  - gnomAD Production Team
---
By popular request, we are now releasing the ancestry principal components analysis (PCA) variant loadings and accompanying random forest (RF) model used for global ancestry inference in gnomAD [v2](https://gnomad.broadinstitute.org/downloads#v2-ancestry-classification) and [v3](https://gnomad.broadinstitute.org/downloads#v3-ancestry-classification). This post discusses how those files were [generated](#how-the-pca-loadings-and-rf-model-were-generated) and how they can be [used](#how-to-use-the-loadings-and-rf-model-on-your-own-dataset) on another dataset. However, **the use of these resources will not be appropriate for all datasets**, and therefore we are including a discussion of the [caveats](#important-caveats-to-consider) associated with using these loadings and the RF model.
<!-- end_excerpt -->
### How the PCA loadings and RF model were generated

Details on ancestry assignment are available in the blog posts for gnomAD [v2](https://gnomad.broadinstitute.org/news/2018-10-gnomad-v2-1/#global-ancestry-assignment) and [v3](https://gnomad.broadinstitute.org/news/2020-10-gnomad-v3-1-new-content-methods-annotations-and-data-availability/#ancestry-inference). We first run PCA on all unrelated (less than second-degree inferred relatedness) samples using the [hwe_normalized_pca](https://hail.is/docs/0.2/methods/genetics.html#hail.methods.hwe_normalized_pca) Hail function on high-quality, bi-allelic, autosomal single nucleotide variants, followed by [projection](https://hail.is/docs/0.2/experimental/index.html#hail.experimental.pc_project) of the related samples onto these principal components (PCs). Then we [train](https://broadinstitute.github.io/gnomad_methods/api_reference/sample_qc/ancestry.html#gnomad.sample_qc.ancestry.assign_population_pcs) a RF classifier using global ancestry relevant PCs as features on samples with "known" (see caveats below) ancestry and infer ancestry for all samples using this RF.

### How to use the loadings and RF model on your own dataset

The loadings and RF model can be used for ancestry assignment on another dataset by first projecting the dataset’s genotypes onto pre-computed PCs, which can be done using Hail’s [pc_project](https://hail.is/docs/0.2/experimental/index.html#hail.experimental.pc_project) module with the gnomAD loadings. Following this projection, ancestry assignments can be made using the RF model and the projected PC scores -- for example, by supplying the [gnomAD Hail utilities](https://pypi.org/project/gnomad/) [assign_population_pcs](https://broadinstitute.github.io/gnomad_methods/api_reference/sample_qc/ancestry.html?highlight=assign_population_pcs#gnomad.sample_qc.ancestry.assign_population_pcs) function with the gnomAD RF model as the \`fit\` parameter. 

#### Example code:
```python
import pickle
import hail as hl
from gnomad.sample_qc.ancestry import assign_population_pcs

# Load MatrixTable for projection and gnomAD loadings Hail Table
# Reading the v2 loadings requires Hail version 0.2.70 or earlier
mt_to_project = hl.read_matrix_table(path_to_matrix_table)
loadings_ht = hl.read_table(path_to_gnomad_loadings)

# Project new genotypes onto loadings
ht = hl.experimental.pc_project(
    mt_to_project.GT,
    loadings_ht.loadings,
    loadings_ht.pca_af,
)

# Assign global ancestry using the gnomAD RF model and PC project scores
# Loading of the v2 RF model requires an older version of scikit-learn, this can be installed using pip install -U scikit-learn==0.21.3
with hl.hadoop_open(path_to_gnomad_rf, "rb") as f:
    fit = pickle.load(f)

# Reduce the scores to only those used in the RF model, this was 6 for v2 and 16 for v3.1
num_pcs = fit.n_features_
ht = ht.annotate(scores=ht.scores[:num_pcs])
ht, rf_model = assign_population_pcs(
    ht,
    pc_cols=ht.scores,
    fit=fit,
)

# The returned Hail Table includes the imputed population labels and RF probabilities for each gnomAD global population
```

### Important caveats to consider

* The variants used for ancestry inference in gnomAD were chosen based on our specific dataset (these were the variant choices for [v2](https://gnomad.broadinstitute.org/news/2018-10-gnomad-v2-1/#3-relatedness-filtering) and [v3](https://gnomad.broadinstitute.org/news/2019-10-gnomad-v3-0/#defining-a-high-quality-set-of-sites-for-qc)). This does not mean that these variants are always the ideal variants for determining ancestry, and **caution should be taken before deciding to use these loadings and ancestry inference RF model** on your own dataset.

* The RF model is trained using gnomAD samples that have a global ancestry label associated with them within gnomAD’s available metadata. This “known” global ancestry label is compiled by many different gnomAD [Principal Investigators](https://gnomad.broadinstitute.org/about) for various projects, so there is no guarantee that they were collected in the same way (e.g. some of these are self-reported labels or provider-reported labels and others are not). Therefore, **if you have a dataset with a subset of reliable and consistent ancestry labels, it may be best for you to use those ancestry labels to build a RF model** from your dataset as we did for gnomAD. It might also be useful to run the projection onto gnomAD PC space and compare how the two RF models perform on a withheld subset of samples with “known” ancestry labels.

* **If your dataset is missing large numbers of the variants with gnomAD PCA loadings, it will produce unreliable results.** When projecting your dataset into the gnomAD ancestry PC space, this can cause the projected samples to have scores that shrink toward 0. This shrinkage can result in problems when those projected PCs are then used in the RF model for ancestry inference.

* When using the gnomAD loadings and RF model on a dataset that includes ancestries that are not well represented (or not represented at all) in gnomAD, **the RF model will likely mis-classify samples from those ancestries that are underrepresented or missing from gnomAD**. This is likely to particularly affect samples from regions that are very poorly sampled in gnomAD, such as Oceania, South-East Asia, the Middle East, and Africa, but will also affect other groups.

* The workflow described [above](#how-the-pca-loadings-and-rf-model-were-generated) will always return ancestry inference results, but **it is difficult to determine if the gnomAD RF model is actually doing an adequate job on ancestry inference in your specific dataset.** When we run this RF model for the gnomAD ancestry assignment, we can explicitly measure performance by holding back a certain percentage of samples with known ancestry labels from the training set and use them to evaluate the RF model classification.

### Use of the HGDP + 1KG subset to build a custom RF
As an alternate option to directly using the gnomAD loadings and RF model, a custom RF model can be designed by combining a dataset with the [HGDP + 1KG subset](https://gnomad.broadinstitute.org/downloads#v3-hgdp-1kg). After combining the two datasets, either new variants can be chosen for an ancestry [PCA](https://broadinstitute.github.io/gnomad_methods/api_reference/sample_qc/ancestry.html?highlight=run_pca_with_relateds#gnomad.sample_qc.ancestry.run_pca_with_relateds) (limiting to high call rate within the reference panel and one’s own dataset, thereby avoiding the shrinkage problem), or the [PC projection](https://hail.is/docs/0.2/experimental/index.html#hail.experimental.pc_project) described above can be used, but with the same caveats associated with using the gnomAD loadings. An RF model can then be trained using the HGDP + 1KG known global ancestry labels, and applied to the samples to obtain global ancestry assignments using [gnomAD Hail utilities](https://pypi.org/project/gnomad/) [assign_population_pcs](https://broadinstitute.github.io/gnomad_methods/api_reference/sample_qc/ancestry.html?highlight=assign_population_pcs#gnomad.sample_qc.ancestry.assign_population_pcs) with no \`fit\` parameter and the HGDP + 1KG known ancestry supplied as the \`known_col\` parameter. When training a new RF model on the known labels, you can measure performance by holding back labeled samples in the training and assessing accuracy on the set that is withheld (using the \`prop_train\` parameter in [assign_population_pcs](https://broadinstitute.github.io/gnomad_methods/api_reference/sample_qc/ancestry.html?highlight=assign_population_pcs#gnomad.sample_qc.ancestry.assign_population_pcs)). **Note that this method will still only work for classifying ancestries that are well represented by the HGDP + 1KG subset, and this subset is also only available for the GRCh38 reference genome.**
