"use client";

import { useQueryState } from "nuqs";
import {
  Button,
  Flex,
  For,
  HStack,
  Image,
  Stack,
  useMediaQuery,
  VStack,
  Box
} from "@chakra-ui/react";
import { MidText } from "@/components/build/typography/midText";
import { SubText } from "@/components/build/typography/subText";
import { responsive } from "@/utils/constants";
import img from "@/assets/imgs/customisations.png";

export const Preview = () => {
  const [device, setDevice] = useQueryState("device");
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  return (
    <VStack
      w="100%"
      minH="100%"
      bg="white"
      borderRadius={"8px"}
      p={{ base: "0", md: "24px" }}
      gap={{ base: "0", md: "32px" }}
    >
      <Flex w="100%" justify={"space-between"}>
        {!isMobile && (
          <Stack gap={"8px"}>
            <MidText text="template_preview" />
            <SubText fs="14px" text="template_desc" />
          </Stack>
        )}

        <HStack display={{ base: "none", md: "flex" }}>
          <For each={responsive}>
            {({ id, name, icon }) => (
              <Button
                key={id}
                variant={device === name ? "subtle" : "ghost"}
                onClick={() => setDevice(name)}
                p="0"
                gap="0"
              >
                {icon}
              </Button>
            )}
          </For>
        </HStack>
      </Flex>

      {/* <Image
        w="100%"
        h={{ base: "430px", md: "685px" }}
        objectFit={"cover"}
        src={img.src}
        borderRadius={"8px"}
        // p={"60px 25px 0 25px"}
      /> */}

      <Box position="relative" w="100%"  h={{ base: "430px", md: "685px" }}>
        <Image
          w="100%"
          h="100%"
          objectFit={"cover"}
          src={img.src}
          borderRadius={"8px"}
        />

        <HStack
          position={{ base: "absolute", md: "static" }}
          display={{ base: "flex", md: "none" }}
          top="8px"
          right="8px"
          zIndex={2}
        >
          <For each={responsive}>
            {({ id, name, icon }) => (
              <Button
                key={id}
                variant={device === name ? "subtle" : "ghost"}
                onClick={() => setDevice(name)}
                p="0"
                gap="0"
              >
                {icon}
              </Button>
            )}
          </For>
        </HStack>
      </Box>
    </VStack>
  );
};
