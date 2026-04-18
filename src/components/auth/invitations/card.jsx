"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
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
import img from "@/assets/imgs/active_bg.png";
import { editActive, guestList } from "@/assets/svgs";
import { formatDDMMYYYY } from "@/utils/formatters";
import { Tooltip } from "@/components/ui/tooltip";
import { parseAsString, useQueryStates } from "nuqs";

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
  } = el;

  const [, setQuery] = useQueryStates({
    template: parseAsString,
    palette: parseAsString,
    id: parseAsString,
  });

  const handleNavigate = () => {
    setQuery({
      template: templateId,
      palette: colorPaletteId,
      id: id,
    });
    router.push(
      `/build/details?template=${templateId}&palette=${colorPaletteId}&id=${id}`,
    );
  };

  return (
    <Stack
      w="307px"
      // h="550px"
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
        <Button
          w="223px"
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
        <Tooltip positioning={{ placement: "top" }} content={t("edit")}>
          <Button
            w="52px"
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
