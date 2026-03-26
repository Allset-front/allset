"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Box,
  Flex,
  Span,
  Stack,
  Text,
  Avatar,
  For,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
import "swiper/css";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { star, starEmpty } from "@/assets/svgs";

export const FeedbackSlide = ({ feedbacks }) => {
  const t = useTranslations();
  const language = useLocale();

  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [isLaptop] = useMediaQuery("(max-width: 992px)");
  const [swiper, setSwiper] = useState(null);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(
    feedbacks?.length > 3 ? true : false,
  );

  return (
    <Box>
      <Flex w="100%" gap="8px" justifyContent={"flex-end"} mb={"16px"}>
        {!isMobile && (
          <Icon
            onClick={() => swiper.slidePrev()}
            borderRadius={"100%"}
            bg={showPrevArrow ? "#004143" : "#00414333"}
            color={"white"}
            cursor={showPrevArrow ? " pointer" : "not-allowed"}
            w="31px"
            h="31px"
            p="4px"
            transition="all .3s ease"
          >
            <GrFormPreviousLink />
          </Icon>
        )}
        {!isMobile && (
          <Icon
            onClick={() => swiper.slideNext()}
            borderRadius={"100%"}
            bg={showNextArrow ? "#004143" : "#00414333"}
            color={"white"}
            cursor={showNextArrow ? " pointer" : "not-allowed"}
            w="31px"
            h="31px"
            p="4px"
            transition="all .3s ease"
          >
            <GrFormNextLink />
          </Icon>
        )}
      </Flex>
      <Swiper
        onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
        onSlideChange={(swiper) => {
          setShowPrevArrow(!swiper.isBeginning);
          setShowNextArrow(!swiper.isEnd);
        }}
        slidesPerView={isMobile ? 1 : isLaptop ? 2 : 3}
        spaceBetween={16}
        speed={500}
        loop={false}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        // modules={[Autoplay]}
      >
        {feedbacks?.map(({ name, image, count, rating, text }, index) => (
          <SwiperSlide key={index}>
            <Stack
              gap="8px"
              p="16px"
              borderRadius="5px"
              bg="#FFFFFF"
              cursor={"pointer"}
              minW={{ base: "268px", xl: "100%" }}
              maxW={{ base: "100%", xl: "442px" }}
            >
              <Flex gap="16px">
                <Avatar.Root size="md">
                  <Avatar.Fallback name={name} />
                  <Avatar.Image src={image} alt={name} />
                </Avatar.Root>
                <Stack gap={"4px"}>
                  <Text fontSize={"16px"} color={"#4B5563"} fontWeight={500}>
                    {name}
                  </Text>
                  <Span fontSize={"12px"} color={"#A0A0A0"} fontWeight={300}>
                    {count} {t("invitation")}
                  </Span>
                </Stack>
              </Flex>

              <Flex pt={"8px"}>
                <For each={Array.from({ length: 5 })}>
                  {(_, index) => (
                    <Span key={index}>
                      {index < 5 - rating ? starEmpty.icon : star.icon}
                    </Span>
                  )}
                </For>
              </Flex>

              <Text fontSize={"12px"} color={"#4B5563"} fontWeight={300}>
                {text[language]}
              </Text>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
