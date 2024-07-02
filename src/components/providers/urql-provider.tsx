"use client";

import { chains as suportedChains } from "@/config/chains";
import { getUrqlClient } from "@/config/urql";
import { useRouteNetwork } from "@/providers/route-network";
import { type PropsWithChildren, useMemo } from "react";
import { Provider } from "urql";

const URQLProvider = ({ children }: PropsWithChildren) => {
  const { currentChain } = useRouteNetwork();

  const client = useMemo(() => {
    const supportedChain = suportedChains.find(
      ({ definition }) => definition.id === currentChain.id,
    );
    if (!supportedChain) {
      return;
    }
    return getUrqlClient(supportedChain);
  }, [ currentChain.id ]);

  if (!client) {
    return <></>;
  }

  return <Provider value={client}>{children}</Provider>;
};
URQLProvider.displayName = "URQLProvider";
export { URQLProvider };
