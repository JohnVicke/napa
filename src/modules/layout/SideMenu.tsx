import React from "react";
import { SideMenuItems } from "./SideMenuItems";

export const SideMenu = () => (
  <div className="avoid-nav h- fixed left-0 hidden h-screen w-52 border-r-2 border-base-200 pt-24 lg:flex">
    <SideMenuItems />
  </div>
);
