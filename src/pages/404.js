import { Link } from "gatsby";
import React from "react";

import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout title="Page not found">
      <article className="article">
        <header className="article-header">
          <h1 className="article-title">Page not found</h1>
        </header>

        <section className="article-body">
          <p>This page doesn&apos;t exist.</p>
          <p>
            <Link to="/">Return to home page.</Link>
          </p>
        </section>
      </article>
    </Layout>
  );
};

export default NotFoundPage;
