"use client";

import { Button, For, HStack } from "@chakra-ui/react";
import { useQueryState } from "nuqs";
import { responsive } from "@/utils/constants";
import { DEFAULT_VIEWPORT } from "@/components/invitation/theme/viewports";

export const ViewportToggle = ({ size, ...rest }) => {
  const [device, setDevice] = useQueryState("device", {
    defaultValue: DEFAULT_VIEWPORT,
  });

  return (
    <HStack {...rest}>
      <For each={responsive}>
        {({ id, name, icon }) => (
          <Button
            key={id}
            size={size}
            variant={device === name ? "subtle" : "ghost"}
            onClick={() => setDevice(name)}
            p="0"
            gap="0"
            aria-label={`preview-${name}`}
            aria-pressed={device === name}
          >
            {icon}
          </Button>
        )}
      </For>
    </HStack>
  );
};
