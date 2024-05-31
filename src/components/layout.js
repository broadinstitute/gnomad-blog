import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import Header from "./header";

const Link = styled.a`
  color: #1173bb;
  text-decoration: none;
  &:visited,
  &:active {
    color: #1173bb;
  }
  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled(Link).attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  /* stylelint-ignore-line block-no-empty */
`;

const TopBarWrapper = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.23);

  @media print {
    display: none;
  }
`;

const Banner = styled.div`
  padding: 0.75em 0.5em;
  background: rgb(17, 115, 187);
  color: #fff;
  text-align: center;

  a {
    color: #8ac8f4 !important;
    text-decoration: underline;
  }
`;

const BANNER_CONTENT = (
  <>
    Help us continue to improve gnomAD by taking 5 minutes to fill out our {/* @ts-expect-error */}
    <ExternalLink href="http://broad.io/2024_survey">user survey</ExternalLink>.
  </>
);

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
        <meta
          name="description"
          content="The Genome Aggregation Database (gnomAD) is a resource developed by an international coalition of investigators, with the goal of aggregating and harmonizing both exome and genome sequencing data from a wide variety of large-scale sequencing projects, and making summary data available for the wider scientific community."
        />
      </Helmet>
      <TopBarWrapper>
        <Header siteTitle={site.siteMetadata.title} />
        {BANNER_CONTENT && <Banner>{BANNER_CONTENT}</Banner>}
      </TopBarWrapper>

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
