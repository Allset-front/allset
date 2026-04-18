"use client";

import { useTranslations } from "next-intl";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Button,
  Circle,
  Float,
  For,
  Menu,
  Portal,
  Show,
  Link as ChakraLink,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { Link, usePathname } from "@/i18n/routing";
import { authPages } from "@/utils/constants";

export const OAuth = ({ bg, noMenu = false }) => {
  const t = useTranslations();
  const pathname = usePathname();

  const { isLoading, user, loginWithPopup, logout } = useAuth0();

  if (noMenu && user) {
    return (
      <Stack gap="20px">
        <For each={authPages}>
          {(el) => {
            const isActive = pathname?.includes(el);

            return el === "logout" ? (
              <ChakraLink
                key={el}
                onClick={logout}
                bg="transparent"
                color="#4B5563"
                fontSize="16px"
                fontWeight="300"
                lineHeight="24px"
                w="fit-content"
              >
                {t("logout")}
              </ChakraLink>
            ) : (
              <ChakraLink
                key={el}
                as={Link}
                outline="none"
                href={`/auth/${el}`}
                bg="transparent"
                borderBottom={isActive ? "2px solid #4B5563" : "none"}
                color={isActive ? "#004143" : "#4B5563"}
                fontSize={"16px"}
                fontWeight={isActive ? "500" : "300"}
                lineHeight="24px"
                w="fit-content"
                // w="100%"
                // display="flex"
                // justifyContent="center"
              >
                {t(el)}
              </ChakraLink>
            );
          }}
        </For>
      </Stack>
    );
  }

  if (!user) {
    return (
      <Flex
        gap="16px"
        w="fit-content"
        flexDirection={{ base: "row-reverse", md: "unset" }}
      >
        <Button
          w="60px"
          variant="ghost"
          color="#004143"
          fontWeight="300"
          lineHeight="24px"
          loading={isLoading}
          onClick={loginWithPopup}
        >
          {t("login")}
        </Button>

        <Button
          w="171px"
          bg="#004143"
          color="white"
          fontWeight="300"
          lineHeight="24px"
          border="1px solid"
          borderColor="white"
          boxShadow="xl"
          _hover={{ bg: "white", color: "#004143", borderColor: "#004143" }}
          transition="all 0.3s ease"
          loading={isLoading}
          onClick={() =>
            loginWithPopup({
              authorizationParams: { screen_hint: "signup" },
            })
          }
        >
          {t("signup")}
        </Button>
      </Flex>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {user ? (
          <Button variant="plain" p="0">
            <Avatar.Root size="xs">
              <Avatar.Fallback name={user?.given_name} />
              <Avatar.Image src={user?.picture || ""} />
              <Float>
                <Circle size="2" bg="green" />
              </Float>
            </Avatar.Root>
            {t("hi")}, {user?.given_name}
          </Button>
        ) : (
          <Flex
            gap="16px"
            w="fit-content"
            flexDirection={{ base: "row-reverse", md: "unset" }}
          >
            <Button
              w="60px"
              variant="ghost"
              color="#004143"
              fontWeight="400"
              lineHeight="24px"
              loading={isLoading}
              onClick={loginWithPopup}
            >
              {t("login")}
            </Button>

            <Button
              w="171px"
              bg="#004143"
              color="white"
              fontWeight="400"
              lineHeight="24px"
              border="1px solid"
              borderColor="white"
              boxShadow="xl"
              _hover={{ bg: "white", color: "#004143", borderColor: "#004143" }}
              transition="all 0.3s ease"
              loading={isLoading}
              onClick={() =>
                loginWithPopup({
                  authorizationParams: { screen_hint: "signup" },
                })
              }
            >
              {t("signup")}
            </Button>
          </Flex>
        )}
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Show when={user}>
            <Menu.Content w="auto" minW="unset" autoFocus={false} bg={bg}>
              <For each={authPages}>
                {(el) => {
                  const isActive = pathname?.includes(el);

                  return (
                    <Menu.Item key={el}>
                      {el === "logout" ? (
                        <ChakraLink
                          onClick={logout}
                          bg="transparent"
                          color="#4B5563"
                          fontWeight="400"
                          fontSize="14px"
                          borderRadius="8px"
                          lineHeight="24px"
                          w="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          {t("logout")}
                        </ChakraLink>
                      ) : (
                        <ChakraLink
                          as={Link}
                          outline="none"
                          textDecoration={isActive && "underline"}
                          href={`/auth/${el}`}
                          bg="transparent"
                          color={isActive ? "#013220" : "#4B5563"}
                          fontWeight="400"
                          fontSize="14px"
                          borderRadius="8px"
                          lineHeight="24px"
                          w="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          {t(el)}
                        </ChakraLink>
                      )}
                    </Menu.Item>
                  );
                }}
              </For>
            </Menu.Content>
          </Show>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
