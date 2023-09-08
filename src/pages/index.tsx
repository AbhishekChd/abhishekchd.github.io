import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import Header from "../components/header";
import Hero from "../components/hero";
import AboutMe from "../components/about-me";


const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe/>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
