"use client";

import { useQueryState } from "nuqs";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { useGetTanstack, useGetAuthTanstack } from "@/hooks/useTanstack";
import { Animate } from "@/components/ui/animate";
import { MidText } from "@/components/build/typography/midText";
import { ViewportToggle } from "@/components/build/viewportToggle";
import { InvitationFrame } from "@/components/invitation/InvitationFrame";
import { DEFAULT_VIEWPORT } from "@/components/invitation/theme/viewports";

export const PreviewClient = () => {
  const [template] = useQueryState("template");
  const [paletteId] = useQueryState("palette");
  const [id] = useQueryState("id");
  const [device] = useQueryState("device", { defaultValue: DEFAULT_VIEWPORT });

  const { data: templates } = useGetTanstack("templates");
  const { data: draft } = useGetAuthTanstack(`invitations/${id}`, !!id);

  const selectedTemplate =
    templates?.find((t) => t.id === template) || null;
  const selectedPalette =
    selectedTemplate?.palettes?.find((p) => p.id === paletteId) ||
    selectedTemplate?.palettes?.[0] ||
    null;

  return (
    <Animate>
      <VStack
        pt={{ base: "32px", md: "48px" }}
        w="100%"
        bg="white"
        borderRadius={"8px"}
        p={{ base: "16px", md: "24px" }}
        gap={{ base: "16px", md: "24px" }}
        mb="40px"
      >
        <Flex w="100%" justify="space-between" align="center">
          <MidText text="template_preview" />
          <ViewportToggle />
        </Flex>

        <Box w="100%">
          <InvitationFrame
            viewport={device}
            template={selectedTemplate}
            palette={selectedPalette}
            data={draft}
            maxHeight="80vh"
          />
        </Box>
      </VStack>
    </Animate>
  );
};
