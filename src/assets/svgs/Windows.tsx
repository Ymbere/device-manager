import * as React from "react";
const SvgWindows = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#595766"
      d="M13.5 7a.74.74 0 0 1-.75.75h-5v5c0 .438-.344.781-.75.781-.437 0-.75-.344-.75-.781v-5h-5c-.437 0-.75-.312-.75-.719 0-.437.313-.781.75-.781h5v-5c0-.406.313-.719.75-.719.406 0 .75.313.75.719v5h5a.76.76 0 0 1 .75.75"
    />
  </svg>
);
export default SvgWindows;
