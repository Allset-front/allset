"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import { TableList } from "./tableList";
import { Download } from "./download";
import { Info } from "./info";

export const Head = () => {
  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      gap={{ base: "24px", lg: "32px" }}
      flexWrap={{ base: "wrap", lg: "nowrap" }}
    >
      <Flex
        gap={{ base: "0", sm: "24px", lg: "32px" }}
        w={{ base: "100%", md: "fit-content" }}
        justify={{ base: "space-between", md: "unset" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <TableList />
        <Download />
      </Flex>
      <Info />
    </Flex>
  );
};
