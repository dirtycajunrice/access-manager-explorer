import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  bsc,
  bscTestnet,
  fantom,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  polygonZkEvm,
  sepolia,
} from "viem/chains";
import { urqlEndpoint } from "../env";

const chains = [
  { definition: avalanche, subgraphUrl: urqlEndpoint.avalanche },
  { definition: mainnet, subgraphUrl: urqlEndpoint.mainnet },
  { definition: sepolia, subgraphUrl: urqlEndpoint.sepolia },
  { definition: optimism, subgraphUrl: urqlEndpoint.optimism },
  { definition: optimismSepolia, subgraphUrl: urqlEndpoint.optimismSepolia },
  { definition: bsc, subgraphUrl: urqlEndpoint.bsc },
  { definition: bscTestnet, subgraphUrl: urqlEndpoint.bscChapel },
  { definition: polygon, subgraphUrl: urqlEndpoint.polygon },
  { definition: polygonAmoy, subgraphUrl: urqlEndpoint.polygonAmoy },
  { definition: fantom, subgraphUrl: urqlEndpoint.fantom },
  { definition: arbitrum, subgraphUrl: urqlEndpoint.arbitrum },
  { definition: arbitrumSepolia, subgraphUrl: urqlEndpoint.arbitrumSepolia },
  { definition: avalancheFuji, subgraphUrl: urqlEndpoint.avalancheFuji },
  { definition: base, subgraphUrl: urqlEndpoint.base },
  { definition: baseSepolia, subgraphUrl: urqlEndpoint.baseSepolia },
  { definition: polygonZkEvm, subgraphUrl: urqlEndpoint.zkevm },
  { definition: blast, subgraphUrl: urqlEndpoint.blast },
  { definition: blastSepolia, subgraphUrl: urqlEndpoint.blastTestnet },

] as const;

export { chains };
