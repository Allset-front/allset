"use client";

import { Box, Container, Flex } from "@chakra-ui/react";
import { GoBack } from "./goBack";
import { Continue } from "./continue";
import { Steps } from "./steps";

export const BottomPart = () => {
  return (
    <Box
      w="100%"
      boxShadow="sm"
      bg="white"
      py={{ base: "24px", md: "32px" }}
      position={"sticky"}
      bottom={"0"}
      left={"0"}
      zIndex={10}
    >
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex
          gap="24px"
          justify="space-between"
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <Steps />
          <Flex
            gap={{ base: "16px", md: "8px" }}
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <GoBack />
            <Continue />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
