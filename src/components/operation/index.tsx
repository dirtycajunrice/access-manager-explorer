import { truncateHex } from "@/utils";
import { Badge, Separator } from "@radix-ui/themes";
import { ComponentProps, FC } from "react";

interface Operation {
  id: string;
}

interface AccessManagerOperation {
  id: string;
  asOperation: Operation;
}

interface Props extends Omit<ComponentProps<typeof Badge>, "Operation"> {
  operation: AccessManagerOperation;
}

const Operation: FC<Props> = ({ operation, ...props }) => {
  return (
    <Badge color="gold" {...props}>
      {truncateHex(operation.asOperation.id, { leading: 4, trailing: 2 })}
      <Separator orientation="vertical" />
    </Badge>
  );
};

export default Operation;
