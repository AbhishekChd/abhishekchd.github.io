import React from "react";

const ScrollToTop = () => {
  const [show, setShow] = React.useState(false);

  const handleScroll = () => {
    setShow(window.scrollY > window.outerHeight / 2);
  };

  React.useEffect(() => {
    window.addEventListener(`scroll`, handleScroll);
    return () => window.removeEventListener(`scroll`, handleScroll);
  });

  const scrollUp = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <>
      {
        <div
          className={`fixed bottom-6 right-6 text-4xl hover:bottom-8 p-2 transition-all ease-in-out duration-300 cursor-pointer ${
            show ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollUp}
        >
          ☝️
        </div>
      }
    </>
  );
};

export default ScrollToTop;
