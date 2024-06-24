import CMS from "decap-cms-app";
import React from "react";

// Imported styles are automatically applied to the editor preview as if they had been registered with `registerPreviewStyle`.
// https://www.gatsbyjs.com/plugins/gatsby-plugin-decap-cms/#modulepath
import "./styles/global.css";

import BlogPost from "./components/blog-post";

const dateFormatter = new Intl.DateTimeFormat([], { dateStyle: "long" });

// Dates in ClinVar date are formatted YYYY-MM-DD
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return dateFormatter.format(date);
};

// https://www.netlifycms.org/docs/customization/#registerpreviewtemplate
/* eslint-disable react/prop-types */
/* eslint-disable-next-line no-unused-vars */
const PostPreview = ({ entry, widgetFor, widgetsFor, getAsset, document, window }) => {
  const data = entry.get("data").remove("body").toJS();
  const postMedata = {
    ...data,
    date: data.date ? formatDate(data.date) : null,
  };
  return <BlogPost postMetadata={postMedata}>{widgetFor("body")}</BlogPost>;
};

CMS.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewTemplate("changelog", PostPreview);
