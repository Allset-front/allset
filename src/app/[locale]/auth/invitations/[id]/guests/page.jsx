"use client";

import React from "react";
import { Stack } from "@chakra-ui/react";
import { Head } from "@/components/auth/invitations/guests/head";
import { List } from "@/components/auth/invitations/guests/list";

export default function Guests() {
  return (
    <Stack gap="16px">
      <Head />
      <List />
    </Stack>
  );
}
