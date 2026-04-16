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
  useMediaQuery,
  CloseButton,
} from "@chakra-ui/react";
import { downloadTable, table } from "@/assets/svgs";
import { downloadTableList } from "@/services/download";
import { TableCard } from "./tableCard";
import { isEmptyObject } from "@/utils/checkers";

export const TableList = () => {
  const t = useTranslations();
  const printRef = useRef();
  const closeButtonRef = useRef(null);

  const { id } = useParams();
  const { isFetching, data } = useGetAuthTanstack(
    `confirmations/invitation/${id}/tables`,
  );

  const [isMobile] = useMediaQuery("(max-width: 767px)");

  if (isFetching) {
    return <Skeleton w="103px" h="44px" />;
  }
  
  if (isEmptyObject(data?.tables)) {
    return;
  }

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <IconButton px="3px" color={"#0C6DE2"} variant="ghost" h="44px">
          {table.icon} {t("table_list")}
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content maxW="1016px" w={{ base: "100vw", sm: "95vw" }}>
            {/* <Dialog.Content> */}
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

                {!isMobile && (
                  <IconButton
                    w={"fit-content"}
                    variant="subtle"
                    borderRadius={"8px"}
                    px="28px"
                    onClick={() => downloadTableList(printRef)}
                  >
                    {downloadTable.icon} {t("download_table_list")}
                  </IconButton>
                )}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body padding="16px 24px 24px">
              <Flex ref={printRef} gap="16px" flexWrap={"wrap"}>
                <For each={Object.entries(data?.tables)}>
                  {([number, guests]) => (
                    <TableCard key={number} number={number} guests={guests} />
                  )}
                </For>
              </Flex>
            </Dialog.Body>
            {isMobile && (
              <Dialog.Footer>
                <IconButton
                  w={"100%"}
                  variant="subtle"
                  borderRadius={"8px"}
                  onClick={() => downloadTableList(printRef)}
                >
                  {downloadTable.icon} {t("download_table_list")}
                </IconButton>
              </Dialog.Footer>
            )}
            {isMobile && (
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" ref={closeButtonRef} />
              </Dialog.CloseTrigger>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
