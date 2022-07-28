import React from "react";
import { SideMenuItem } from "./SideMenuItem";

export const SideMenu = () => {
  return (
    <div className="border-r-2 border-base-200 h-screen fixed pt-24 w-52 avoid-nav h- left-0 hidden lg:flex">
      <ul className="w-full">
        <li>
          <SideMenuItem
            title="Dashboard"
            href="/dashboard"
            icon={<i className="ri-dashboard-fill mr-2" />}
          />
        </li>
      </ul>
    </div>
  );
};
