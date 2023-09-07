import React from "react";

const Hero = () => {
  const styles = {
    headerAccent: {
      color: "var(--color-primary)",
    },
  };

  return (
    <>
      <section className="mx-5 md:mx-12 lg:mx-24 flex flex-col justify-around">
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
          <h3>Get in touch 👉 &nbsp; abhishek.chaudhary.in@gmail.com</h3>

          <h4 className="py-8">Github / LinkedIn / Resume</h4>
        </div>
      </section>
    </>
  );
};

export default Hero;
