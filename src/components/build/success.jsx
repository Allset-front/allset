"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Image,
  Stack,
  Flex,
  Text,
  Separator,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import img from "@/assets/imgs/success.png";
import { Link, useRouter } from "@/i18n/routing";
import { share } from "@/assets/svgs";
import { error, info, success } from "../ui/alerts";
import { BASE_URL } from "@/lib/api/config";

export const Success = ({ open, setQuery, language, urlExtension, price }) => {
  const t = useTranslations();
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const fullUrl = `${BASE_URL}${language}/invitation/${urlExtension}`;

  const handleClose = async () => {
    await setQuery({ status: null });
  };

  const handleCopy = async () => {
    if (isCopied) return info("URL is in clipboard!");

    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      success("URL copied successfully.");
    } catch (err) {
      error("Failed to copy: ", err);
    }
  };

  return (
    <Dialog.Root
      open={open}
      //   modal={false}
      onOpenChange={(e) => {
        if (!e.open) {
          handleClose();
        }
      }}
      placement="center"
      motionPreset="slide-in-bottom"
      as="form"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack
                align={"center"}
                justify={"center"}
                textAlign={"center"}
                gap="32px"
                w="full"
                pt="28px"
              >
                <Image src={img.src} alt="img" w="80px" />
                <Dialog.Title
                  color={"#0F1726"}
                  fontWeight={600}
                  fontSize={"28px"}
                >
                  {t("success_title")}
                </Dialog.Title>
              </Stack>
            </Dialog.Header>
            <Dialog.Body>
              <Text
                textAlign={"center"}
                color={"#60697D"}
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
              >
                {t("success_desc_1")}
                {price ?? `20.000 ${t("currency")}`}
                {t("success_desc_1_2")}
                <br />
                {t("success_desc_2")}
              </Text>

              <Separator m="20px 0" />

              <Flex justify={"space-between"}>
                <Stack>
                  <Text color={"#949EB0"} fontWeight={400}>
                    {t("success_order")}
                  </Text>
                  <Text color={"#949EB0"} fontWeight={400}>
                    {t("success_price")}
                  </Text>
                </Stack>

                <Stack align={"flex-end"}>
                  <Text color={"#004143"} fontWeight={500}>
                    #INV-2025-4821
                  </Text>
                  <Text color={"#004143"} fontWeight={500}>
                    {price ?? `20.000 ${t("currency")}`}
                  </Text>
                </Stack>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer flexDirection={"column"} gap="12px">
              <Button
                w="100%"
                h="52px"
                gap="16px"
                bg="#004143"
                color="white"
                fontSize="16px"
                fontWeight="500"
                border="1px solid"
                borderColor="white"
                boxShadow="xl"
                _hover={{
                  bg: "white",
                  color: "#004143",
                  borderColor: "#004143",
                  "& path": {
                    fill: "#004143",
                    transition: "all 0.3s ease",
                  },
                }}
                transition="all 0.3s ease"
                onClick={handleCopy}
              >
                <Icon>{share.icon}</Icon>
                {t("success_copy")}
              </Button>
              <Button
                w="100%"
                h="52px"
                fontSize="16px"
                fontWeight="500"
                variant="outline"
                border="1px solid"
                borderColor="#004143"
                onClick={() => router.push("/auth/invitations")}
              >
                {t("success_go")}
              </Button>
              <ChakraLink
                as={Link}
                href={`/`}
                color={"#6B788C"}
                borderBottom="1px solid"
                borderRadius="none"
                borderColor="#6B788C"
                fontSize={"14px"}
                fontWeight={400}
              >
                {t("back_home")}
              </ChakraLink>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
