import React from "react";

export default function Shopbagcircle({ colorStroke = "#fff", size = 17 }) {
  return (
    <div className="p-2 w-fit rounded-full border  flex items-center justify-center" style={{ borderColor: colorStroke }}>
      <svg width={size} height={size} viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.05163 6.88587C2.08017 6.53023 2.24162 6.1984 2.50382 5.95645C2.76602 5.7145 3.10973 5.58019 3.4665 5.58026H12.0225C12.3792 5.58019 12.723 5.7145 12.9852 5.95645C13.2474 6.1984 13.4088 6.53023 13.4374 6.88587L14.0071 13.9815C14.0228 14.1768 13.9979 14.3732 13.9339 14.5584C13.87 14.7435 13.7684 14.9135 13.6355 15.0574C13.5027 15.2014 13.3415 15.3163 13.1621 15.3949C12.9826 15.4735 12.7889 15.5142 12.593 15.5142H2.89601C2.70012 15.5142 2.50635 15.4735 2.32692 15.3949C2.14749 15.3163 1.98628 15.2014 1.85344 15.0574C1.7206 14.9135 1.619 14.7435 1.55505 14.5584C1.4911 14.3732 1.46617 14.1768 1.48184 13.9815L2.05163 6.88587V6.88587Z"
          stroke={colorStroke}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5828 7.70896V4.16112C10.5828 3.40836 10.2838 2.68644 9.75148 2.15416C9.2192 1.62188 8.49728 1.32285 7.74452 1.32285C6.99177 1.32285 6.26984 1.62188 5.73756 2.15416C5.20528 2.68644 4.90625 3.40836 4.90625 4.16112V7.70896"
          stroke={colorStroke}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
