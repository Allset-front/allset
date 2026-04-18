"use client";

import { usePathname } from "@/i18n/routing";
import { contentMap } from "../../utils/constants";
import { Center, Stack } from "@chakra-ui/react";
import { Title } from "@/components/build/typography/title";
import { SubTitle } from "@/components/build/typography/subTitle";

export const TopPart = () => {
  const pathname = usePathname();

  const content = contentMap[pathname];

  if (!content) return;

  return (
    <Center pt={{ base: "32px", md: "48px" }}>
      <Stack gap="16px" align={"center"}>
        {/* <Image w="64px" h="64px" src={content?.img?.src} objectFit={"contain"}/> */}
        <Title text={content?.title} />
        <SubTitle text={content?.text} />
      </Stack>
    </Center>
  );
};
