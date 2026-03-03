"use client";

import { useLocale, useTranslations } from "next-intl";
import { useNuqs } from "../../hooks/useNuqs";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SubText } from "@/components/build/typography/subText";
import {
  palletDesc,
  palleteName,
  palletHex,
  palletLast,
} from "../../assets/svgs";
import { formatPrice } from "../../utils/formatters";

export const Card = ({ el }) => {
  const t = useTranslations();
  const language = useLocale();

  const {
    id,
    templateImage,
    name,
    description,
    pricing,
    paletteKeyword,
    createdByKeyword,
    lovedByKeyword,
    styleKeyword,
  } = el;

  const [template, setTemplate] = useNuqs("template");
  const [_, setPalette] = useNuqs("palette");

  const isSelected = template == id;

  const handleSelect = () => {
    setTemplate(id);
    setPalette(null);
  };

  return (
    <Stack
      bg="white"
      gap="16px"
      w="443px"
      minH="602px"
      border={"1px solid"}
      borderColor={isSelected ? "#004143" : "transparent"}
      borderRadius={"8px"}
      _hover={{
        cursor: "pointer",
        "& img": {
          transform: "scale(1.1)",
        },
      }}
      _focus={{
        borderColor: "#004143",
        outline: "none",
      }}
      tabIndex={0}
      onClick={handleSelect}
      p="24px"
      transition="border-color 0.3s ease"
    >
      <Box
        w="100%"
        h="272px"
        overflow={"hidden"}
        borderRadius="8px"
        border="24px solid"
        borderColor="#F1F1F1"
        background={"#F1F1F1"}
        transition="all 0.3s ease"
      >
        <Image
          w="100%"
          h="100%"
          // src={formatUrl(templateImage)}
          src={templateImage}
          borderRadius="8px"
          transition="transform 0.3s ease"
        />
      </Box>

      <Flex justify="space-between" align="center">
        <Stack>
          <Text
            textStyle="xl"
            fontWeight={isSelected && "700"}
            lineHeight={"28px"}
            letterSpacing={0}
            color={isSelected ? "#0C4A4C" : "#004143"}
            transition="all 0.3s ease"
          >
            {t(name[language])}
          </Text>

          {isSelected && pricing?.discountAmount !== 0 && (
            <Text
              textDecoration="line-through"
              fontSize={"12px"}
              color={"#6B7280"}
            >
              {formatPrice(pricing?.basePrice)}
            </Text>
          )}
        </Stack>
        <Text
          border="1px solid"
          borderColor="#EFEFEF"
          p="6px 20px"
          borderRadius="8px"
          fontSize={"14px"}
          color={"#004143"}
        >
          {formatPrice(pricing?.finalPrice)}
        </Text>
      </Flex>
      <SubText
        fs="14px"
        minH="120px"
        color={isSelected && "#004143"}
        text={description[language]}
      />

      <VStack gap="16px">
        <Flex w="100%" justify={"space-between"}>
          <HStack>
            <Icon>{palleteName.icon}</Icon>
            <Text fontSize={"14px"} color={"#6B7280"}>
              {createdByKeyword[language]}
            </Text>
          </HStack>
          <HStack>
            <Icon>{palletDesc.icon}</Icon>
            <Text fontSize={"14px"} color={"#6B7280"}>
              {lovedByKeyword[language]}
            </Text>
          </HStack>
        </Flex>

        <Flex w="100%" justify={"space-between"}>
          <HStack>
            <Icon>{palletHex.icon}</Icon>
            {paletteKeyword?.colors?.map((color, index) => (
              <Box
                key={color}
                spacing={1}
                w="20px"
                h="20px"
                borderRadius="50%"
                bg={color}
                ml={index === 0 ? 0 : "-17px"}
                border={"1px solid"}
                borderColor={"white"}
              />
            ))}
          </HStack>
          <HStack>
            <Icon>{palletLast.icon}</Icon>
            <Text fontSize={"14px"} color={"#6B7280"}>
              {styleKeyword[language]}
            </Text>
          </HStack>
        </Flex>
      </VStack>
    </Stack>
  );
};
