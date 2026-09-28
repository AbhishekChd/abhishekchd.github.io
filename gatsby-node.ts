import type { GatsbyNode } from "gatsby";
import path from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type ProjectLayoutItem {
      badge: String
      title: String
      description: String
      image: String
      highlights: [String]
    }

    type ProjectChallengeItem {
      badge: String
      title: String
      highlights: [String]
    }

    type MarkdownRemarkFrontmatter {
      title: String
      subtitle: String
      url: String
      slug: String
      description: String
      date: String
      tags: [String]
      featuredImage: String
      type: String
      isPrivate: Boolean
      badge: String
      video: String
      videoPoster: String
      videoCaption: String
      screenshots: [String]
      features: [String]
      status: String
      show: Boolean
      layouts: [ProjectLayoutItem]
      challenges: [ProjectChallengeItem]
    }
  `;

  createTypes(typeDefs);
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const projectTemplate = path.resolve("./src/templates/project-case-study.tsx");

  const result = await graphql<{
    allMarkdownRemark: {
      nodes: Array<{
        id: string;
        frontmatter?: {
          slug?: string | null;
        } | null;
      }>;
    };
  }>(`
    query CaseStudyPages {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            type: { eq: "project" }
            slug: { ne: null }
          }
        }
      ) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading project case study markdown files", result.errors);
    return;
  }

  const projects = result.data?.allMarkdownRemark.nodes || [];

  projects.forEach((node) => {
    if (node.frontmatter?.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: projectTemplate,
        context: {
          id: node.id,
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};