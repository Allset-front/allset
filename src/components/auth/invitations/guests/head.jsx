"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { downloadGuest } from "@/assets/svgs";
import { Flex, IconButton } from "@chakra-ui/react";
import { TableList } from "./tableList";
import { Info } from "./info";

export const Head = () => {
  const t = useTranslations();

  const handleDownload = (e) => {
    alert("In progress");
  };

  return (
    <Flex align={"center"} justify={"space-between"}>
      <Flex gap="32px">
        <TableList />

        <IconButton
          px="3px"
          color={"#004143"}
          variant="ghost"
          onClick={handleDownload}
        >
          {downloadGuest.icon} {t("download_guest_list")}
        </IconButton>
      </Flex>

      <Info />
    </Flex>
  );
};
