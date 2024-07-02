"use client";
import Address from "@/components/address";
import { useEntities } from "@/providers/entities";
import { useFavorites } from "@/providers/favorites";
import { AddressEntity } from "@/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Tabs } from "@radix-ui/themes";
import { ComponentProps, FC } from "react";
import { useQuery } from "urql";
import { Address as AddressType } from "viem";
import Account from "../as/account";
import Empty from "../empty";
import { ACCESS_MANAGER_QUERY } from "./requests";
// import Operations from "./tabs/operations";
import Skeleton from "./skeleton";
import Members from "./tabs/members";
import Roles from "./tabs/roles";
import Targets from "./tabs/targets";

interface Props extends ComponentProps<typeof Card> {
  depth: number;
  address: AddressType;
  shortenAddress?: ComponentProps<typeof Address>["addreth"]["shortenAddress"];
  isLast: boolean;
}

const AccessManager: FC<Props> = ({
                                    address,
                                    shortenAddress,
                                    className,
                                    depth,
                                    isLast,
                                    ...props
                                  }) => {
  const [ { data, fetching, error } ] = useQuery({
    query: ACCESS_MANAGER_QUERY,
    variables: {
      id: address,
    },
  });

  const { splice } = useEntities();

  const accessManager = data?.accessManager;

  const favorites = useFavorites();

  return (
    <Account
      id={address}
      favorites={{
        toggle: () => {
          if (!favorites.isFavorite(AddressEntity.AccessManager, address)) {
            favorites.setFavorite([
              AddressEntity.AccessManager,
              {
                [address]: address,
              },
            ]);
          } else {
            favorites.removeFavorite(AddressEntity.AccessManager, address);
          }
        },
        isFavorite: favorites.isFavorite(AddressEntity.AccessManager, address),
      }}
      remove={() => splice(depth, 1)}
      entityType={AddressEntity.AccessManager}
      description="An AccessManager is a contract that keeps the permissions of a system"
      address={address}
      className={className}
      shortenAddress={shortenAddress}
      isLast={isLast}
      {...props}
    >
      <Box>
        {error ? (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>
              Ahh snap! Something went wrong while fetching the Access Manager.
              {error.message}
            </Callout.Text>
          </Callout.Root>
        ) : fetching ? (
          <Skeleton />
        ) : accessManager ? (
          <>
            <Tabs.Root defaultValue="targets">
              <Tabs.List>
                <Tabs.Trigger value="targets">Targets</Tabs.Trigger>
                <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
                <Tabs.Trigger value="members">Members</Tabs.Trigger>
                {/* <Tabs.Trigger value="operations">Operations</Tabs.Trigger> */}
              </Tabs.List>
              <Box pt="4" pb="2">
                <Tabs.Content value="targets">
                  <Targets
                    targets={accessManager?.targets ?? []}
                    depth={depth}
                  />
                </Tabs.Content>
                <Tabs.Content value="roles">
                  <Roles roles={accessManager?.roles ?? []} depth={depth} />
                </Tabs.Content>
                <Tabs.Content value="members">
                  <Members
                    members={accessManager?.members ?? []}
                    depth={depth}
                  />
                </Tabs.Content>
                {/* <Tabs.Content value="operations">
                 <Operations operations={accessManager?.operations} />
                 </Tabs.Content> */}
              </Box>
            </Tabs.Root>
          </>
        ) : (
          <Empty
            callout={{
              text: (clientChain) =>
                `Access Manager contract not found for ${clientChain.name} (${clientChain.id}).`,
            }}
          />
        )}
      </Box>
    </Account>
  );
};

export default AccessManager;
