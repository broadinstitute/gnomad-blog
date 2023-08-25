---
title: Change gene search results sorting
date: "2023-07-10"
order: 1
---

Previously, when a user searched for a gene, a gene that had an alternate symbol that closely matched the search term could appear first in the list of suggested gene symbols. This led to confusing behavior and the need to pay close attention to which results the search bar returned.

Now, any gene with a canonical symbol that matches the search term is prioritized in the list of search results. This results in an overall more intuitive user experience when searching for genes by symbol.

As an example, the search term ABCD previously would result in the gene CX3CL1 as the first search result, as ABCD-3 is an alternate symbol for CX3CL1. With this change, searching for ABCD now results in ABCD1 as the first search result, as it prioritizes canonical gene symbols.

<!-- end_excerpt -->


