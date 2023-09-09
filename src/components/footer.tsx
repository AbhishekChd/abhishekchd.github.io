import React from "react";
import SocialLink from "./social-link";
import * as Icon from "react-feather";

const Footer = () => {
  return (
    <>
      <footer className="min-w-full flex justify-between items-center flex-col lg:flex-row">
        <div className="m-12 headline">
          Designed & built by Abhishek Chaudhary 🔥
        </div>
        <div className="m-12 headline flex items-center">
          <SocialLink
            title="GitHub"
            url="https://github.com/AbhishekChd"
            linkClasses="flex gap-1"
            icon={<Icon.GitHub className="social-icon" />}
            iconSpanClasses="mt-1"
          />

          <span className="m-3">/</span>

          <SocialLink
            title="LinkedIn"
            url="https://www.linkedin.com/in/abhishek-chd/"
            linkClasses="flex gap-1"
            icon={
              <Icon.Linkedin
                fill={"var(--footer-text)"}
                color="transparent"
                className="social-icon"
              />
            }
            iconSpanClasses="mt-1"
          />

          <span className="m-3">/</span>

          <SocialLink
            title="Medium"
            url="https://medium.com/@abhishekchd"
            linkClasses="flex gap-1"
            icon={<Icon.Rss className="social-icon" />}
            iconSpanClasses="mt-1 "
          />

          <span className="m-3">/</span>

          <SocialLink
            title="Email"
            url="mailto:abhishek.chaudhary.in@gmail.com?subject=Connect from Portfolio!"
            linkClasses="flex gap-1"
            icon={<Icon.Mail className="social-icon" />}
            iconSpanClasses="mt-1"
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
