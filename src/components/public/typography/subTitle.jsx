"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heading } from "@chakra-ui/react";

export const SubTitle = ({ text, color, textAlign }) => {
  const t = useTranslations();

  return (
    <Heading
      as="h4"
      // fontSize={"23px"}
      fontSize={{ base: "16px", md: "23px" }}
      lineHeight={{base:"26px",md:"44px"}}
      fontStyle={"italic"}
      fontWeight={400}
      textAlign={textAlign ?? "unset"}
      color={color ?? "#AC8A5F"}
    >
      {t(text)}
    </Heading>
  );
};
