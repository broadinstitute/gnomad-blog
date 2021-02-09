import CMS from "netlify-cms-app";
import React from "react";

// Imported styles are automatically applied to the editor preview as if they had been registered with `registerPreviewStyle`.
// https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/#modulepath
import "./styles/global.css";

// https://www.netlifycms.org/docs/customization/#registerpreviewtemplate
/* eslint-disable react/prop-types */
/* eslint-disable-next-line no-unused-vars */
const PostPreview = ({ entry, widgetFor, widgetsFor, getAsset, document, window }) => {
  return (
    <article className="article">
      <header className="article-header">
        <h1 className="article-title">{entry.getIn(["data", "title"])}</h1>
      </header>

      <section className="article-body">{widgetFor("body")}</section>
    </article>
  );
};

CMS.registerPreviewTemplate("posts", PostPreview);
