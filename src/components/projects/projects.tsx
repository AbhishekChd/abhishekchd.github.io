import React from "react";
import Project from "./project-item";
import { graphql, useStaticQuery } from "gatsby";
const ProjectsSection = () => {
  const queryResult = useStaticQuery(query);
  const projects: Project[] = queryResult.allMarkdownRemark.nodes.map(
    (node: any) => {
      const project: Project = node.frontmatter;
      project.description = node.html;
      project.image =
        node.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData;
      return project;
    }
  );

  return (
    <>
      <section className="min-h-screen">
        <h2 className="mb-6 md:mb-12 lg:mb-16">💪 Things I've built</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project: Project) => {
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
          date
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 150, placeholder: BLURRED, quality: 80)
            }
          }
        }
        html
      }
    }
  }
`;
