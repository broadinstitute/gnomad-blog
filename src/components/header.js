import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Header = ({ siteTitle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <header id="header">
      <h1 className="header-title">
        <Link to="https://gnomad.broadinstitute.org/">{siteTitle}</Link>
      </h1>

      <nav role="navigation">
        <button
          id="nav-toggle"
          type="button"
          aria-expanded={isExpanded}
          aria-controls="nav-list"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <span aria-hidden="true">☰</span>
          <span className="sr-only">Menu</span>
        </button>
        <ul id="nav-list" className={isExpanded ? "expanded" : undefined}>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/team">
              Team
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/federated">
              Federated 
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/stats">
              Stats
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/policies">
              Policies
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/publications">
              Publications
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/changelog">
              Changelog
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/data">
              Data
            </a>
          </li>
          <li className="nav-item">
            <a 
              className="nav-link" 
              href="https://discuss.gnomad.broadinstitute.org/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Forum
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/contact">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://gnomad.broadinstitute.org/help">
              Help/FAQ
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: undefined,
};

export default Header;
