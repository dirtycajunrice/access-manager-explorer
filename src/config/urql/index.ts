import { SupportedChain } from "@/types";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Client, fetchExchange } from "urql";

const CACHED_CLIENTS: Record<number, Client> = {};

const getUrqlClient = (chain: SupportedChain) => {
  if (!CACHED_CLIENTS[chain.definition.id]) {
    CACHED_CLIENTS[chain.definition.id] = new Client({
      url: chain.subgraphUrl,
      exchanges: [ cacheExchange(), fetchExchange ],
    });
  }
  return CACHED_CLIENTS[chain.definition.id];
};

export { getUrqlClient };
