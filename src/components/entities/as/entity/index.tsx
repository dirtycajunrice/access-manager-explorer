"use client";
import { AddressEntity, Entity as EntityType } from "@/types";
import { cn } from "@/utils";
import { Cross2Icon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Badge, Card, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import { ComponentProps, FC, ReactNode, useEffect, useRef, useState } from "react";

interface Favorites {
  toggle: () => void;
  isFavorite: boolean;
}

interface Props extends Omit<ComponentProps<typeof Card>, "role"> {
  entityType: AddressEntity | EntityType;
  children: ReactNode;
  description: string;
  remove: () => void;
  header: ReactNode;
  isLast: boolean;
  favorites: Favorites;
}

const Entity: FC<Props> = ({
                             entityType,
                             children,
                             description,
                             className,
                             remove,
                             favorites,
                             header,
                             isLast,
                             ...props
                           }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ scrolled, setScrolled ] = useState(false);

  useEffect(() => {
    if (isLast && !scrolled) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setScrolled(true);
    }
  }, [ isLast, scrolled ]);

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
          onClick={favorites.toggle}
          ml="4"
          color="yellow"
          size="3"
          variant="ghost"
        >
          {favorites.isFavorite ? <StarFilledIcon /> : <StarIcon />}
        </IconButton>
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
