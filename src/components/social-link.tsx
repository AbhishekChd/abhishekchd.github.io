import React, { ReactNode } from "react";
import { Icon, GitHub } from "react-feather";

const SocialLink = (data: SocialLinkData) => {
  const hasIcon: boolean = data.icon != undefined;
  const icon = data.icon;
  return (
    <>
      <div className="social-link">
        <a href={data.url} target="_blank" className={data.linkClasses}>
          {hasIcon ? (
            <span className={data.iconSpanClasses}>{icon}</span>
          ) : (
            <span />
          )}
          <span>{data.title}</span>
        </a>
      </div>
    </>
  );
};

export default SocialLink;

export type SocialLinkData = {
  title: string;
  url: string;
  linkClasses?: string;
  iconSpanClasses?: string;
  icon?: ReactNode;
};
