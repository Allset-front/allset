"use client";

import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Actions } from "./invitations/actions";

export const Head = ({ text }) => {
  const t = useTranslations();

  return (
    <Flex align={"center"} justify={"space-between"} pb={"16px"}>
      <Heading
        as="h2"
        fontSize={{ base: "20px", md: "28px" }}
        fontWeight="500"
        color={"#4B5563"}
        w="100%"
        // borderBottom={shouldShowBorder ? "1px solid" : "none"}
        // borderImageSource={
        //   shouldShowBorder
        //     ? "linear-gradient(90deg, #E7E7E7 0%, #F9FAFB 72.18%)"
        //     : "none"
        // }
        // borderImageSlice={shouldShowBorder ? 1 : 0}
      >
        {t(text)}
      </Heading>
      <Actions />
    </Flex>
  );
};
