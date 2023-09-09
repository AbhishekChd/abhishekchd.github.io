import * as React from "react";
import { graphql, useStaticQuery, type HeadFC, type PageProps } from "gatsby";
import Header from "../components/header";
import Hero from "../components/hero";
import AboutMe from "../components/about-me";
import Work from "../components/work";
import Footer from "../components/footer";
import ScrollToTop from "../components/scroll-to-top";

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

export const Head: HeadFC = () => <title>Portfolio | Abhishek Chaudhary</title>;

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
