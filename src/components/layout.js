import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

import Header from "./header";

const Layout = ({ children, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{ lang: "en" }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
      >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
      </Helmet>
      <Header siteTitle={site.siteMetadata.title} />
      <main>{children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

Layout.defaultProps = {
  children: undefined,
  title: undefined,
};

export default Layout;
