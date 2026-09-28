import React from "react";
import { graphql, Link, HeadFC, PageProps } from "gatsby";
import { Header, Footer, ScrollToTop, ThumbnailImage, VideoPlayer, SEO } from "../components/components";
import * as Icon from "react-feather";

export interface LayoutItem {
  badge: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ChallengeItem {
  badge: string;
  title: string;
  highlights: string[];
}

type ProjectCaseStudyData = {
  markdownRemark: {
    frontmatter: {
      title: string;
      subtitle?: string;
      url?: string;
      slug?: string;
      description?: string;
      date?: string;
      tags?: string[];
      featuredImage?: string;
      isPrivate?: boolean;
      badge?: string;
      video?: string;
      videoPoster?: string;
      videoCaption?: string;
      layouts?: LayoutItem[];
      challenges?: ChallengeItem[];
    };
  };
  site: {
    siteMetadata: {
      socials: {
        github: { title: string; username: string; url: string };
        linkedin: { title: string; username: string; url: string };
        email: { title: string; username: string; url: string };
        resume: { title: string; username: string; url: string };
      };
    };
  };
};

const ProjectCaseStudy: React.FC<PageProps<ProjectCaseStudyData>> = ({ data }) => {
  const { markdownRemark, site } = data;
  const { frontmatter } = markdownRemark;

  return (
    <>
      {/* Top Bar with Back button on left and Theme Toggle on right */}
      <Header backTo={{ to: "/#projects", label: "Back to portfolio" }} />

      <main className="mx-2 md:mx-12 lg:mx-24 flex flex-col">
        {/* Hero Landing Section */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 pt-14 sm:pt-20 lg:pt-6 pb-20 lg:pb-32">
          {/* Left: Title & Subtitle */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {frontmatter.isPrivate && (
              <div className="mb-6 lg:mb-8">
                <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base md:text-lg font-medium tracking-wide bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)] border-opacity-25 leading-none">
                  <Icon.Lock size={18} strokeWidth={2.2} className="shrink-0" />
                  <span className="leading-none">{frontmatter.badge || "Private Project"}</span>
                </span>
              </div>
            )}

            <h1>{frontmatter.title}</h1>

            {(frontmatter.subtitle || "") && (
              <h3 className="header-accent mt-3">
                {frontmatter.subtitle}
              </h3>
            )}
          </div>

          {/* Right: Video Player with styled controls, shimmer & modal */}
          {frontmatter.video && (
            <div className="w-full lg:w-1/2 max-w-2xl mx-auto">
              <VideoPlayer
                src={frontmatter.video}
                poster={frontmatter.videoPoster}
                caption={frontmatter.videoCaption || "Demo"}
              />
            </div>
          )}
        </section>

        {/* Blog-style Application Layouts: image on left, content on right with fixed width */}
        {frontmatter.layouts && frontmatter.layouts.length > 0 && (
          <section className="flex flex-col !min-h-0 my-6" id="layouts-section">
            <h2 className="mb-6 md:mb-10">📐 Application Layouts</h2>

            <div className="flex flex-col space-y-12">
              {frontmatter.layouts.map((layout, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-6 lg:gap-10"
                >
                  {/* Left: Image with fixed max width */}
                  {layout.image && (
                    <div className="w-full md:w-[360px] lg:w-[400px] shrink-0">
                      <ThumbnailImage src={layout.image} alt={layout.title} />
                    </div>
                  )}

                  {/* Right: Description & highlights matching Experience section */}
                  <div className="flex-1 min-w-0">
                    {layout.badge && <div className="work-date">{layout.badge}</div>}
                    <h3>
                      <b>{layout.title}</b>
                    </h3>
                    {layout.description && <h5>{layout.description}</h5>}
                    {layout.highlights && layout.highlights.length > 0 && (
                      <ul>
                        {layout.highlights.map((bullet, i) => (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{ __html: bullet }}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering Challenges */}
        {frontmatter.challenges && frontmatter.challenges.length > 0 && (
          <section className="min-h-screen flex flex-col mt-16 md:mt-24 mb-16" id="challenges-section">
            <h2 className="mb-6 md:mb-10">⚡ Engineering Challenges</h2>

            <div className="flex flex-col space-y-12">
              {frontmatter.challenges.map((challenge, index) => (
                <div key={index} className="flex flex-col">
                  {challenge.badge && <div className="work-date">{challenge.badge}</div>}
                  <h3>
                    <b>{challenge.title}</b>
                  </h3>
                  {challenge.highlights && challenge.highlights.length > 0 && (
                    <ul>
                      {challenge.highlights.map((bullet, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{ __html: bullet }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer
        email={site.siteMetadata.socials.email}
        github={site.siteMetadata.socials.github}
        linkedin={site.siteMetadata.socials.linkedin}
        resume={site.siteMetadata.socials.resume}
      />
      <ScrollToTop />
    </>
  );
};

export default ProjectCaseStudy;

export const Head: HeadFC<ProjectCaseStudyData> = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <SEO
      title={`${frontmatter.title} | Abhishek Chaudhary`}
      description={frontmatter.description || `Case study for ${frontmatter.title}`}
      pathname={frontmatter.slug || ""}
    />
  );
};

export const query = graphql`
  query ProjectCaseStudyById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        url
        slug
        description
        date
        tags
        featuredImage
        isPrivate
        badge
        video
        videoPoster
        videoCaption
        layouts {
          badge
          title
          description
          image
          highlights
        }
        challenges {
          badge
          title
          highlights
        }
      }
    }
    site {
      siteMetadata {
        socials {
          github {
            title
            username
            url
          }
          linkedin {
            title
            username
            url
          }
          email {
            title
            username
            url
          }
          resume {
            title
            username
            url
          }
        }
      }
    }
  }
`;
