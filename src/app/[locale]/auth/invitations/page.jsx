"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { Flex, For, Stack, Tabs } from "@chakra-ui/react";
import { invitationTabs } from "@/utils/constants";

const Active = dynamic(() => import("./active"));
const Drafts = dynamic(() => import("./drafts"));
const Expired = dynamic(() => import("./expired"));

export default function Invitations() {
  const t = useTranslations();

  const [tab, setTab] = useQueryState("tab", {
    defaultValue: "active",
    history: "push",
  });

  const { isLoading, data } = useGetAuthTanstack(`invitations/${tab}`);

  return (
    <Tabs.Root
      defaultValue="active"
      variant="enclosed"
      value={tab}
      onValueChange={(e) => setTab(e.value)}
    >
      <Flex>
        <For each={invitationTabs}>
          {({ id, name }) => (
            <Tabs.List
              key={id}
              bg="#FFFFFF"
              w="100%"
              p="8px"
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
          <Active isLoading={isLoading} data={data} />
        </Tabs.Content>

        <Tabs.Content value="drafts">
          <Drafts isLoading={isLoading} data={data} />
        </Tabs.Content>

        <Tabs.Content value="expired">
          <Expired isLoading={isLoading} data={data} />
        </Tabs.Content>
      </Stack>
    </Tabs.Root>
  );
}
