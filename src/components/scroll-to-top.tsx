import React from "react";

const ScrollToTop = () => {
  const [show, setShow] = React.useState(false);
  const windowGlobal = typeof window !== "undefined" && window;

  const handleScroll = () => {
    setShow(
      (windowGlobal as Window).scrollY >
        (windowGlobal as Window).outerHeight / 2
    );
  };

  React.useEffect(() => {
    (windowGlobal as Window).addEventListener(`scroll`, handleScroll);
    return () =>
      (windowGlobal as Window).removeEventListener(`scroll`, handleScroll);
  });

  const scrollUp = () => {
    (windowGlobal as Window)[`scrollTo`]({ top: 0, behavior: `smooth` });
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
