import { IconProps } from "../types/icon";

const PhoneIcon = ({ className, size = 20 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="none"
        stroke=""
        strokeWidth="2"
        strokeOpacity={0.9}
        strokeMiterlimit="10"
        d="M13.6 8.5 9.5 4.3c-.5-.4-1.2-.4-1.7 0L4.7 7.5c-.7.6-.9 1.6-.6 2.4.8 2.3 2.9 6.9 7 11s8.7 6.1 11 7c.9.3 1.8.1 2.5-.5l3.1-3.1c.5-.5.5-1.2 0-1.7l-4.1-4.1c-.5-.5-1.2-.5-1.7 0L19.4 21s-2.8-1.2-5-3.3-3.3-5-3.3-5l2.5-2.5c.5-.5.5-1.3 0-1.7z"
      />
    </svg>
  );
};

export default PhoneIcon;
