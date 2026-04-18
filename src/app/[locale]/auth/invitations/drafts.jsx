"use client";

import React from "react";
import { Flex, For, Skeleton } from "@chakra-ui/react";
import { Empty } from "@/components/auth/invitations/empty";
import { Card } from "@/components/auth/invitations/card";
import { isNotEmptyArray } from "@/utils/checkers";

export default function Drafts({ isLoading, data }) {
  if (isLoading) {
    return <Skeleton w="307px" h="550px" borderRadius="10px" />;
  }

  return isNotEmptyArray(data) ? (
    <Flex
      gap={{ base: "22px", md: "44px" }}
      flexWrap={"wrap"}
      justify={{ base: "center", md: "unset" }}
    >
      <For each={data}>{(el, index) => <Card key={index} el={el} />}</For>
    </Flex>
  ) : (
    <Empty type="drafts" />
  );
}
