import * as React from "react";
const SvgCloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#595766"
      d="M12.844 12.875a.53.53 0 0 1-.719 0L8 8.719l-4.156 4.156a.53.53 0 0 1-.719 0 .53.53 0 0 1 0-.719L7.281 8 3.125 3.875a.53.53 0 0 1 0-.719.53.53 0 0 1 .719 0L8 7.312l4.125-4.156a.53.53 0 0 1 .719 0 .53.53 0 0 1 0 .719L8.688 8l4.156 4.156a.53.53 0 0 1 0 .719"
    />
  </svg>
);
export default SvgCloseIcon;
