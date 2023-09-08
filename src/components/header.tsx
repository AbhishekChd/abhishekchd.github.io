import React from "react";
import { Switch } from "@headlessui/react";
import * as Icon from "react-feather";

const Header = () => {
  const [isDark, setIsDark] = React.useState(isDefaultThemeDark());
  const lightColor = !isDark
    ? "var(--color-primary)"
    : "var(--color-text-muted)";
  const darkColor = isDark ? "var(--color-primary)" : "var(--color-text-muted)";

  React.useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <>
      <nav className="flex h-16 justify-end mt-3">
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
              className={`${
                isDark ? "translate-x-8" : "translate-x-1"
              } inline-block h-5 w-5 transform rounded-full bg-white transition`}
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

function isDefaultThemeDark(): boolean {
  const savedTheme = window.localStorage.getItem("theme");
  return savedTheme ? savedTheme == "dark" : true;
}
