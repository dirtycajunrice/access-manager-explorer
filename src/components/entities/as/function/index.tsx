"use client";
import FunctionHeader from "@/components/function";
import { ComponentProps, FC } from "react";
import Entity from "../entity";

interface Props extends Omit<ComponentProps<typeof Entity>, "header" | "role"> {
  method: ComponentProps<typeof FunctionHeader>["method"];
}

const Function: FC<Props> = ({ method, children, ...props }) => {
  return (
    <Entity
      header={<FunctionHeader size="5" mr="2" method={method} />}
      {...props}
    >
      {children}
    </Entity>
  );
};

export default Function;
