import * as React from "react";
import { IconProps } from "../types/icon";
const BackIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 38.4 38.4"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8.4 18h24a1.2 1.2 0 1 1 0 2.4h-24a1.2 1.2 0 0 1 0-2.4" />
    <path d="m8.897 19.2 9.953 9.95a1.2 1.2 0 0 1-1.699 1.699l-10.8-10.8a1.2 1.2 0 0 1 0-1.699l10.8-10.8a1.2 1.2 0 1 1 1.699 1.699z" />
  </svg>
);
export default BackIcon;