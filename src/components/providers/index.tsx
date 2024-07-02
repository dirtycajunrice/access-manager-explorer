
import ThemeProvider from "@/components/providers/theme-provider";
import Web3Provider from "@/components/providers/web3-provider";
import { config } from "@/config/wallet";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { cookieToInitialState } from "wagmi";

const Providers = ({ children }: PropsWithChildren) => {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Web3Provider initialState={initialState}>
        {children}
      </Web3Provider>
    </ThemeProvider>

  );
};
Providers.displayName = "Providers";
export { Providers };
