import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const truncateHex = (address: string, { leading, trailing } = { leading: 2, trailing: 4 }) => {
  const match = address.match(new RegExp(`^(0x[a-zA-Z0-9]{${leading}})[a-zA-Z0-9]+([a-zA-Z0-9]{${trailing}})$`));
  return match ? `${match[1]}…${match[2]}` : address;
};

export { cn, truncateHex };
