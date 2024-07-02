"use client";

import Address from "@/components/address";
import Selector from "@/components/function";
import { ACCESS_MANAGER_TARGET_FUNCTION_FRAGMENT } from "@/components/function/requests";
import Role from "@/components/role";
import { ACCESS_MANAGER_ROLE_FRAGMENT } from "@/components/role/requests";
import { makeFragmentData } from "@/gql";
import useAccount from "@/hooks/use-account";
import { useEntities } from "@/providers/entities";
import { EntityInstance } from "@/providers/entities/provider";
import { useFavorites } from "@/providers/favorites";
import { AddressEntity, Entity } from "@/types";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { FC, useMemo, useState } from "react";
import { useQuery } from "urql";
import { Address as AddressType } from "viem";
import FavoritesSection from "./favorites-section";
import MemberOf from "./member-of";
import { ACCESS_MANAGER_ROLE_MEMBERS_QUERY } from "./requests";

interface Props {
  onNavigate?: (entity: EntityInstance) => void;
}

const Content: FC<Props> = ({ onNavigate = () => console.log() }) => {
  const [ open, setOpen ] = useState(true);
  const { address, isConnected } = useAccount();
  const { open: openWeb3Modal } = useWeb3Modal();
  const entities = useEntities();

  const [ { data, fetching } ] = useQuery({
    query: ACCESS_MANAGER_ROLE_MEMBERS_QUERY,
    variables: {
      address: address ?? "",
    },
    pause: !address,
  });
  const { getFavorites } = useFavorites();

  const accessManagerFavorites = useMemo(
    () => getFavorites(AddressEntity.AccessManager),
    [ getFavorites ],
  );
  const accessManagedFavorites = useMemo(
    () => getFavorites(AddressEntity.AccessManaged),
    [ getFavorites ],
  );
  const accessManagerRoleFavorites = useMemo(
    () => getFavorites(Entity.AccessManagerRole),
    [ getFavorites ],
  );
  const accessManagerRoleMemberFavorites = useMemo(
    () => getFavorites(AddressEntity.AccessManagerRoleMember),
    [ getFavorites ],
  );
  const accessManagerTargetFavorites = useMemo(
    () => getFavorites(AddressEntity.AccessManagerTarget),
    [ getFavorites ],
  );
  const accessManagerTargetFuncFavorites = useMemo(
    () => getFavorites(Entity.AccessManagerTargetFunction),
    [ getFavorites ],
  );

  const isEmpty = useMemo(
    () => {
      const a = accessManagerFavorites.length === 0 &&
        accessManagedFavorites.length === 0 &&
        accessManagerRoleFavorites.length === 0;
      const b = accessManagerRoleMemberFavorites.length === 0 &&
        accessManagerTargetFavorites.length === 0 &&
        accessManagerTargetFuncFavorites.length === 0;
      return a && b;
    },

    [
      accessManagerFavorites,
      accessManagedFavorites,
      accessManagerRoleFavorites,
      accessManagerRoleMemberFavorites,
      accessManagerTargetFavorites,
      accessManagerTargetFuncFavorites,
    ],
  );

  const clearAndPushNav = (entity: EntityInstance) => {
    entities.clearAndPush(entity);
    onNavigate(entity);
  };

  return (
    <>
      <Collapsible.Root
        className="w-full"
        defaultOpen={true}
        open={open && isConnected}
        onOpenChange={setOpen}
      >
        <Flex align="center" mb="1">
          {isConnected && (
            <Button ml="1" size="2" variant="ghost" color="gray">
              <Collapsible.Trigger asChild>
                <Flex align="center">
                  {address && (
                    <Address
                      hidePopup
                      addreth={{
                        address,
                        actions: "none",
                        shortenAddress: 6,
                      }}
                    />
                  )}
                  {fetching ? (
                    <div
                      className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent text-gray-600 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : open ? (
                    <ChevronDownIcon width="16" height="16" />
                  ) : (
                    <ChevronRightIcon width="16" height="16" />
                  )}
                </Flex>
              </Collapsible.Trigger>
            </Button>
          )}
          {!isConnected && (
            <Button
              ml="1"
              size="2"
              variant="ghost"
              color="gray"
              onClick={() => openWeb3Modal({ view: "Connect" })}
            >
              <Heading as="h2" size="2" mr="2">
                Add wallet
              </Heading>
              <PlusIcon width="16" height="16" />
            </Button>
          )}
        </Flex>
        <Collapsible.Content className="pt-2">
          {data?.accessManagerRoleMembers ? data?.accessManagerRoleMembers.length === 0 ? (
            <Flex ml="4" direction="column">
              <Text size="2" color="gray">
                No membership found 🤷🏻‍♂️
              </Text>
            </Flex>
          ) : (
            <Heading as="h2" size="1" ml="4" mb="1">
              Member of
            </Heading>
          ) : (
            <></>
          )}
          {data?.accessManagerRoleMembers?.map((membership) => (
            <MemberOf
              key={membership.id}
              membership={membership}
              onNavigate={onNavigate}
            />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
      <Separator my="3" size="4" />
      {!isEmpty && <Heading as="h2" size="1">Favorites</Heading>}
      {accessManagerFavorites.length > 0 && (
        <FavoritesSection
          name="Access Managers"
          data={accessManagerFavorites}
          onRender={([ displayName, id ]) => (
            <Button
              key={`${AddressEntity.AccessManager}-${id}`}
              my="1"
              variant="ghost"
              color="gray"
              className="w-full"
              onClick={() =>
                clearAndPushNav({
                  type: AddressEntity.AccessManager,
                  id,
                })
              }
            >
              <Address
                p="1"
                width="100%"
                key={displayName}
                hidePopup
                addreth={{
                  actions: "none",
                  shortenAddress: 6,
                  address: id as AddressType,
                }}
              />
            </Button>
          )}
        />
      )}
      {accessManagedFavorites.length > 0 && (
        <FavoritesSection
          name="Access Managed"
          data={accessManagedFavorites}
          onRender={([ displayName, id ]) => (
            <Button
              key={`${AddressEntity.AccessManaged}-${id}`}
              my="1"
              variant="ghost"
              color="gray"
              className="w-full"
              onClick={() =>
                clearAndPushNav({
                  type: AddressEntity.AccessManaged,
                  id,
                })
              }
            >
              <Address
                p="1"
                width="100%"
                key={displayName}
                hidePopup
                addreth={{
                  actions: "none",
                  shortenAddress: 6,
                  address: id as AddressType,
                }}
              />
            </Button>
          )}
        />
      )}
      {accessManagerRoleFavorites.length > 0 && (
        <FavoritesSection
          name="Roles"
          data={accessManagerRoleFavorites}
          onRender={([ displayName, id ]) => {
            const [ roleId, accessManager ] = id.split("/").reverse();
            return (
              <Button
                key={`${Entity.AccessManagerRole}-${id}`}
                my="1"
                variant="ghost"
                color="gray"
                className="w-full"
                onClick={() =>
                  clearAndPushNav({
                    type: Entity.AccessManagerRole,
                    id,
                  })
                }
              >
                <Flex align="center" width="100%" key={displayName}>
                  <Role
                    accessManagerRole={makeFragmentData(
                      {
                        id: roleId,
                        asRole: {
                          id: roleId,
                        },
                      },
                      ACCESS_MANAGER_ROLE_FRAGMENT,
                    )}
                  />
                  <Address
                    p="1"
                    ml="2"
                    width="100%"
                    hidePopup
                    addreth={{
                      actions: "none",
                      shortenAddress: 6,
                      address: accessManager as AddressType,
                    }}
                  />
                </Flex>
              </Button>
            );
          }}
        />
      )}
      {accessManagerRoleMemberFavorites.length > 0 && (
        <FavoritesSection
          name="Memberships"
          data={accessManagerRoleMemberFavorites}
          onRender={([ displayName, id ]) => {
            const [ member, roleId, accessManager ] = id.split("/").reverse();
            return (
              <Button
                key={`${AddressEntity.AccessManagerRoleMember}-${id}`}
                my="1"
                variant="ghost"
                color="gray"
                className="w-full"
                onClick={() =>
                  clearAndPushNav({
                    type: AddressEntity.AccessManagerRoleMember,
                    id,
                  })
                }
              >
                <Flex align="center" width="100%" key={displayName}>
                  <Address
                    p="1"
                    grow="1"
                    hidePopup
                    addreth={{
                      actions: "none",
                      shortenAddress: false,
                      address: member as AddressType,
                    }}
                  />
                  <Role
                    accessManagerRole={makeFragmentData(
                      {
                        id: roleId,
                        asRole: {
                          id: roleId,
                        },
                      },
                      ACCESS_MANAGER_ROLE_FRAGMENT,
                    )}
                  />
                  <Address
                    p="1"
                    ml="2"
                    grow="1"
                    hidePopup
                    addreth={{
                      actions: "none",
                      shortenAddress: false,
                      address: accessManager as AddressType,
                    }}
                  />
                </Flex>
              </Button>
            );
          }}
        />
      )}
      {accessManagerTargetFavorites.length > 0 && (
        <FavoritesSection
          name="Targets"
          data={accessManagerTargetFavorites}
          onRender={([ displayName, id ]) => {
            const [ target ] = id.split("/").reverse();
            return (
              <Button
                key={`${AddressEntity.AccessManagerTarget}-${id}`}
                my="1"
                variant="ghost"
                color="gray"
                className="w-full"
                onClick={() =>
                  clearAndPushNav({
                    type: AddressEntity.AccessManagerTarget,
                    id,
                  })
                }
              >
                <Address
                  key={displayName}
                  p="1"
                  width="100%"
                  hidePopup
                  addreth={{
                    actions: "none",
                    shortenAddress: 6,
                    address: target as AddressType,
                  }}
                />
              </Button>
            );
          }}
        />
      )}
      {accessManagerTargetFuncFavorites.length > 0 && (
        <FavoritesSection
          name="Functions"
          data={accessManagerTargetFuncFavorites}
          onRender={([ displayName, id ]) => {
            const [ method, target ] = id.split("/").reverse();
            return (
              <Button
                key={`${Entity.AccessManagerTargetFunction}-${id}`}
                my="1"
                variant="ghost"
                color="gray"
                className="w-full"
                onClick={() =>
                  clearAndPushNav({
                    type: Entity.AccessManagerTargetFunction,
                    id,
                  })
                }
              >
                <Flex align="center" width="100%" key={displayName}>
                  <Address
                    p="1"
                    key={displayName}
                    hidePopup
                    addreth={{
                      actions: "none",
                      shortenAddress: 6,
                      address: target as AddressType,
                    }}
                  />
                  <Selector
                    size="2"
                    method={makeFragmentData(
                      {
                        id: id,
                        asSelector: {
                          id: method,
                        },
                      },
                      ACCESS_MANAGER_TARGET_FUNCTION_FRAGMENT,
                    )}
                  />
                </Flex>
              </Button>
            );
          }}
        />
      )}
    </>
  );
};

export default Content;
