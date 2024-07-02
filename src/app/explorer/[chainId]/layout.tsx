import Navbar from "@/components/navbar";
import { URQLProvider } from "@/components/providers/urql-provider";
import Sidebar from "@/components/sidebar";
import { description, title } from "@/config/site";
import { EntitiesProvider } from "@/providers/entities";
import { FavoritesProvider } from "@/providers/favorites";
import { RouteNetworkProvider } from "@/providers/route-network";
import { SupportedChainId } from "@/types";
import { Flex, ScrollArea } from "@radix-ui/themes";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    chainId: SupportedChainId;
  };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  return {
    title: title + " for " + params.chainId,
    description: description.slice(0, -1) + " for " + params.chainId + ".",
  };
}

const ExplorerLayout: FC<Props> = ({ children, params: { chainId } }) => {
  return (
    <RouteNetworkProvider routeChainId={chainId}>
      <URQLProvider>
          <NextIntlClientProvider locale="en" messages={{}}>
            <FavoritesProvider>
              <EntitiesProvider>
                <Navbar />
                <ScrollArea size="2" scrollbars="horizontal">
                  <Flex className="min-w-130vw">
                    <Sidebar
                      style={{
                        minHeight: "calc(100vh - 64px)",
                        maxHeight: "calc(100vh - 64px)",
                      }}
                    />
                    {children}
                  </Flex>
                </ScrollArea>
              </EntitiesProvider>
            </FavoritesProvider>
          </NextIntlClientProvider>
      </URQLProvider>
    </RouteNetworkProvider>
  );
};

export default ExplorerLayout;
