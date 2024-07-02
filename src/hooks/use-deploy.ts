import AccessManager from "@openzeppelin/contracts/build/contracts/AccessManager.json";
import { useCallback } from "react";
import { Abi, Address, Hex } from "viem";
import { useDeployContract, useWalletClient } from "wagmi";

const useDeploy = (account?: Address) => {
  const { deployContract, data } = useDeployContract()
  const manager = useCallback(async (initialAdmin?: Address) => {

      return deployContract({
        abi: AccessManager.abi as Abi,
        bytecode: AccessManager.bytecode as Hex,
        args: [initialAdmin],
      })
    },
    [ account ],
  );

  return {
    hash: data,
    manager,
  };
};

export default useDeploy;
