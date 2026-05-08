"use client";

import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { Link, usePathname } from "@/i18n/routing";
import { mainPages } from "@/utils/constants";
import { Flex, For, Link as ChakraLink } from "@chakra-ui/react";

export const Navigation = ({ direction }) => {
  const t = useTranslations();
  const pathname = usePathname();

  const [_, setQuery] = useQueryStates({ template: parseAsString });

  return (
    <Flex gap="20px" flexDirection={direction ?? "unset"}>
      <For each={mainPages}>
        {({ name, path }) => {
          const isActive = pathname === `/${path}`;
          const disabled = pathname?.includes(path);
          // TODO: disable
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
              onClick={() => template && setQuery({ template: null })}
            >
              {t(name)}
            </ChakraLink>
          );
        }}
      </For>
    </Flex>
  );
};
