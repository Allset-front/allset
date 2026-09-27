"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { parseAsString, useQueryStates } from "nuqs";
import {
  Stack,
  Image,
  Heading,
  Flex,
  Text,
  Separator,
  Button,
  Icon,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { copied, copy, editActive, guestList } from "@/assets/svgs";
import { formatDDMMYYYY } from "@/utils/formatters";
import { queryClient } from "@/providers/queryProvider";
import { BASE_URL } from "@/lib/api/config";
import { error, success } from "@/components/ui/alerts";
import img from "@/assets/imgs/active_bg.png";

export const Card = ({ el }) => {
  const t = useTranslations();
  const router = useRouter();
  const language = useLocale();
  
  const {
    id,
    templateId,
    colorPaletteId,
    finalPrice,
    expiresAt,
    publishedAt,
    createdAt,
    title,
    urlExtension,
  } = el;

  const [{ tab }, setQuery] = useQueryStates({
    tab: parseAsString,
    template: parseAsString,
    palette: parseAsString,
    id: parseAsString,
  });

  const isNotDraft = tab !== "drafts";

  const [isCopied, setIsCopied] = useState(false);

  const fullUrl = `${BASE_URL}${language}/invitation/${urlExtension ?? ""}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      success(t("url_copy"));
    } catch (err) {
      error("Failed to copy: ", err);
    }
  };

  const handleNavigate = () => {
    setQuery({
      template: templateId,
      palette: colorPaletteId,
      id: id,
    });
    queryClient.invalidateQueries({
      queryKey: [`invitations/${id}`],
      refetchType: "all",
    });
    router.push(
      `/build/details?template=${templateId}&palette=${colorPaletteId}&id=${id}`,
    );
  };

  return (
    <Stack
      w="307px"
      gap={"12px"}
      p="12px"
      bg="white"
      borderRadius={"10px"}
      border={"1px solid"}
      borderImageSource={
        "linear-gradient(235.09deg, #FFFFFF 1.06%, #E8E8E8 106.39%)"
      }
      borderImageSlice={1}
      boxShadow="0px 4px 10px 0px #0041431A"
    >
      <Image src={img.src} alt="img" borderRadius={"10px"} />

      <Stack>
        <Heading as="h4" fontSize={"18px"} fontWeight={700}>
          {title[language]}
        </Heading>

        <Flex justify={"space-between"}>
          {finalPrice && (
            <Text fontSize={"14px"} fontWeight={700} color={"#6B7280"}>
              {finalPrice} {t("currency")}
            </Text>
          )}
          {/* <Text fontSize={"14px"} fontWeight={500} color={"#6B7280"}>
            Guest RSVP 210
          </Text> */}
        </Flex>
      </Stack>
      <Separator />

      <Stack>
        {expiresAt && (
          <Text
            w="100%"
            border={"1px solid"}
            borderColor={" #1A1A1A1A"}
            borderRadius={"32px"}
            py="7.5px"
            textAlign={"center"}
            fontSize={"12px"}
            fontWeight={400}
          >
            Exp.date: {formatDDMMYYYY(expiresAt)}
          </Text>
        )}
        <Text
          w="100%"
          border={"1px solid"}
          borderColor={" #1A1A1A1A"}
          borderRadius={"32px"}
          py="7.5px"
          textAlign={"center"}
          fontSize={"12px"}
          fontWeight={400}
        >
          {publishedAt
            ? `Pub.date: ${formatDDMMYYYY(publishedAt)}`
            : `Create.date: ${formatDDMMYYYY(createdAt)}`}
        </Text>
      </Stack>

      <Flex gap={"8px"}>
        {isNotDraft && (
          <Button
            flex="1"
            h="52px"
            bg="#004143"
            borderRadius={"10px"}
            color="#FFFFFF"
            fontSize="14px"
            fontWeight="500"
            border="1px solid"
            borderColor="#FFFFFF"
            _hover={{
              bg: "#FFFFFF",
              color: "#004143",
              borderColor: "#004143",
              "& path": {
                fill: "#004143",
                transition: "all 0.3s ease",
              },
            }}
            transition="all 0.3s ease"
            onClick={() => router.push(`invitations/${id}/guests`)}
          >
            <Icon>{guestList.icon}</Icon>
            {t("guests")}
          </Button>
        )}
        {isNotDraft && urlExtension && (
          <Tooltip
            positioning={{ placement: "top" }}
            content={isCopied ? t("copied") : t("copy")}
          >
            <Button
              w="52px"
              h="52px"
              bg="transparent"
              borderRadius={"10px"}
              border={"1px solid"}
              borderColor={isCopied ? "#004143" : "#80A0A1"}
              css={{ "& path": { fill: "#004143" } }}
              _hover={{
                borderColor: "#004143",
              }}
              transition="all 0.3s ease"
              onClick={handleCopy}
            >
              <Icon>{isCopied ? copied.icon : copy.icon}</Icon>
            </Button>
          </Tooltip>
        )}
        <Tooltip positioning={{ placement: "top" }} content={t("edit")}>
          <Button
            w={isNotDraft ? "52px" : "100%"}
            h="52px"
            bg="transparent"
            borderRadius={"10px"}
            border={"1px solid"}
            borderColor={"#80A0A1"}
            _hover={{
              borderColor: "#004143",
              "& path": {
                fill: "#004143",
                transition: "all 0.3s ease",
              },
            }}
            transition="all 0.3s ease"
            onClick={handleNavigate}
          >
            <Icon>{editActive.icon}</Icon>
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};
