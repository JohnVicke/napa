import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactNode;
  endContent?: React.ReactNode;
  containerSize?: "sm" | "md" | "lg";
  name: string;
  label?: string;
};

export const TextInput = ({
  startIcon,
  endContent,
  label,
  size,
  containerSize = "md",
  name,
  ...props
}: InputProps) => {
  const [hideEndContent, setHideEndContent] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="form-control relative w-full">
      {label && <label className="label">{label}</label>}
      <div className="absolute top-[50%] translate-y-[-50%] left-2 gap-1">
        {startIcon}
      </div>
      <input
        {...props}
        id={name}
        ref={inputRef}
        onFocus={() => setHideEndContent(true)}
        onBlur={() => {
          if (inputRef.current?.value && inputRef.current?.value.length > 0) {
            setHideEndContent(false);
          }
        }}
        className={`input input-${containerSize} input-bordered w-full 
        ${!!startIcon ? "pl-8" : "pl-4"}`}
      />
      {!hideEndContent && (
        <div className="absolute top-[50%] translate-y-[-50%] right-2 gap-1 hidden lg:flex">
          {endContent}
        </div>
      )}
    </div>
  );
};
