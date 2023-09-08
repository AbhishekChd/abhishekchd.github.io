import React from "react";
import * as Icon from "react-feather";

const Hero = () => {
  const styles = {
    headerAccent: {
      color: "var(--color-primary)",
    },
    connectLinksClasses:
      "transition-all duration-150 ease-in-out underline underline-offset-8 hover:underline-offset-[14px]",
    emailLinkClasses:
      "transition-all duration-150 ease-in-out underline underline-offset-8 hover:underline-offset-[16px] decoration-8 decoration-[#6861b8]",
  };

  return (
    <>
      <section className="mx-2 md:mx-12 lg:mx-24 flex flex-col justify-around">
        <h1>
          Hello! 👋
          <br />
          <br />
          I'm <b>Abhishek Chaudhary.</b>
          <br />
          <span style={styles.headerAccent}>
            I design & build scalable systems.
          </span>
        </h1>
        <div className="space-y-28">
          <h3>
            Get in touch 👉 <span className="m-3"></span>
            <span className={styles.emailLinkClasses}>
              <a
                href="mailto:abhishek.chaudhary.in@gmail.com?subject=Connect from Portfolio!"
                target="_blank"
              >
                abhishek.chaudhary.in@gmail.com
              </a>
            </span>
          </h3>

          <h4 className="py-8 flex items-center">
            <div className={styles.connectLinksClasses}>
              <a
                href="https://github.com/AbhishekChd"
                target="_blank"
                className="flex gap-3"
              >
                <span className="mt-2">
                  <Icon.GitHub />
                </span>
                <span>GitHub</span>
              </a>
            </div>

            <span className="m-3">/</span>

            <div className={styles.connectLinksClasses}>
              <a
                href="https://www.linkedin.com/in/abhishek-chd/"
                target="_blank"
                className="flex gap-3"
              >
                <span className="mt-1">
                  <Icon.Linkedin
                    fill={"var(--color-text)"}
                    color="transparent"
                  />
                </span>
                <span>LinkedIn</span>
              </a>
            </div>

            <span className="m-3">/</span>

            <div className={styles.connectLinksClasses}>
              <a
                href="https://drive.google.com/open?id=1F1TUqgsMxODNsPw83IuSw-DAvnNAHXCp"
                target="_blank"
                className="flex gap-3"
              >
                <span className="mt-2">
                  <Icon.DownloadCloud />
                </span>
                <span>Resume</span>
              </a>
            </div>
          </h4>
        </div>
      </section>
    </>
  );
};

export default Hero;
