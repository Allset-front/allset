"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Dialog, Portal, IconButton, Flex, Text } from "@chakra-ui/react";
import { downloadTable, table } from "@/assets/svgs";
import { downloadTableList } from "@/utils/helpers";

export const TableList = () => {
  const t = useTranslations();
  const printRef = useRef();

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" size="lg">
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <IconButton px="3px" color={"#0C6DE2"} variant="ghost">
          {table.icon} {t("table_list")}
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content>
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
                    (X {t("unassigned")})
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
              <p ref={printRef}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus obcaecati, facilis consectetur, aspernatur, laborum sunt
                exercitationem voluptatem quisquam magni quia autem quo
                veritatis aperiam delectus quam sit! Beatae odit corrupti at
                alias quisquam quaerat debitis vitae, rem excepturi voluptatibus
                veritatis nisi ipsa numquam nesciunt eos explicabo incidunt quos
                voluptate ut.
              </p>
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
