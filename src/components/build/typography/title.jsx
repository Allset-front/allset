"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heading } from "@chakra-ui/react";

export const Title = ({ text }) => {
  const t = useTranslations();

  return (
    <Heading
      as="h1"
      fontWeight={"700"}
      fontSize={{ base: "26px", md: "28px" }}
      letterSpacing={"0"}
      textAlign="center"
    >
      {t(text)}
    </Heading>
  );
};
