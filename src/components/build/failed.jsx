"use client";

import React from "react";
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
import { Link, useRouter } from "@/i18n/routing";

export const Failed = ({ open, setQuery }) => {
  const router = useRouter();

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
                Your payment could not be processed. <br /> Please check your
                details and try again.
              </Text>

              <Separator m="20px 0" />

              <Flex justify={"space-between"}>
                <Stack>
                  <Text color={"#949EB0"} fontWeight={400}>
                    Reason
                  </Text>
                  <Text color={"#949EB0"} fontWeight={400}>
                    Amount
                  </Text>
                </Stack>

                <Stack align={"flex-end"}>
                  <Text color={"#E0272C"} fontWeight={500}>
                    Insufficient funds
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
                Try Again
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
                Use Different Payment Method
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
