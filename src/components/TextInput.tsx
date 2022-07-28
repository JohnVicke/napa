import React from "react";

const topPaddingMap = new Map([
  ["sm", 1],
  ["md", 3],
  ["lg", 8],
]);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endContent?: React.ReactNode;
  containerSize?: "sm" | "md" | "lg";
}

export const TextInput = ({
  startIcon,
  endContent,
  containerSize = "md",
  ...props
}: InputProps) => {
  const paddingTop = topPaddingMap.get(containerSize);
  console.log(paddingTop);
  return (
    <div className="relative">
      <div className="absolute top-[50%] translate-y-[-50%] left-2 gap-1 hidden lg:flex">
        {startIcon}
      </div>
      <input
        {...props}
        className={`input input-${containerSize} pl-${
          !!startIcon ? 8 : 4
        } input-bordered w-64 hidden lg:block`}
      />
      <div className="absolute top-[50%] translate-y-[-50%] right-2 gap-1 hidden lg:flex">
        {endContent}
      </div>
    </div>
  );
};
