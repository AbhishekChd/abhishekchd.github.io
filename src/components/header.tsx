import React from "react";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import * as Icon from "react-feather";

const Header = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <nav className="flex h-16 justify-end">
        <div className="flex self-center mx-6 sm:mx-6 lg:mx-10 align-middle">
          <div className="mx-4">
            <Icon.Moon size={24} color="gray" fill="gray" />
          </div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <div className="mx-4">
            <Icon.Sun size={24} color="gray" fill="gray" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
