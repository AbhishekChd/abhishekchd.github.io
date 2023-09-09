import React from "react";
import * as Icon from "react-feather";
import SocialLink from "./social-link";
import { Socials } from "../pages";

const Hero = (data: Socials) => {
  return (
    <>
      <section className="mx-2 md:mx-12 lg:mx-24 flex flex-col justify-around">
        <h1>
          Hello! 👋
          <br />
          <br />
          I'm <b>Abhishek Chaudhary.</b>
          <br />
          <span className="header-accent">
            I design & build scalable systems.
          </span>
        </h1>
        <div className="space-y-28">
          <h3>
            Get in touch 👉 <span className="m-3"></span>
            <span className="hero-email-link">
              <a href={data.email.url} target="_blank">
                {data.email.title}
              </a>
            </span>
          </h3>

          <h4 className="py-8 flex items-center">
            <SocialLink
              title={data.github.title}
              url={data.github.url}
              linkClasses="flex gap-3"
              icon={<Icon.GitHub className="social-icon" />}
              iconSpanClasses="mt-2"
            />

            <span className="m-3">/</span>

            <SocialLink
              title={data.linkedin.title}
              url={data.linkedin.url}
              linkClasses="flex gap-3"
              icon={
                <Icon.Linkedin
                  fill={"var(--color-text)"}
                  color="transparent"
                  className="social-icon"
                />
              }
            />

            <span className="m-3">/</span>

            <SocialLink
              title={data.resume.title}
              url={data.resume.url}
              linkClasses="flex gap-3"
              icon={<Icon.DownloadCloud className="social-icon" />}
              iconSpanClasses="mt-2"
            />
          </h4>
        </div>
      </section>
    </>
  );
};

export default Hero;
