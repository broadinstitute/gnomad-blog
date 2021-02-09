# Contributing to the gnomAD blog

Login to Netlify CMS at https://gnomad.broadinstitute.org/blog/admin/. To make changes to the blog, you must have write access to the [gnomad-blog GitHub repository](https://github.com/broadinstitute/gnomad-blog)

## Adding a new post

1. Select the "Contents" tab and click the "New Post" button.

2. Set the post's title and publication date. Add authors and categories.

3. Write the body of the post using either the rich text editor or [Markdown](https://www.markdownguide.org/basic-syntax/).

   - Click the "Toggle preview" button at the top right to show a preview of the post.

   - To control what is shown "above the fold" in the list of posts on the home page, use Markdown mode to add a line containing an HTML comment:

      ```html
      <!-- end_excerpt -->
      ```

      Any content after that comment will only be visible by clicking the "Continue reading" link to view the full post.

4. Click the "Save" button to save a draft of the post. Saving a draft opens a pull request on the [gnomad-blog GitHub repository](https://github.com/broadinstitute/gnomad-blog) GitHub with the new post. Further edits can be made in the CMS (the new post will appear in the Drafts column on the Workflow tab). This will add commits to the PR's branch. Alternatively, the branch can be edited on GitHub or pulled and edited locally.

   - When the PR is opened, a preview site containing its changes will automatically be deployed to `https://gnomad.broadinstitute.org/blog/preview/<PR_NUMBER>`. This may take a few minutes. Once it is done, a "View Preview" link will appear in the top bar of the CMS next to the "Set status" and "Publish" buttons. To see progress generating the preview site, look at the PR's status checks on GitHub.

5. When the post is ready, click the "Publish" button in Netlify CMS. This merges the PR. Alternatively, the PR can be merged on GitHub. Changes committed to the `main` branch will automatically be deployed to `https://gnomad.broadinstitute.org/blog/`.

## Images

Currently, all images used in blog posts are uploaded to the `gnomad-blog-assets` storage bucket and referenced from there.

For example,

```html
<figure>
   <img src="https://storage.googleapis.com/gnomad-blog-assets/2017/02/the-genome-aggregation-database/exacv2_barplot_cut.png" />
</figure>
```
