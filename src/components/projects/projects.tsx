import React from "react";
import Project, { ProjectItem } from "./project-item";
import { graphql, useStaticQuery } from "gatsby";

type ProjectNode = {
  html: string;
  frontmatter: {
    title: string;
    url: string;
    tags: string[];
    featuredImage: string;
  };
};

type ProjectsQueryData = {
  allMarkdownRemark: {
    nodes: ProjectNode[];
  };
};

const ProjectsSection = () => {
  const queryResult: ProjectsQueryData = useStaticQuery(query);
  const projects: ProjectItem[] = queryResult.allMarkdownRemark.nodes.map(
    (node: ProjectNode) => {
      const project: ProjectItem = {
        title: node.frontmatter.title,
        url: node.frontmatter.url,
        description: node.html,
        image: `/images/projects/${node.frontmatter.featuredImage}`,
        tags: node.frontmatter.tags,
      };
      return project;
    }
  );

  return (
    <>
      <section className="min-h-screen">
        <h2 className="mb-6 md:mb-12 lg:mb-16">🚀 Projects</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project: ProjectItem) => {
            return (
              <Project
                key={project.title}
                title={project.title}
                url={project.url}
                description={project.description}
                image={project.image}
                tags={project.tags}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;

const query = graphql`
  query ProjectsData {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "project" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          url
          tags
          featuredImage
        }
        html
      }
    }
  }
`;
