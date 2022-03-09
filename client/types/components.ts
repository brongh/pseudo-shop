import { ElementType } from "react";

export type Props = {
  component?: ElementType;
} & React.HTMLProps<HTMLOrSVGElement>;

export type ButtonProps = {
  component?: ElementType;
  color?: "white" | "green" | "teal" | "purple" | "";
} & React.HTMLProps<HTMLOrSVGElement>;
