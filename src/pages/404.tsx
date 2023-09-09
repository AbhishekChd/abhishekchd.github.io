import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import { SEO } from "../components/seo";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h3 className="font-semibold header-accent">404</h3>
        <h2 className="font-bold tracking-tighter text-gray-900">
          Page not found
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find that. Go to{" "}
          <Link to="/" className="social-link">
            Home Page.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title="Not Found" />;
