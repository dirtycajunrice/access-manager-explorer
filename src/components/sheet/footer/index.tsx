import { cn } from "@/utils";
import { Box } from "@radix-ui/themes";
import { ComponentProps, FC } from "react";

const Footer: FC<ComponentProps<typeof Box>> = ({ className, ...props }) => (
  <Box
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

Footer.displayName = "Footer";

export default Footer;
