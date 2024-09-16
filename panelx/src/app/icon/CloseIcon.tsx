import { IconProps } from "../types/icon";

const CloseIcon = ({ className, size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 0.9 0.9"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <path
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.08"
        d="M0.45 0.45 0.263 0.263m0.188 0.188 0.188 0.188m-0.188 -0.188 0.188 -0.188m-0.188 0.188 -0.188 0.188"
      />
    </svg>
  );
};

export default CloseIcon;
