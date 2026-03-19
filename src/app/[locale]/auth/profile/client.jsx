"use client";

import React from "react";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { Flex, Stack } from "@chakra-ui/react";
import { Me } from "@/components/auth/profile/me";
import { Info } from "@/components/auth/profile/info";
import { Promocode } from "@/components/auth/profile/promocode";
import { Referal } from "@/components/auth/profile/referal";
import { Opt } from "@/components/auth/profile/opt";

export const ProfileClient = () => {
  const { isLoading, data } = useGetAuthTanstack("user");

  return (
    <Stack gap="16px">
      <Me isLoading={isLoading} data={data} />
      <Flex w="100%" gap="16px" flexDirection={{ base: "column", md: "row" }}>
        <Info isLoading={isLoading} data={data} />
        <Stack w="100%" gap="16px">
          <Promocode code={data?.appliedPromoCodes} />
          <Opt />
          <Referal code={data?.referralCode} />
        </Stack>
      </Flex>
    </Stack>
  );
};
