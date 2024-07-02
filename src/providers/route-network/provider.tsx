"use client";
import { chains } from "@/config/chains";
import { SupportedChainDefinition, SupportedChainId } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useCallback, useEffect, useMemo } from "react";
import { Chain } from "viem/chains";
import { useAccount } from "wagmi";

interface Props {
  children: ReactNode;
  routeChainId: SupportedChainId;
}

interface Context {
  routeChain: SupportedChainDefinition;
  clientChain?: Chain;
  currentChain: SupportedChainDefinition;
}

const defaultContext: Context = {
  routeChain: chains[0].definition,
  currentChain: chains[0].definition,
};

const routeNetworkContext = createContext<Context>(defaultContext);

const RouteNetworkProvider = ({ children, routeChainId: routeChainIdString }: Props) => {
  const routeChainId = Number(routeChainIdString) as SupportedChainId;
  const { chain: clientChain, isConnected } = useAccount();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routeChain = useMemo(
    () => chains.find(({ definition }) => definition.id === routeChainId)!.definition,
    [ routeChainId ],
  );

  const watchNetworkCallback = useCallback(
    ({ chain }: { chain: Chain}) => {
      const [ _, network, chainId, ...items ] = pathname.split("/");
      replace(
        `${[ _, network, chain?.id.toString() ?? chainId, ...items ].join(
          "/",
        )}?${searchParams}`,
      );
    },
    [ pathname, replace, searchParams ],
  );

  useEffect(() => {
    if (isConnected && clientChain && clientChain.id !== routeChainId) {
      watchNetworkCallback({chain: clientChain })
    }
  }, [watchNetworkCallback, isConnected, clientChain, routeChainId]);

  return (
    <routeNetworkContext.Provider
      value={{
        routeChain,
        clientChain,
        currentChain: routeChain ?? clientChain,
      }}
    >
      {children}
    </routeNetworkContext.Provider>
  );
};

export { routeNetworkContext };
export default RouteNetworkProvider;
