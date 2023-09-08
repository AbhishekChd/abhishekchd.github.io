import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import Header from "../components/header";
import Hero from "../components/hero";
import AboutMe from "../components/about-me";
import Work from "../components/work";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <Work />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
