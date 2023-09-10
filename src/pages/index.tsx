import * as React from "react";
import { graphql, useStaticQuery, type HeadFC, type PageProps } from "gatsby";
import {
  Hero,
  Header,
  AboutMe,
  Work,
  Footer,
  ScrollToTop,
  SEO,
} from "../components/components";

const IndexPage: React.FC<PageProps> = () => {
  const queryResult = useStaticQuery(query);
  const socials: Socials = queryResult.site.siteMetadata.socials;

  return (
    <>
      <Header />
      <Hero
        email={socials.email}
        github={socials.github}
        linkedin={socials.linkedin}
        resume={socials.resume}
      />
      <AboutMe />
      <Work />
      <Footer
        email={socials.email}
        github={socials.github}
        linkedin={socials.linkedin}
        resume={socials.resume}
      />
      <ScrollToTop />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;

export type Socials = {
  github: SocialData;
  linkedin: SocialData;
  email: SocialData;
  resume: SocialData;
};
export type SocialData = { title: string; username: string; url: string };

const query = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        socials {
          github {
            title
            url
            username
          }
          linkedin {
            title
            url
            username
          }
          github {
            title
            url
            username
          }
          resume {
            title
            url
            username
          }
          email {
            title
            url
            username
          }
        }
      }
    }
  }
`;
