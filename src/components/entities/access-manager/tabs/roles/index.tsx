import Role from "@/components/role";
import { ACCESS_MANAGER_ROLE_FRAGMENT } from "@/components/role/requests";
import { FragmentType, useFragment as asFragment } from "@/gql";
import { CircleIcon } from "@radix-ui/react-icons";
import { Callout, Grid } from "@radix-ui/themes";
import { FC } from "react";

interface Props {
  roles: FragmentType<typeof ACCESS_MANAGER_ROLE_FRAGMENT>[];
  depth: number;
}

const Roles: FC<Props> = ({ roles: fragments, depth }) => {
  const roles = fragments.map((role) =>
    asFragment(ACCESS_MANAGER_ROLE_FRAGMENT, role),
  );

  return (
    <>
      {!roles.length ? (
        <Callout.Root>
          <Callout.Icon>
            <CircleIcon />
          </Callout.Icon>
          <Callout.Text>No roles found</Callout.Text>
        </Callout.Root>
      ) : (
        <Grid columns="2" gap="3" width="auto">
          {roles.map((role, i) => (
            <Role
              key={role.id}
              className="w-full"
              size="2"
              icons={{
                unlabelled: true,
                navigate: {
                  at: depth,
                },
              }}
              accessManagerRole={fragments[i]}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Roles;
