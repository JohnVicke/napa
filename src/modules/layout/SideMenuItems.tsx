import React from "react";
import { SideMenuItem } from "./SideMenuItem";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <i className="ri-dashboard-fill mr-2" />,
  },
];

export const SideMenuItems = () => (
  <ul>
    {items.map((item) => (
      <li key={item.title}>
        <SideMenuItem {...item} />
      </li>
    ))}
  </ul>
);
