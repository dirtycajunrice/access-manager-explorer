import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: "./env.local" });

const schema = process.env.URQL_ENDPOINT_AVALANCHE || process.env.NEXT_PUBLIC_URQL_ENDPOINT_AVALANCHE || "";
const config: CodegenConfig = {
  schema: schema,
  documents: [ "src/**/*.ts?(x)" ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};
console.log(config)

export default config;
