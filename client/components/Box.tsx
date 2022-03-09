import React from "react";
import { Props } from "../types/components";
import Col from "./Col";

const Box = ({ ...props }: Props) => {
  return (
    <Col
      {...props}
      className={`shadow-hard rounded-lg p-6 border-[1px] border-black ${
        props.className || ""
      }`}
    >
      {props.children}
    </Col>
  );
};

export default Box;
