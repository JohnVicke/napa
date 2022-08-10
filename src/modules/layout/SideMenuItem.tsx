import Link from "next/link";
import React from "react";

interface SideMenuItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active?: boolean;
}

export const SideMenuItem = ({
  title,
  href,
  icon,
  active,
}: SideMenuItemProps) => (
  <Link href={href}>
    <button
      className={`flex w-full ${
        active ? "bg-base-200" : ""
      } hover:bg-base-200 px-4 py-2 transition-all cursor-pointer select-none`}
    >
      {icon}
      <div className="mr-2" />
      <p className="font-bold">{title}</p>
    </button>
  </Link>
);
