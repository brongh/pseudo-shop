import React, { ElementType } from "react";
import { Props } from "../types/components";

const Col = ({ component: Container = "div", ...props }: Props) => {
  return (
    <Container {...props} className={`flex flex-col ${props.className || ""}`}>
      {props.children}
    </Container>
  );
};

export default Col;
