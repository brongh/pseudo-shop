import React from "react";
import { ButtonProps, Props } from "../types/components";

const defaultStyle =
  "rounded-lg pt-2 px-4 pb-4 border-[1px] border-black ml-2 shadow-hard font-poppins font-semibold";

const hoverStyle = "hover:bg-purple-600 transition ease-in-out delay-100";

const colorSelection = (color: string) => {
  switch (color) {
    case "purple":
      return "bg-purple-400";

    case "green":
      return "bg-green-500";

    case "teal":
      return "bg-green-300";

    case "white":
      return "bg-white";

    default:
      return "bg-white";
  }
};

const Button = ({
  component: Container = "button",
  color,
  ...props
}: ButtonProps) => {
  return (
    <Container
      {...props}
      className={`${defaultStyle} ${props.className || ""} ${hoverStyle} ${
        color && colorSelection(color)
      }`}
    >
      {props.children}
    </Container>
  );
};

export default Button;
