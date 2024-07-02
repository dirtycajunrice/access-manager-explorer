"use client";
import { Theme as Themes } from "@radix-ui/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { PropsWithChildren } from "react";

const ThemeProvider = ({ children, ...props }: PropsWithChildren<ThemeProviderProps>) => {
  return <NextThemesProvider {...props}>
    <Themes accentColor="gold">{children}</Themes>
  </NextThemesProvider>;
};

export default ThemeProvider;
