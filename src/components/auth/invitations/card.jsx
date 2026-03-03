"use client";

import React from "react";
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
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useQueryState } from "nuqs";

export const Card = ({ el }) => {
  const router = useRouter();
  const language = useLocale();

  const [tab] = useQueryState("tab", {
    defaultValue: "active",
  });

  console.log(el);

  const { id, publishedAt, title } = el;

  return (
    <Stack
      w="307px"
      h="550px"
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
          <Text fontSize={"14px"} fontWeight={700} color={"#6B7280"}>
            AMD
          </Text>
          <Text fontSize={"14px"} fontWeight={500} color={"#6B7280"}>
            Guest RSVP 210
          </Text>
        </Flex>
      </Stack>
      <Separator />

      <Stack>
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
          Exp.date:
        </Text>
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
          Pub.date: {formatDDMMYYYY(publishedAt)}
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
        >
          <Icon onClick={() => router.push(`invitations/${tab}/${id}/guests`)}>
            {guestList.icon}
          </Icon>
          Guest list
        </Button>
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
        >
          <Icon>{editActive.icon}</Icon>
        </Button>
      </Flex>
    </Stack>
  );
};
