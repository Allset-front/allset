"use client";

import React from "react";
import { useGetTanstack } from "@/hooks/useTanstack";
import { Animate } from "@/components/ui/animate";
import { Box, Flex, For, Skeleton, useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card } from "@/components/build/card";

export const TemplatesClient = () => {
  const { isLoading, data } = useGetTanstack("templates");

  const [isLaptop] = useMediaQuery("(max-width: 1280px)");
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  if (isLoading) {
    const skeletons = Array.from({ length: 3 });

    return (
      <Flex justify="space-between" gap="32px" pt="48px" pb="22px">
        <For each={skeletons}>
          {(_, index) => (
            <Skeleton key={index} w="443px" h="602px" borderRadius="8px" />
          )}
        </For>
      </Flex>
    );
  }

  return (
    <Animate>
      <Box pt="48px" pb="22px">

      <Swiper
        slidesPerView={isMobile ? 1 : isLaptop ? 2 : 3}
        spaceBetween={isMobile ? 8 : 32}
        speed={500}
        loop={true}
        pagination={true}
        modules={[Pagination]}
        >
        {data?.map((el, index) => (
          <SwiperSlide key={index}>
            <Card el={el} />
          </SwiperSlide>
        ))}
      </Swiper>
        </Box>
      {/* <Flex justify="space-between" gap="32px" pt="48px" pb="22px">
        <For each={data}>{(el, index) => <Card key={index} el={el} />}</For>
      </Flex> */}
    </Animate>
  );
};
