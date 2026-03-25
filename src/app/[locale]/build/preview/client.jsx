"use client";

import { Box, Container } from "@chakra-ui/react";

export const PreviewClient = () => {
  return (
    <Box>
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        preview
      </Container>
    </Box>
  );
};
