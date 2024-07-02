"use client";
import QueryProvider from "@/components/providers/query-provider";
import { config, projectId } from "@/config/wallet";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import type { PropsWithChildren } from "react";
import { avalanche } from "viem/chains";
import { type State, WagmiProvider } from "wagmi";

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  defaultChain: avalanche,
  enableAnalytics: true,
  featuredWalletIds: [
    "f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c", // Core
    "a9751f17a3292f2d1493927f0555603d69e9a3fcbcdf5626f01b49afa21ced91", // Frame
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // Metamask
    "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f", // Safe
  ],
  termsConditionsUrl: "https://evoverses.com/terms",
  privacyPolicyUrl: "https://evoverses.com/privacy",
  themeVariables: {
    "--w3m-accent": "hsl(142.1 70.6% 45.3%)",
  },
});

type AccountProviderProps = {
  initialState?: State
}

const Web3Provider = ({ initialState, children }: PropsWithChildren<{ initialState?: State }>) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
