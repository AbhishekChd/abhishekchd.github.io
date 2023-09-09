import { graphql, useStaticQuery } from "gatsby";
import React from "react";

const Work = () => {
  const queryResult = useStaticQuery(query);

  const jobs: Job[] = queryResult.allMarkdownRemark.nodes;

  return (
    <>
      <section className="flex flex-col" id="job-section">
        <h2 className="mb-6 md:mb-12 lg:mb-16">👨🏻‍💻 Where I've worked</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12 md:gap-x-1 lg:gap-x-8">
          {jobs.map((job: Job) => {
            return (
              <React.Fragment key={job.id}>
                <div className="work-date md:col-span-2 lg:col-span-3 text-start md:text-center lg:text-right mt-2 lg:mt-3">
                  {job.frontmatter.start} - {job.frontmatter.end}
                </div>
                <div className="mb-12 md:col-span-5  lg:col-span-9">
                  <h3>
                    <b>{job.frontmatter.title}</b>
                  </h3>
                  <h4>{job.frontmatter.company}</h4>
                  <h5>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: job.frontmatter.location,
                      }}
                    ></span>
                  </h5>
                  <span dangerouslySetInnerHTML={{ __html: job.html }} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Work;

const query = graphql`
query WorkData {
  allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "work"}, show: {ne: false}}}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      id
      frontmatter {
        company
        end
        start
        title
        location
      }
      html
    }
  }
}`;

type Job = { id: string; html: string; frontmatter: JobData };
type JobData = {
  title: string;
  start: string;
  end: string;
  company: string;
  location: string;
};
