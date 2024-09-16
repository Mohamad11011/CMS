import { IconProps } from "../types/icon";

const PlusIcon = ({ className, size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-0.169 -0.169 0.9 0.9"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin"
      className={className}
    >
      <path d="M.334.259V.071a.037.037 0 1 0-.075 0v.188H.071a.037.037 0 1 0 0 .075h.188v.188a.037.037 0 1 0 .075 0V.334h.188a.037.037 0 1 0 0-.075z" />
    </svg>
  );
};

export default PlusIcon;
