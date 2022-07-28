import Link from "next/link";
import React from "react";

interface SideMenuItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export const SideMenuItem = ({ title, href, icon }: SideMenuItemProps) => (
  <Link href={href}>
    <div className="flex hover:bg-base-200 px-4 py-2 transition-all cursor-pointer select-none">
      {icon}
      <p className="font-bold">{title}</p>
    </div>
  </Link>
);
