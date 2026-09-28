import type { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemarkFrontmatter implements Node {
      title: String!
      url: String!
      description: String
      provider: String
      date: String
      tags: [String]
      featuredImage: String
      type: String!
    }
  `;

  createTypes(typeDefs);
}; 