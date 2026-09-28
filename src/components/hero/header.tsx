import React from "react";
import { Link } from "gatsby";
import { Switch } from "@headlessui/react";
import * as Icon from "react-feather";

export interface HeaderProps {
  actionLeft?: React.ReactNode;
  backTo?: {
    to: string;
    label: string;
  };
}

const Header: React.FC<HeaderProps> = ({ actionLeft, backTo }) => {
  const [isDark, setIsDark] = React.useState(isDefaultThemeDark());
  const lightColor = !isDark
    ? "var(--color-primary)"
    : "var(--color-text-muted)";
  const darkColor = isDark ? "var(--color-primary)" : "var(--color-text-muted)";

  const windowGlobal = typeof window !== "undefined" && window;

  React.useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      (windowGlobal as Window).localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      (windowGlobal as Window).localStorage.removeItem("theme");
    }
  }, [isDark]);

  function isDefaultThemeDark(): boolean {
    const windowGlobal = typeof window !== "undefined" && window;
    const savedTheme = (windowGlobal as Window)?.localStorage?.getItem("theme");
    return savedTheme == "dark";
  }

  const hasLeftAction = Boolean(actionLeft || backTo);

  return (
    <>
      <nav
        className={`flex h-16 ${
          hasLeftAction ? "justify-between" : "justify-end"
        } mt-3`}
      >
        {hasLeftAction ? (
          <div className="flex self-center mx-2 sm:mx-4 lg:mx-10">
            {backTo ? (
              <Link
                to={backTo.to}
                className="inline-flex items-center text-base sm:text-lg font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors group gap-3.5"
              >
                <Icon.ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>{backTo.label}</span>
              </Link>
            ) : (
              actionLeft
            )}
          </div>
        ) : null}

        <div className="flex self-center mx-2 sm:mx-4 lg:mx-10 align-middle">
          <div className="mx-4">
            <Icon.Sun size={29} color={lightColor} fill={lightColor} />
          </div>
          <Switch
            checked={isDark}
            onChange={setIsDark}
            className={`relative inline-flex h-8 w-14 items-center rounded-full switch-background`}
          >
            <span className="sr-only">Switch page theme</span>
            <span
              className={`translate-x-1 dark:translate-x-8 inline-block h-5 w-5 transform rounded-full bg-white transition`}
            />
          </Switch>
          <div className="mx-4">
            <Icon.Moon size={29} color={darkColor} fill={darkColor} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
