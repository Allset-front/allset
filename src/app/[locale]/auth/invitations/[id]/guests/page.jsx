"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { Stack } from "@chakra-ui/react";
import { Head } from "@/components/auth/invitations/guests/head";
import { List } from "@/components/auth/invitations/guests/list";

export default function Guests() {
  const { id } = useParams();
  const { isLoading, data } = useGetAuthTanstack(
    `confirmations/invitation/${id}`,
  );

  return (
    <Stack gap="16px">
      <Head />
      <List isLoading={isLoading} data={data} />
    </Stack>
  );
}
