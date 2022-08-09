import React from "react";
import { SideMenuItems } from "./SideMenuItems";

export const SideMenu = () => (
  <div className="border-r-2 border-base-200 h-screen fixed pt-24 w-52 avoid-nav h- left-0 hidden lg:flex">
    <SideMenuItems />
  </div>
);
