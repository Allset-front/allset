"use client";

import { useQueryState } from "nuqs";
import {
  Box,
  Text,
  VStack,
  HStack,
  Stack,
  For,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { MidText } from "@/components/build/typography/midText";
import { SubText } from "@/components/build/typography/subText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Aside = ({ data, language }) => {
  const [palette, setPalette] = useQueryState("palette");
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [isSmallMobile] = useMediaQuery("(max-width: 580px)");

  return (
    <Box
      as="aside"
      maxW={{ base: "100%", md: "320px" }}
      h="fit-content"
      bg={{ base: "transparent", md: "white" }}
      borderRadius={"8px"}
      p={{ base: "0", md: "24px" }}
      // gap={{ base: "0", md: "32px" }}
      // boxShadow="0px 4px 10px 0px #0041431A"
    >
      {!isMobile && (
        <Stack gap={"8px"} pb="24px">
          <MidText text="choose_palette" />
          <SubText fs="14px" text="select_palette" />
        </Stack>
      )}

      {!isMobile && (
        <Stack gap={"16px"}>
          {data?.map((item) => {
            const isSelected = palette === item.id;

            return (
              <Box
                key={item.id}
                border="1px solid"
                borderColor={isSelected ? "#0041434D" : "transparent"}
                boxShadow={
                  isSelected && "0px 4px 10px 0px rgba(0, 65, 67, 0.1)"
                }
                borderRadius="8px"
                bg="#F9FAFB"
                p="16px"
                transition="all 0.3s ease"
                _hover={{
                  background: "#0041430D",
                  cursor: "pointer",
                }}
                tabIndex={0}
                onClick={() => setPalette(item.id)}
              >
                <HStack gap={"8px"} pb="12px">
                  {item.colors.map((color, index) => (
                    <VStack key={color} spacing={1}>
                      <Box
                        w="34px"
                        h="34px"
                        borderRadius="50%"
                        bg={color}
                        ml={index === 0 ? 0 : "-22px"}
                        border={"1px solid"}
                        borderColor={"white"}
                      />
                    </VStack>
                  ))}
                </HStack>

                <Text fontSize="14px" fontWeight={"500"}>
                  {item.name[language] || item.name.en}
                </Text>
                <Text fontSize="12px" color="#6B7280">
                  {item.description[language] || item.description.en}
                </Text>

                <Flex>
                  <For each={item.colors}>
                    {(el, index) => (
                      <Text key={index} fontSize="12px" color="#BBBEC3">
                        {el}
                        {index !== item.colors.length - 1 ? "," : ""}
                      </Text>
                    )}
                  </For>
                </Flex>
              </Box>
            );
          })}
        </Stack>
      )}

      {isMobile && (
        <Swiper
          slidesPerView={isSmallMobile ? 1 : 2}
          spaceBetween={16}
          speed={500}
          loop={true}
        >
          {data?.map((item) => {
            const isSelected = palette === item.id;

            return (
              <SwiperSlide key={item.id}>
                <Box
                  border="1px solid"
                  borderColor={isSelected ? "#0041434D" : "transparent"}
                  boxShadow={"0px 4px 10px 0px #0041431A"}
                  borderRadius="8px"
                  bg="#F9FAFB"
                  p="12px"
                  m="4px"
                  transition="all 0.3s ease"
                  _hover={{
                    background: "#0041430D",
                    cursor: "pointer",
                  }}
                  tabIndex={0}
                  onClick={() => setPalette(item.id)}
                  maxW="100%"
                >
                  <HStack gap={"8px"} pb="12px">
                    {item.colors.map((color, index) => (
                      <VStack key={color} spacing={1}>
                        <Box
                          w="34px"
                          h="34px"
                          borderRadius="50%"
                          bg={color}
                          ml={index === 0 ? 0 : "-22px"}
                          border={"1px solid"}
                          borderColor={"white"}
                        />
                      </VStack>
                    ))}
                  </HStack>

                  <Text fontSize="14px" fontWeight={"500"}>
                    {item.name[language] || item.name.en}
                  </Text>
                  <Text fontSize="12px" color="#6B7280">
                    {item.description[language] || item.description.en}
                  </Text>

                  <Flex>
                    <For each={item.colors}>
                      {(el, index) => (
                        <Text key={index} fontSize="12px" color="#BBBEC3">
                          {el}
                          {index !== item.colors.length - 1 ? "," : ""}
                        </Text>
                      )}
                    </For>
                  </Flex>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};
