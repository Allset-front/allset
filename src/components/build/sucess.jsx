"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
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

export const Sucess = ({ status, setQuery }) => {
  const language = useLocale();
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const fullUrl = `${BASE_URL}${language}/invitation/`;

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
      open={status}
      onOpenChange={(e) => {
        if (!e.open) {
          handleClose();
        }
      }}
      F
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
                  Payment Successful!
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
                Your payment of 20 000 AMD has been processed successfully.{" "}
                <br /> Your invitation is now ready. Start inviting guests.
              </Text>

              <Separator m="20px 0" />

              <Flex justify={"space-between"}>
                <Stack>
                  <Text color={"#949EB0"} fontWeight={400}>
                    Order ID
                  </Text>
                  <Text color={"#949EB0"} fontWeight={400}>
                    Amount paid
                  </Text>
                </Stack>

                <Stack align={"flex-end"}>
                  <Text color={"#004143"} fontWeight={500}>
                    #INV-2025-4821
                  </Text>
                  <Text color={"#004143"} fontWeight={500}>
                    20.000 AMD
                  </Text>
                </Stack>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer flexDirection={"column"} gap="12px">
              {/* <Dialog.ActionTrigger asChild>
                <Button w="100%" variant="outline">
                  Cancel
                </Button>
              </Dialog.ActionTrigger> */}
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
                Copy Invitation Link
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
                Go to Invitations
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
                Back to Home
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
