import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import Header from "../components/header";

const IndexPage: React.FC<PageProps> = () => {
  return <Header />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
