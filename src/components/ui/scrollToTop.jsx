"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { scrollToTopWithDuration } from "@/utils/helpers";
import { Button } from "@chakra-ui/react";
import { HiArrowNarrowUp } from "react-icons/hi";

export const ScrollToTop = () => {
  const isVisible = useScrollPosition(300);

  if (!isVisible) return;

  return (
    <Button
      onClick={() => scrollToTopWithDuration(1000)}
      position="fixed"
      right={"10px"}
      bottom={"70px"}
      zIndex="101"
      bg="#004143"
      border="1px solid"
      borderColor="white"
      boxShadow="xl"
      aria-label="Scroll to top"
      fontWeight="400"
      transition="all 0.3s ease"
      p={{ base: 0, md: "12px" }}
      _hover={{ bg: "white", color: "#004143", borderColor: "#004143" }}
    >
      <HiArrowNarrowUp />
    </Button>
  );
};
