import { useRouter } from "next/router";
import React from "react";
import { SideMenuItem } from "./SideMenuItem";

const items = [
  {
    title: "Track time",
    href: "/track-time",
    icon: <i className="ri-time-fill" />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <i className="ri-dashboard-fill" />,
  },
];

export const SideMenuItems = () => {
  const router = useRouter();
  return (
    <ul className="w-full">
      {items.map((item) => (
        <li key={item.title} className="py-[0.1rem]">
          <SideMenuItem {...item} active={router.pathname === item.href} />
        </li>
      ))}
    </ul>
  );
};
