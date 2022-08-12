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
      } cursor-pointer select-none px-4 py-2 transition-all hover:bg-base-200`}
    >
      {icon}
      <div className="mr-2" />
      <p className="font-bold">{title}</p>
    </button>
  </Link>
);
