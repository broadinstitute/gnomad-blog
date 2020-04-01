import { useStaticQuery, graphql, Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

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
      <header id="header">
        <div className="nav-wrapper">
          <div className="nav-title">
            <Link id="home-link" to="/">
              {site.siteMetadata.title}
            </Link>
          </div>

          <nav>
            <ul className="nav-list">
              <li className="nav-item">
                <a className="nav-link" href="https://gnomad.broadinstitute.org/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://gnomad.broadinstitute.org/downloads">
                  Downloads
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://gnomad.broadinstitute.org/terms">
                  Terms
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://gnomad.broadinstitute.org/publications">
                  Publications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://gnomad.broadinstitute.org/contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://gnomad.broadinstitute.org/faq">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
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
