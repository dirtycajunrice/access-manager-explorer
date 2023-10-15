"use client";
import {
  Badge,
  Card,
  Flex,
  Text,
  Separator,
  IconButton,
} from "@radix-ui/themes";
import { ComponentProps, FC, ReactNode, useEffect, useRef } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

import { AddressEntity, Entity as EntityType } from "@/types";

interface Props extends Omit<ComponentProps<typeof Card>, "role"> {
  entityType: AddressEntity | EntityType;
  children: ReactNode;
  description: string;
  remove: () => void;
  header: ReactNode;
}

const Entity: FC<Props> = ({
  entityType,
  children,
  description,
  className,
  remove,
  header,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Card
      {...props}
      ref={ref}
      className={cn("max-h-full card-inner-overflow-y-scroll", className)}
    >
      <Flex align="center" mb="4">
        {header}
        <Badge ml="auto">{entityType}</Badge>
        <IconButton
          onClick={remove}
          ml="4"
          color="gray"
          size="3"
          variant="ghost"
        >
          <Cross2Icon />
        </IconButton>
      </Flex>
      <Text size="2">{description}</Text>
      <Separator orientation="horizontal" my="3" size="4" />
      {children}
    </Card>
  );
};

export default Entity;
