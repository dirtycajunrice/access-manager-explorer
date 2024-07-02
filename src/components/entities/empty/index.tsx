import ROUTES from "@/config/routes";
import { useRouteNetwork } from "@/providers/route-network";
import { SupportedChainId } from "@/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Link } from "@radix-ui/themes";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import { Chain } from "viem/chains";

interface Props {
  callout: {
    text: string | ((clientChain: Chain) => string);
  };
}

const Empty: FC<Props> = ({ callout: { text } }) => {
  const { open } = useWeb3Modal();
  const { routeChain, clientChain } = useRouteNetwork();
  const searchParams = useSearchParams();

  const { replace } = useRouter();

  const message = useMemo(() => {
    if (!clientChain) {
      return "Connect your wallet to change network";
    } else if (clientChain.id === routeChain.id) {
      return "Change network";
    } else if (clientChain.id !== routeChain.id) {
      return `Use your wallet's network (${routeChain.name}).`;
    }
  }, [ clientChain, routeChain ]);

  const onChangeNetwork = () => {
    if (!clientChain) {
      open({ view: "Connect"});
    } else if (clientChain?.id === routeChain.id) {
      open({ view: "Networks" });
    } else if (clientChain.id !== routeChain.id) {
      replace(
        `${ROUTES.EXPLORER.ROOT(
          clientChain?.id as SupportedChainId,
        )}?${searchParams}`,
      );
    }
  };

  const textString = useMemo(() => {
    if (typeof text === "string") {
      return text;
    }
    if (clientChain) {
      return text(clientChain);
    }
    return "";
  }, [ text, clientChain ]);

  return (
    <Callout.Root color="amber">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        {textString}
        <Link ml="1" onClick={onChangeNetwork}>
          {message}
        </Link>
      </Callout.Text>
    </Callout.Root>
  );
};

export default Empty;
