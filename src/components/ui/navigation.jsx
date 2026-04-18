"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { mainPages } from "@/utils/constants";
import { Flex, For, Link as ChakraLink } from "@chakra-ui/react";

export const Navigation = ({ direction }) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Flex gap="20px" flexDirection={direction ?? "unset"}>
      <For each={mainPages}>
        {({ name, path }) => {
          const isActive = pathname === `/${path}`;

          return (
            <ChakraLink
              key={path}
              href={`/${path}`}
              as={Link}
              borderBottom={"2px solid"}
              borderColor={isActive ? "#4B5563" : "transparent"}
              color={isActive ? "#004143" : "#4B5563"}
              fontSize={"16px"}
              fontWeight={isActive ? "500" : "300"}
              borderRadius="0"
              w="fit-content"
              outline={"none"}
            >
              {t(name)}
            </ChakraLink>
          );
        }}
      </For>
    </Flex>
  );
};
