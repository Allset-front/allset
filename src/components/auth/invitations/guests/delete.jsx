"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import { queryClient } from "@/providers/queryProvider";
import { Button } from "@chakra-ui/react";
import { error, success } from "@/components/ui/alerts";

export const Delete = ({ id, guestId }) => {
  const t = useTranslations();

  const { mutate } = useMutateAuthTanstack(
    `confirmations/${guestId}`,
    "delete",
    {
      onSuccess: () => {
        // invitation by id,tables,stats
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.startsWith(`confirmations/invitation/${id}`),
        });
        success("Guest deleted.");
      },
      onError: (err) =>
        error(err?.response?.data?.error || "Guest deleting error!"),
    },
  );

  const hanldeDelete = (e) => {
    e.stopPropagation();
    mutate();
  };

  return (
    <Button
      w="100%"
      variant="plain"
      outline="none"
      _hover={{ bg: "#CF2B2B", color: "#FFFFFF" }}
      onClick={hanldeDelete}
    >
      {t("delete")}
    </Button>
  );
};
