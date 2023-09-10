import React from "react";
import { SocialLink } from "../components";
import * as Icon from "react-feather";
import { Socials } from "../../pages";

const Footer = (data: Socials) => {
  return (
    <>
      <footer className="min-w-full flex justify-between items-center flex-col lg:flex-row">
        <div className="m-12 headline">
          Designed & built by Abhishek Chaudhary 🔥
        </div>
        <div className="m-12 headline flex items-center">
          <SocialLink
            title={data.github.title}
            url={data.github.url}
            linkClasses="flex gap-1"
            icon={<Icon.GitHub className="social-icon" />}
          />

          <span className="m-3">/</span>

          <SocialLink
            title={data.linkedin.title}
            url={data.linkedin.url}
            linkClasses="flex gap-1"
            icon={
              <Icon.Linkedin
                fill={"var(--footer-text)"}
                color="transparent"
                className="social-icon"
              />
            }
          />

          <span className="m-3">/</span>

          <SocialLink
            title="Medium"
            url="https://medium.com/@abhishekchd"
            linkClasses="flex gap-1"
            icon={<Icon.Rss className="social-icon" />}
          />

          <span className="m-3">/</span>

          <SocialLink
            title={data.email.title}
            url={data.email.url}
            linkClasses="flex gap-1"
            icon={<Icon.Mail className="social-icon" />}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
