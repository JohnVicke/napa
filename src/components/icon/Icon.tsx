import React from "react";
import { icons } from "./icons";

interface IconProps {
  icon: typeof icons[number];
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2x" | "3x";
  className?: string;
}

export const Icon = ({ icon, className, size = "lg" }: IconProps) => (
  <i className={`${icon} ${`ri-${size}`} ${className}`} />
);
