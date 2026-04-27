"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { Flex, For, Stack, Tabs } from "@chakra-ui/react";
import { invitationTabs } from "@/utils/constants";
import { Animate } from "@/components/ui/animate";
import { filterInvitations } from "@/utils/helpers";

const Active = dynamic(() => import("./active"));
const Drafts = dynamic(() => import("./drafts"));
const Expired = dynamic(() => import("./expired"));

export const InvitationsClient = () => {
  const t = useTranslations();

  const [{ tab, name }, setQuery] = useQueryStates({
    tab: parseAsString.withDefault("active"),
    name: parseAsString,
  });
  const { isLoading, data } = useGetAuthTanstack(`invitations/${tab}`);

  const filteredData = filterInvitations(data, name);

  return (
    <Animate>
      <Tabs.Root
        defaultValue="active"
        variant="enclosed"
        value={tab}
        onValueChange={(e) => setQuery({ tab: e.value })}
      >
        <Flex>
          <For each={invitationTabs}>
            {({ id, name }) => (
              <Tabs.List
                key={id}
                bg="#FFFFFF"
                w="100%"
                p={{ base: "1px", sm: "8px" }}
                borderRadius="8px"
              >
                <Tabs.Trigger
                  value={name}
                  w="100%"
                  bg="#F9FAFB"
                  borderRadius="12px"
                  color="#4B5563"
                  fontWeight="400"
                  lineHeight="24px"
                  _selected={{
                    bg: "#0041431A",
                    color: "#004143",
                    fontWeight: "500",
                  }}
                >
                  {t(name)}
                </Tabs.Trigger>
              </Tabs.List>
            )}
          </For>
        </Flex>

        <Stack minH="100vh">
          <Tabs.Content value="active">
            <Active isLoading={isLoading} data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="drafts">
            <Drafts isLoading={isLoading} data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="expired">
            <Expired isLoading={isLoading} data={filteredData} />
          </Tabs.Content>
        </Stack>
      </Tabs.Root>
    </Animate>
  );
};
