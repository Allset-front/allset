"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useIsFetching } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { joinFilters } from "@/utils/formatters";
import { IconButton, Skeleton } from "@chakra-ui/react";
import { downloadGuest } from "@/assets/svgs";
import { isEmptyArray } from "@/utils/checkers";
import { downloadGuestList } from "@/services/download";
import { useGetAuthTanstack } from "@/hooks/useTanstack";

export const Download = () => {
  const t = useTranslations();

  const { id } = useParams();

  const [filters] = useQueryState("filters");

  const isFetching = useIsFetching({
    queryKey: [`confirmations/invitation/${id}/tables`],
  });

  const { data: guests } = useGetAuthTanstack(
    `confirmations/invitation/${id}?filterId=${joinFilters(filters)}`,
  );

  const handleDownload = () => {
    downloadGuestList(guests, t);
  };

  if (isFetching) {
    return <Skeleton w="177px" h="44px" />;
  }

  if (isEmptyArray(guests)) {
    return;
  }

  return (
    <IconButton
      px="3px"
      h="44px"
      color={"#004143"}
      variant="ghost"
      onClick={handleDownload}
    >
      {downloadGuest.icon} {t("download_guest_list")}
    </IconButton>
  );
};
