"use client";

import React from "react";
import {
  Avatar,
  HStack,
  Stack,
  Text,
  Image,
  Flex,
  SkeletonCircle,
  // SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import premium from "@/assets/imgs/premium.png";

export const Me = ({ isLoading, data }) => {
  return (
    <HStack
      py="16px"
      gap={{ base: "16px", md: "30px" }}
      justify={{ base: "center", md: "unset" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      {isLoading ? (
        <SkeletonCircle w="124px" h="124px" />
      ) : (
        <Avatar.Root w="124px" h="124px">
          <Avatar.Fallback name={data?.name} />
          <Avatar.Image src={data?.picture} />
        </Avatar.Root>
      )}

      {isLoading ? (
        // <SkeletonText w="200px" height="7" noOfLines={2} />
        <Stack gap="6px" alignItems="center">
          <Skeleton h="26px" w="200px" />
          <Skeleton h="26px" w="200px" />
        </Stack>
      ) : (
        <Stack gap="4px" alignItems={{ base: "center", md: "unset" }}>
          <Text fontSize={"20px"} color={"#4B5563"} fontWeight="500">
            {data?.name}
          </Text>
          <Text>{data?.email}</Text>

          {data?.staus && (
            <Flex
              w="158px"
              align={"center"}
              justify={"center"}
              borderRadius={"30px"}
              border={"1px solid"}
              borderColor={"#E38D83"}
              py="8px"
              mt={"9px"}
            >
              <Image src={premium.src} w="21px" h="21px" />
              <Text fontSize={"14px"} fontWeight={"500"} color={"#E38D83"}>
                {/* Premium user */}
                {data?.staus}
              </Text>
            </Flex>
          )}
        </Stack>
      )}
    </HStack>
  );
};
