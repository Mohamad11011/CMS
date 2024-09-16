import { cn } from "@/app/helper/cn";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  icon?: React.ComponentType;
  children: React.ReactNode;
  className?: string;
  todo?:any
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, children, className,todo }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-1.5",
        "rounded bg-primary px-3 py-2.5 text-center font-medium text-white hover:bg-opacity-85 cursor-pointer fill-white",
        className
      )}
      onClick={todo && todo}
    >
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      {children}
    </div>
  );
};

export default Button;
