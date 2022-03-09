import React, { ElementType } from "react";
import { Props } from "../types/components";

const Row = ({ component: Container = "div", ...props }: Props) => {
  return (
    <Container {...props} className={`flex flex-row ${props.className || ""}`}>
      {props.children}
    </Container>
  );
};

export default Row;
