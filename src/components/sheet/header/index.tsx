import { cn } from "@/utils";
import { Box } from "@radix-ui/themes";
import { ComponentProps, FC } from "react";

const Header: FC<ComponentProps<typeof Box>> = ({ className, ...props }) => (
  <Box
    className={cn(
      "flex flex-col text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

Header.displayName = "Header";

export default Header;
