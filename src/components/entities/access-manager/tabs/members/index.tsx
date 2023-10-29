import Address from "@/components/address";
import { AddressEntity } from "@/types";
import { CircleIcon } from "@radix-ui/react-icons";
import { Callout, Card, Flex } from "@radix-ui/themes";
import { FC } from "react";

interface Props {
  members: any[];
}

const Members: FC<Props> = ({ members }) => {
  return (
    <>
      {!members.length ? (
        <Callout.Root>
          <Callout.Icon>
            <CircleIcon />
          </Callout.Icon>
          <Callout.Text>No members found</Callout.Text>
        </Callout.Root>
      ) : (
        <Flex direction="column" gap="2">
          {members.map(({ id, asAccount }: any) => (
            <Card key={id} size="1">
              <Address
                key={id}
                addreth={{
                  address: asAccount.id,
                  shortenAddress: false,
                }}
                onDetail={{
                  type: AddressEntity.AccessManagerRoleMember,
                  id,
                }}
              />
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Members;
