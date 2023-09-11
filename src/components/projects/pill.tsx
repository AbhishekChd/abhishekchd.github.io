import React from "react";

const Pill = ({ label, filled }: { label: string; filled?: boolean }) => {
  return (
    <>
      {filled ? (
        <span className="px-3 py-1 rounded-full text-sm leading-5 tag-pill">
          {label}
        </span>
      ) : (
        <span className="outline outline-2 px-3 py-0.5 rounded-full text-sm">
          {label}
        </span>
      )}
    </>
  );
};

export default Pill;
