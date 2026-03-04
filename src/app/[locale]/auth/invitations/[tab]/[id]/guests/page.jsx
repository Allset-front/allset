"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Box, Stack } from "@chakra-ui/react";
import { List } from "@/components/auth/invitations/guests/list";

export default function Guests() {
  const params = useParams();
  const { id, tab } = params;

  return (
    <Stack>
      <List />
    </Stack>
  );
}
