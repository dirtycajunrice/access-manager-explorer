import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { Address } from "abitype";
import {
  arbitrum,
  arbitrumSepolia,
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
import { cookieStorage, type CreateConfigParameters, createStorage } from "wagmi";
import { avalanche as avalancheBase, type Chain } from "wagmi/chains";

const avvyDomainsResolver: Address = "0x24DFa1455A75f64800BFdB2447958D2B632b94f6";

const avalanche: Chain = {
  ...avalancheBase,
  contracts: {
    ...avalancheBase.contracts,
    ensUniversalResolver: {
      address: avvyDomainsResolver,
    },
  },
} as const;

const vEnv = process.env.VERCEL_ENV || "development";
const mainnetChains = [ avalanche, mainnet, optimism, bsc, polygon, fantom, arbitrum, base, polygonZkEvm,
  blast ] as CreateConfigParameters["chains"];
const testnetChains = [ sepolia, optimismSepolia, bscTestnet, polygonAmoy, arbitrumSepolia, avalancheFuji, baseSepolia,
  blastSepolia ] as CreateConfigParameters["chains"];
const chains = vEnv === "preview" ? testnetChains : vEnv === "production" ? mainnetChains : [ ...mainnetChains,
  ...testnetChains ];

const metadata = {
  name: "EvoVerses",
  description: "A 3D monster battling game bringing Web2 and Web3 together in one platform.",
  url: "https://evoverses.com",
  icons: [ "https://evoverses.com/icon.png" ],
};
const projectId = process.env.WALLETCONNECT_PROJECT_ID || process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata: metadata,
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
  enableEmail: true,
} as any /* Needed until types are fixed upstream */);

export { chains, projectId, config };
