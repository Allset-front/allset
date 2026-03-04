"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Stack } from "@chakra-ui/react";
import { List } from "@/components/auth/invitations/guests/list";
import { useGetAuthTanstack } from "@/hooks/useTanstack";

export default function Guests() {
  const { id } = useParams();
  const { isLoading, data } = useGetAuthTanstack(`confirmations/invitation/${id}`);

  return (
    <Stack>
      <List isLoading={isLoading} data={data}/>
    </Stack>
  );
}
