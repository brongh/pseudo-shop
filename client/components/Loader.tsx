import React from "react";

interface LoaderProps {
  width?: string;
}

const LoaderSpinner = ({ width }: LoaderProps) => {
  const size = `w-${width} h-${width}`;

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`${
          width ? size : "w-6 h-6"
        } border-b-2 border-white rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoaderSpinner;
