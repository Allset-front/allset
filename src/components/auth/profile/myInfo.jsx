"use client";

import React, { useRef, useState } from "react";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import { queryClient } from "@/providers/queryProvider";
import { error, success } from "@/components/ui/alerts";
import { Field, Input, Skeleton, Stack, Text } from "@chakra-ui/react";

export const MyInfo = ({ isLoading, data }) => {
  const timers = useRef({});
  const [edited, setEdited] = useState({});

  const { mutate } = useMutateAuthTanstack("user", "patch", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      success("Personal info has been changed.");
    },
    onError: (err) =>
      error(err?.response?.data?.error || "Personal info editing error!"),
  });


  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setEdited((prev) => ({ ...prev, [field]: value }));

    clearTimeout(timers.current[field]);

    timers.current[field] = setTimeout(() => {
      if (value !== data?.[field]) {
        mutate({ [field]: value });
      }
    }, 700);
  };

  if (isLoading) return <Skeleton w="672px" h="394px" borderRadius={"8px"} />;

  const val = (key) => edited[key] ?? data?.[key] ?? "";

  return (
    <Stack borderRadius="8px" bg="white" p="24px" gap="16px">
      <Text fontSize={"16px"} color={"#4B5563"} fontWeight={"500"}>
        My information
      </Text>

      <Field.Root>
        <Field.Label fontSize="12px" color="#6B7280">
          Full name
        </Field.Label>
        <Input
          value={val("name")}
          onChange={handleChange("name")}
          //
          variant="subtle"
          borderRadius={"4px"}
          bg="#F9FAFB"
          w="624px"
          h="52px"
          placeholder="Name Surname"
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontSize="12px" color="#6B7280">
          Phone number
        </Field.Label>
        <Input
          value={val("phoneNumber")}
          onChange={handleChange("phoneNumber")}
          //
          variant="subtle"
          borderRadius={"4px"}
          bg="#F9FAFB"
          w="624px"
          h="52px"
          placeholder="+374 XX XXXXXX"
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontSize="12px" color="#6B7280">
          E-mail address
        </Field.Label>
        <Input
          defaultValue={data?.email}
          disabled
          //
          variant="subtle"
          borderRadius={"4px"}
          bg="#F9FAFB"
          w="624px"
          h="52px"
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontSize="12px" color="#6B7280">
          Date of birth
        </Field.Label>
        <Input
          value={val("dateOfBirth")}
          onChange={handleChange("dateOfBirth")}
          //
          variant="subtle"
          borderRadius={"4px"}
          bg="#F9FAFB"
          w="624px"
          h="52px"
          placeholder="DD/MM/YYYY"
        />
      </Field.Root>
    </Stack>
  );
};
