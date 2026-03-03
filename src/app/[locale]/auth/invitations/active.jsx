"use client";

import React from "react";
import { Flex, For, Skeleton } from "@chakra-ui/react";
import { Empty } from "@/components/auth/invitations/empty";
import { Card } from "@/components/auth/invitations/card";
import { isNotEmptyArray } from "@/utils/checkers";

export default function Active({ isLoading, data }) {
  const el = { id: 1, publishedAt: "25-25-25", title: "Title" };
  return <Card el={el} />;
  // if (isLoading) {
  //   return <Skeleton w="307px" h="550px" borderRadius="10px" />;
  // }

  // return isNotEmptyArray(data) ? (
  //   <Flex justify={"space-between"} gap="44px" flexWrap={"wrap"}>
  //     <For each={data}>{(el, index) => <Card key={index} el={el} />}</For>
  //   </Flex>
  // ) : (
  //   <Empty />
  // );
}
