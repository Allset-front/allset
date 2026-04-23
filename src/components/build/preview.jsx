"use client";

import { useQueryState } from "nuqs";
import { Box, Flex, Stack, useMediaQuery, VStack } from "@chakra-ui/react";
import { MidText } from "@/components/build/typography/midText";
import { SubText } from "@/components/build/typography/subText";
import { ViewportToggle } from "@/components/build/viewportToggle";
import { InvitationFrame } from "@/components/invitation/InvitationFrame";
import { DEFAULT_VIEWPORT } from "@/components/invitation/theme/viewports";

export const Preview = ({ template, palette, data }) => {
  const [device] = useQueryState("device", { defaultValue: DEFAULT_VIEWPORT });
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  return (
    <VStack
      flex="1"
      minW="0"
      w="100%"
      minH="100%"
      bg="white"
      borderRadius={"8px"}
      p={{ base: "0", md: "24px" }}
      gap={{ base: "0", md: "32px" }}
    >
      <Flex w="100%" justify={"space-between"} align={"center"}>
        {!isMobile && (
          <Stack gap={"8px"}>
            <MidText text="template_preview" />
            <SubText fs="14px" text="template_desc" />
          </Stack>
        )}

        <ViewportToggle display={{ base: "none", md: "flex" }} />
      </Flex>

      <Box position="relative" w="100%" h={{ base: "430px", md: "685px" }}>
        <InvitationFrame
          viewport={device}
          palette={palette}
          template={template}
          data={data}
          height="100%"
        />

        <ViewportToggle
          position="absolute"
          display={{ base: "flex", md: "none" }}
          top="8px"
          right="8px"
          zIndex={2}
          bg="whiteAlpha.800"
          borderRadius="6px"
          p="2px"
        />
      </Box>
    </VStack>
  );
};
