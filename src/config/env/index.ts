const urqlEndpoint = {
  avalanche: process.env.NEXT_PUBLIC_URQL_ENDPOINT_AVALANCHE!,
  mainnet: process.env.NEXT_PUBLIC_URQL_ENDPOINT_MAINNET!,
  sepolia: process.env.NEXT_PUBLIC_URQL_ENDPOINT_MANAGER_SEPOLIA!,
  optimism: process.env.NEXT_PUBLIC_URQL_ENDPOINT_OPTIMISM!,
  optimismSepolia: process.env.NEXT_PUBLIC_URQL_ENDPOINT_OPTIMISM_SEPOLIA!,
  bsc: process.env.NEXT_PUBLIC_URQL_ENDPOINT_BSC!,
  bscChapel: process.env.NEXT_PUBLIC_URQL_ENDPOINT_BSC_CHAPEL!,
  polygon: process.env.NEXT_PUBLIC_URQL_ENDPOINT_POLYGON!,
  polygonAmoy: process.env.NEXT_PUBLIC_URQL_ENDPOINT_POLYGON_AMOY!,
  fantom: process.env.NEXT_PUBLIC_URQL_ENDPOINT_FANTOM!,
  arbitrum: process.env.NEXT_PUBLIC_URQL_ENDPOINT_ARBITRUM!,
  arbitrumSepolia: process.env.NEXT_PUBLIC_URQL_ENDPOINT_ARBITRUM_SEPOLIA!,
  avalancheFuji: process.env.NEXT_PUBLIC_URQL_ENDPOINT_AVALANCHE_FUJI!,
  base: process.env.NEXT_PUBLIC_URQL_ENDPOINT_BASE!,
  baseSepolia: process.env.NEXT_PUBLIC_URQL_ENDPOINT_BASE_SEPOLIA!,
  zkevm: process.env.NEXT_PUBLIC_URQL_ENDPOINT_ZKEVM!,
  blast: process.env.NEXT_PUBLIC_URQL_ENDPOINT_BLAST!,
  blastTestnet: process.env.NEXT_PUBLIC_URQL_ENDPOINT_BLAST_TESTNET!,
};

const signatureDatabase = process.env.NEXT_PUBLIC_SIGNATURE_DATABASE!;


export { urqlEndpoint, signatureDatabase };
