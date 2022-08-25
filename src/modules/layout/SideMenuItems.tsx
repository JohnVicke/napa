import { Icon } from "@/components/icon/Icon";
import { useRouter } from "next/router";
import React from "react";
import { SideMenuItem } from "./SideMenuItem";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Icon icon="ri-dashboard-fill" />,
  },
  {
    title: "Track time",
    href: "/track-time",
    icon: <Icon icon="ri-time-fill" />,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: <Icon icon="ri-list-check-2" />,
  },
];

export const SideMenuItems = () => {
  const router = useRouter();
  return (
    <ul className="w-full">
      {items.map((item) => (
        <li key={item.title} className="py-[0.1rem]">
          <SideMenuItem
            {...item}
            active={router.pathname.startsWith(item.href)}
          />
        </li>
      ))}
    </ul>
  );
};
