import PropTypes from "prop-types";
import React from "react";

import ArticleMeta from "../components/article-meta";

const BlogPost = ({ children, postMetadata }) => {
  return (
    <article className="article">
      <header className="article-header">
        <h1 className="article-title">{postMetadata.title}</h1>
      </header>
      <ArticleMeta postMetadata={postMetadata} />
      <section className="article-body">{children}</section>
    </article>
  );
};

BlogPost.propTypes = {
  children: PropTypes.node.isRequired,
  postMetadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BlogPost;
