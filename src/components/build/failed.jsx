"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
} from "@chakra-ui/react";
import img from "@/assets/imgs/failed.png";
import { Link } from "@/i18n/routing";

export const Failed = ({ open, setQuery }) => {
  const t = useTranslations();

  const handleClose = async () => {
    await setQuery({ status: null });
  };

  const handleChangePayment = () => {
    handleClose();
    setQuery({ payment: null });
  };

  return (
    <Dialog.Root
      open={open}
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
                  {t("failed_title")}
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
                {t("failed_desc_1")} <br /> {t("failed_desc_2")}
              </Text>

              <Separator m="20px 0" />

              <Flex justify={"space-between"}>
                <Stack>
                  <Text color={"#949EB0"} fontWeight={400}>
                    {t("failed_reason")}
                  </Text>
                  <Text color={"#949EB0"} fontWeight={400}>
                    {t("failed_amount")}
                  </Text>
                </Stack>

                <Stack align={"flex-end"}>
                  <Text color={"#E0272C"} fontWeight={500}>
                    {t("failed_insufficient")}
                  </Text>
                  <Text color={"#004143"} fontWeight={500}>
                    20.000 AMD
                  </Text>
                </Stack>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer flexDirection={"column"} gap="12px">
              <Button
                w="100%"
                h="52px"
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
                }}
                transition="all 0.3s ease"
                onClick={handleClose}
              >
                {t("failed_try")}
              </Button>
              <Button
                w="100%"
                h="52px"
                fontSize="16px"
                fontWeight="500"
                variant="outline"
                border="1px solid"
                borderColor="#004143"
                onClick={handleChangePayment}
              >
                {t("failed_again")}
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
