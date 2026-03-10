"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import {
  Dialog,
  Portal,
  IconButton,
  Flex,
  Text,
  Skeleton,
  For,
} from "@chakra-ui/react";
import { downloadTable, table } from "@/assets/svgs";
import { downloadTableList } from "@/utils/helpers";
import { TableCard } from "./tableCard";

export const TableList = () => {
  const t = useTranslations();
  const printRef = useRef();

  const { id } = useParams();
  const { isFetching, data } = useGetAuthTanstack(
    `confirmations/invitation/${id}/tables`,
  );

  if (isFetching) {
    return <Skeleton w="103px" h="44px" />;
  }

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" >
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <IconButton px="3px" color={"#0C6DE2"} variant="ghost" h="44px">
          {table.icon} {t("table_list")}
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content maxW="1016px" w="95vw">
            <Dialog.Header>
              <Dialog.Title
                as={Flex}
                w="100%"
                align="center"
                justify="space-between"
              >
                <Flex>
                  {t("table_list")}
                  <Text fontSize={"16px"} fontWeight={500} color={"#B0B0B0"}>
                    ({data?.unassignedCount} {t("unassigned")})
                  </Text>
                </Flex>

                <IconButton
                  w="224px"
                  variant="subtle"
                  borderRadius={"8px"}
                  onClick={() => downloadTableList(printRef)}
                >
                  {downloadTable.icon} {t("download_table_list")}
                </IconButton>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body gap="24px">
              <Flex ref={printRef} gap="16px" flexWrap={"wrap"}>
                <For each={Object.entries(data?.tables)}>
                  {([number, guests]) => (
                    <TableCard key={number} number={number} guests={guests} />
                  )}
                </For>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            {/* <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" ref={closeButtonRef} />
            </Dialog.CloseTrigger> */}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
