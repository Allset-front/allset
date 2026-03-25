"use client";

import { useTranslations } from "next-intl";
import { Text } from "@chakra-ui/react";

export const SubText = ({ text, fs, color, minH,lineClamp }) => {
  const t = useTranslations();

  return (
    <Text
      fontWeight={400}
      fontSize={fs ?? fs}
      color={color ?? "#4B5563"}
      minH={minH}
      lineHeight={"24px"}
      letterSpacing={0}
      lineClamp={lineClamp}
    >
      {t(text)}
    </Text>
  );
};
