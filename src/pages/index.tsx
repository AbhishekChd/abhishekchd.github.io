import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import Header from "../components/header";
import Hero from "../components/hero";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
