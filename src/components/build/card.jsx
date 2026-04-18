"use client";

import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useMediaQuery,
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

  const [{ template }, setQuery] = useQueryStates({
    template: parseAsString,
    palette: parseAsString,
  });
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const isSelected = template == id;

  const handleSelect = () => {
    setQuery({
      template: id,
      palette: null,
    });
  };

  return (
    <Stack
      bg="white"
      gap="16px"
      // w="443px"
      // minH="602px"
      w={"100%"}
      minH={{ base: "500px", md: "602px" }}
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
      p={{ base: "16px", md: "24px" }}
      transition="border-color 0.3s ease"
    >
      <Box
        w="100%"
        h="100%"
        overflow={"hidden"}
        borderRadius="8px"
        border={{ base: "0px", md: "24px solid" }}
        borderColor={{ base: "transparent", md: "#F1F1F1" }}
        background={"#F1F1F1"}
        transition="all 0.3s ease"
      >
        <Image
          w="100%"
          h="292px"
          // src={formatUrl(templateImage)}
          src={templateImage}
          borderRadius="8px"
          transition="transform 0.3s ease"
        />
      </Box>

      <Flex justify="space-between" align="center" gap={"17px"}>
        <Stack>
          <Text
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={isSelected ? 700 : 400}
            lineHeight={"28px"}
            letterSpacing={0}
            color={isSelected ? "#0C4A4C" : "#004143"}
            transition="all 0.3s ease"
            w={{ base: "fit-content", md: "165px" }}
          >
            {t(name[language])}
          </Text>

          {isSelected && pricing?.discountAmount !== 0 && (
            <Text
              textDecoration="line-through"
              fontSize={"12px"}
              color={"#6B7280"}
            >
              {formatPrice(pricing?.basePrice, t)}
            </Text>
          )}
        </Stack>
        <Text
          border="1px solid"
          borderColor="#EFEFEF"
          borderRadius="8px"
          fontSize={"14px"}
          color={"#004143"}
          p="6px 0"
          w="127px"
          textAlign="center"
          fontWeight={isSelected ? 700 : 400}
        >
          {formatPrice(pricing?.finalPrice, t)}
        </Text>
      </Flex>
      <SubText
        fs="14px"
        color={isSelected ? "#004143" : "#4B5563"}
        text={description[language]}
        lineClamp={4}
      />

      <Flex gap="46px">
        <Flex flexDirection={"column"} gap="16px">
          <HStack>
            <Icon>{palleteName.icon}</Icon>
            <Text fontSize={"14px"} color={isSelected ? "#004143" : "#6B7280"}>
              {createdByKeyword[language]}
            </Text>
          </HStack>
          <HStack>
            <Icon>{palletDesc.icon}</Icon>
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
        </Flex>

        <Flex flexDirection={"column"} gap="16px">
          <HStack>
            <Icon>{palletHex.icon}</Icon>
            <Text fontSize={"14px"} color={isSelected ? "#004143" : "#6B7280"}>
              {lovedByKeyword[language]}
            </Text>
          </HStack>
          <HStack>
            <Icon>{palletLast.icon}</Icon>
            <Text fontSize={"14px"} color={isSelected ? "#004143" : "#6B7280"}>
              {styleKeyword[language]}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Stack>
  );
};
