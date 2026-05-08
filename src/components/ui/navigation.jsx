"use client";

import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { Link, usePathname } from "@/i18n/routing";
import { mainPages } from "@/utils/constants";
import { Flex, For, Link as ChakraLink, Box } from "@chakra-ui/react";

export const Navigation = ({ direction }) => {
  const t = useTranslations();
  const pathname = usePathname();

  const [_, setQuery] = useQueryStates({ template: parseAsString });

  return (
    <Flex gap="20px" flexDirection={direction ?? "unset"}>
      <For each={mainPages}>
        {({ name, path }) => {
          const isActive = pathname === `/${path}`;

          return isActive ? (
            <Box
              key={path}
              as="span"
              borderBottom={"2px solid"}
              borderColor={"#4B5563"}
              color={"#004143"}
              fontSize={"16px"}
              fontWeight={"500"}
              w="fit-content"
              cursor="default"
              pointerEvents="none" 
              aria-current="page"
            >
              {t(name)}
            </Box>
          ) : (
            <ChakraLink
              key={path}
              href={`/${path}`}
              as={Link}
              borderBottom={"2px solid"}
              borderColor={"transparent"}
              color={"#4B5563"}
              fontSize={"16px"}
              fontWeight={"300"}
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

// return (
//   <ChakraLink
//     key={path}
//     href={`/${path}`}
//     as={Link}
//     borderBottom={"2px solid"}
//     borderColor={isActive ? "#4B5563" : "transparent"}
//     color={isActive ? "#004143" : "#4B5563"}
//     fontSize={"16px"}
//     fontWeight={isActive ? "500" : "300"}
//     borderRadius="0"
//     w="fit-content"
//     outline={"none"}
//     onClick={() => template && setQuery({ template: null })}
//   >
//     {t(name)}
//   </ChakraLink>
// );