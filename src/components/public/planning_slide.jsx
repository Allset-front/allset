"use client";

import React from "react";
import { useGetTanstack } from "@/hooks/useTanstack";
import { useQueryState } from "nuqs";
import { useRouter } from "@/i18n/routing";
import {
  Flex,
  For,
  Image,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const PlanningSlide = () => {
  const router = useRouter();

  const { isLoading, data } = useGetTanstack("templates");
  const [_, setTemplate] = useQueryState("template");
  const [isLaptop] = useMediaQuery("(max-width: 992px)");

  const handleSelect = (id) => {
    setTemplate(id);
    router.push(`/build/templates?template=${id}`);
  };

  if (isLoading) {
    const skeletons = Array.from({ length: 3 });

    return (
      <Flex justify="space-between" gap="16px">
        <For each={skeletons}>
          {(_, index) => (
            <Skeleton key={index} w="286px" h="457px" borderRadius="25px" />
          )}
        </For>
      </Flex>
    );
  }

  return (
    <Swiper
      slidesPerView={isLaptop ? 2 : 3}
      // slidesPerView={isMobile ? 1 : isLaptop ? 2 : 3}
      spaceBetween={16}
      speed={500}
      loop={true}
      pagination={true}
      modules={[Pagination]}
    >
      {data?.map(({ id, templateImageMobile }) => {
        return (
          <SwiperSlide
            key={id}
            onClick={() => handleSelect(id)}
          >
            <Stack
              cursor={"pointer"}
              w={"100%"}
              h={{ base: "268px", sm: "457px" }}
              alignItems={"center"}
              // justifyContent={"center"}
              // overflow={"hidden"}
            >
              <Image
                src={templateImageMobile}
                alt={`Template ${id}`}
                w={{ base: "168px", sm: "286px" }}
                h={{ base: "268px", sm: "457px" }}
                objectFit="contain"
                transition="all 0.3s ease"
                borderRadius={"25px"}
                // _hover={{
                //   transform: "scale(1.1)",
                // }}
              />
            </Stack>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
