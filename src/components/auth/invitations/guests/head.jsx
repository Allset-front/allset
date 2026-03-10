"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import { TableList } from "./tableList";
import { Download } from "./download";
import { Info } from "./info";

export const Head = () => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Flex gap="32px">
        <TableList />
        <Download />
      </Flex>
      <Info />
    </Flex>
  );
};
