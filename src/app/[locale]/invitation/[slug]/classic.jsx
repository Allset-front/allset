"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useGetTanstack } from "@/hooks/useTanstack";
import { diffParts, formatEventDate, paletteToVars } from "@/utils/formatters";
import { Language } from "@/components/invitation/language";
import { pickLang } from "@/utils/helpers";
import {
  Box,
  Button,
  createListCollection,
  Flex,
  HStack,
  Icon,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { leftBrace, map, rightBrace } from "@/assets/svgs";
import { Countdown } from "@/components/invitation/countdown";
import mainBg from "@/assets/imgs/invitations/classic/main_bg.png";
import timingBg from "@/assets/imgs/invitations/classic/timing_bg.jpg";
import storyBg from "@/assets/imgs/invitations/classic/story_bg.jpg";
import dresscodeBg from "@/assets/imgs/invitations/classic/dresscode_bg.jpg";
import { GUEST_COUNT, GALLERY_FALLBACKS } from "@/utils/constants";

export default function Classic({ viewport = "pc", palette, data }) {
  const t = useTranslations();
  const language = useLocale();

  const { slug } = useParams();
  const { data: invitationData } = useGetTanstack(
    `invitations/url/${slug}`,
    !data && !!slug,
  );

  const finalData = data ?? invitationData;
  const locales = finalData?.languages;
  const vars = paletteToVars(palette?.colors);
  const title = pickLang(finalData?.title, language) || "Henry & Mariam";
  const eventDateText = formatEventDate(finalData?.eventDate);

  const [countdown, setCountdown] = useState(() =>
    diffParts(finalData?.eventDate),
  );

  const heroImage = finalData?.mainImages?.[0] || mainBg.src;
  const coupleImage = finalData?.mainImages?.[1] || timingBg.src;
  const gallery = finalData?.ourStory?.photoUrls?.length
    ? finalData.ourStory.photoUrls
    : GALLERY_FALLBACKS;

  const description =
    pickLang(finalData?.description, language) || t("classic_title");
  const timeline = finalData?.timeline?.length
    ? finalData.timeline
    : [
        { time: "12:00", venueName: "BRIDE'S HOME" },
        { time: "13:30", venueName: "DEPARTURE TO GROOM'S HOME" },
        { time: "16:00", venueName: "GROOM'S HOME" },
        { time: "17:30", venueName: "ARRIVAL AT RECEPTION VENUE" },
      ];
  const dressCodeDesc =
    pickLang(finalData?.dressCode?.description, language) ||
    t("dresscode_desc");
  const dressCodeName =
    finalData?.dressCode?.colorPaletteId || palette?.name?.[language]; // needs checking
  const dressCodeAbout = "" || palette?.description?.[language]; // needs checking
  const storyText =
    pickLang(finalData?.ourStory?.text, language) || t("classic_story_desc");
  const contact = finalData?.connectWithUs || {};
  const phone = contact.phone || "+374 99 XXXXXX";
  const email = contact.email || "username@gmail.com";
  const guestCount = createListCollection({
    items: GUEST_COUNT,
  });

  // const width = designWidth(viewport);
  const isMobile = viewport === "mobile";

  useEffect(() => {
    if (!finalData?.eventDate) return;

    const interval = setInterval(() => {
      setCountdown(diffParts(finalData.eventDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [finalData?.eventDate]);

  return (
    <Box
      data-viewport={viewport}
      style={vars}
      // w={`${width}px`}
      bg="white"
      color="#111"
      overflow="hidden"
      // position={"relative"}
    >
      {locales && <Language locales={locales} />}

      {/* ————— HERO ————— */}
      <Box
        position="relative"
        w="100%"
        h={isMobile ? "520px" : "750px"}
        bgImage={`linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%), url(${heroImage})`}
        bgSize="cover"
        bgPos="center"
      >
        <VStack
          position="absolute"
          bottom={isMobile ? "40px" : "80px"}
          left="0"
          right="0"
          gap={isMobile ? "8px" : "100px"}
          color="white"
          textAlign="center"
        >
          <Text
            fontFamily="var(--font-sosbanff)"
            // fontFamily={sosBanff.style.fontFamily}
            fontSize={isMobile ? "54px" : "103px"}
            lineHeight="24px"
            fontWeight="400"
          >
            {title}
          </Text>
          <Text
            fontFamily="var(--font-sosbanff)"
            fontSize={isMobile ? "26px" : "63px"}
            lineHeight="24px"
            fontWeight="400"
          >
            {eventDateText}
          </Text>
        </VStack>
      </Box>

      {/* ————— INTRO + COUNTDOWN ————— */}
      <VStack
        bg="#F4F1EC"
        py={isMobile ? "40px" : "60px"}
        px={isMobile ? "24px" : "100px"}
        gap={isMobile ? "24px" : "100px"}
      >
        <Text
          textAlign="center"
          maxW="942px"
          fontSize={isMobile ? "15px" : "20px"}
          lineHeight="28px"
          fontWeight="400"
          color="#3E433C"
        >
          {description}
        </Text>

        <Stack gap="40px">
          {finalData?.countDown !== false && (
            <HStack
              gap={isMobile ? "16px" : "48px"}
              // divideX="1px"
              // divideColor="rgba(0,0,0,0.15)"
            >
              <Countdown
                value={countdown.days}
                label="days"
                isMobile={isMobile}
              />
              <Countdown
                value={String(countdown.hours).padStart(2, "0")}
                label="hours"
                isMobile={isMobile}
              />
              <Countdown
                value={String(countdown.min).padStart(2, "0")}
                label="min"
                isMobile={isMobile}
              />
              <Countdown
                value={String(countdown.sec).padStart(2, "0")}
                label="sec"
                isMobile={isMobile}
              />
            </HStack>
          )}

          <Text
            textAlign="center"
            color="#3E433C"
            fontSize={isMobile ? "13px" : "18px"}
            lineHeight={"24px"}
          >
            {t("classic_journey")}
          </Text>
        </Stack>
      </VStack>

      {/* ————— TIMING ————— */}
      <Flex
        bg="var(--c-primary)"
        color="white"
        direction={isMobile ? "column" : "row"}
        align={isMobile ? "stretch" : "center"}
        gap={isMobile ? "32px" : "60px"}
      >
        <VStack align="flex-start" gap="40px" flex="1" p="100px 0 100px 160px">
          <Text
            fontWeight="800"
            fontSize={isMobile ? "22px" : "34px"}
            lineHeight="50px"
            textTransform="uppercase"
            color="#FFFFFF"
            // dangerouslySetInnerHTML={{
            //   __html: t("classic_timing").replace(/\n/g, "<br />"),
            // }}
          >
            {t("classic_timing")}
          </Text>
          <Text
            fontWeight="400"
            fontSize={isMobile ? "13px" : "18px"}
            lineHeight="28px"
            color="#FFFFFF"
            maxW="440px"
          >
            Lorem ipsum dolor sit amet consectetur. Ut enim scelerisque
            consequat a justo diam adipiscing velit tincidunt.
          </Text>

          <Stack gap="40px" minW={"361px"}>
            {timeline.map((item, i) => (
              <Flex
                key={i}
                justify={"space-between"}
                align={"center"}
                gap="20px"
              >
                <VStack align="flex-start" gap="24px" minW="160px">
                  <Text
                    fontSize={isMobile ? "20px" : "34px"}
                    fontWeight="800"
                    lineHeight={"24px"}
                  >
                    {item.time || "00:00"}
                  </Text>
                  <Text
                    fontSize={isMobile ? "15px" : "22px"}
                    fontWeight="500"
                    lineHeight={"34px"}
                    textTransform="uppercase"
                    color="rgba(255,255,255,0.7)"
                  >
                    {pickLang(item.venueName, language) || item.venueName}
                  </Text>
                </VStack>
                <Button
                  // variant="ghost"
                  color="#FFFFFF"
                  // _hover={{ bg: "rgba(255,255,255,0.08)" }}
                  fontSize="14px"
                  bg="#240F0F"
                  borderRadius={"10px"}
                  h="44px"
                >
                  <Icon>{map.icon}</Icon> {t("classic_map")}
                </Button>
              </Flex>
            ))}
          </Stack>
        </VStack>

        {!isMobile && (
          <Box
            flex="0 0 auto"
            w="652px"
            h="972px"
            // borderRadius="200px"
            borderTopLeftRadius="470px"
            borderBottomLeftRadius="470px"
            overflow="hidden"
            bgImage={`url(${coupleImage})`}
            bgSize="cover"
            bgPos="center"
          />
        )}
      </Flex>

      {/* ————— RSVP ————— */}
      {finalData?.rsvp !== false && (
        <VStack bg="#F4F1EC" py={isMobile ? "40px" : "100px"} gap="37px">
          <Text
            fontSize={isMobile ? "20px" : "34px"}
            fontWeight={500}
            lineHeight="48px"
            textAlign="center"
            textTransform="uppercase"
            // dangerouslySetInnerHTML={{
            //   __html: t("classic_join").replace(/\n/g, "<br />"),
            // }}
          >
            {t("classic_join")}
          </Text>
          <VStack gap="37px">
            <VStack gap="16px" minW={isMobile ? "100%" : "442px"}>
              <Input
                placeholder={t("classic_type")}
                // size="lg"
                h="52px"
                bg="white"
                // fontSize="14px"
                variant="outline"
              />
              {/* <Box
                as="select"
                w="100%"
                h="52px"
                bg="white"
                border="1px solid rgba(0,0,0,0.1)"
                borderRadius="6px"
                // fontSize="14px"
                color="#6B6B6B"
                disabled
              >
                <option>{t("classic_count")}</option>
              </Box> */}
              <Select.Root
                collection={guestCount}
                size="lg"
                width="100%"
                bg="white"
                variant="outline"
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={t("classic_count")} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {guestCount.items.map(({ label, value }) => (
                        <Select.Item item={label} key={value}>
                          {label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </VStack>
            <Flex
              minW={isMobile ? "100%" : "442px"}
              gap="12px"
              justify={"space-between"}
            >
              <Button
                bg="var(--c-primary)"
                color="white"
                h="44px"
                fontSize="14px"
                // _hover={{ opacity: 0.9 }}
                boxShadow="xl"
                _hover={{
                  bg: "white",
                  color: "#004143",
                  borderColor: "#004143",
                }}
                transition="all 0.3s ease"
              >
                {t("classic_accept")}
              </Button>
              <Button
                variant="outline"
                borderColor="rgba(0,0,0,0.15)"
                color="#111"
                h="44px"
                fontSize="14px"
              >
                {t("classic_reject")}
              </Button>
            </Flex>
          </VStack>
        </VStack>
      )}

      {/* ————— DRESS CODE ————— */}
      <VStack
        bg="var(--c-primary)"
        color="white"
        py={isMobile ? "48px" : "60px"}
        px={isMobile ? "24px" : "131px"}
        gap={"60px"}
        textAlign="center"
        bgImage={`linear-gradient(var(--c-primary)), url(${dresscodeBg.src})`}
        bgSize="cover"
        bgPos="center"
        bgBlendMode={"overlay"}
      >
        <Stack gap="32px">
          <Text
            fontSize={isMobile ? "20px" : "34px"}
            lineHeight="24px"
            fontWeight="800"
            color="#FFFFFF"
            textTransform={"uppercase"}
          >
            {t("dresscode")}
          </Text>
          <Text
            fontSize={isMobile ? "13px" : "18px"}
            lineHeight="28px"
            color="#FFFFFF"
            maxW="720px"
          >
            {dressCodeDesc}
          </Text>
        </Stack>

        <Stack gap={"32px"}>
          <VStack gap="20px">
            <HStack gap="0">
              <Box w="32px" h="32px" borderRadius="50%" bg="var(--c-accent)" />
              <Box
                w="32px"
                h="32px"
                borderRadius="50%"
                bg="var(--c-secondary)"
                ml="-10px"
              />
              <Box
                w="32px"
                h="32px"
                borderRadius="50%"
                bg="var(--c-surface)"
                ml="-10px"
              />
            </HStack>
            <Text
              fontSize="18px"
              lineHeight={"22px"}
              fontWeight="500"
              color="#FFFFFF"
            >
              {dressCodeName}
            </Text>
            {dressCodeAbout && (
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight={"22px"}
                color="#FFFFFF"
              >
                {dressCodeAbout}
              </Text>
            )}
          </VStack>
        </Stack>
      </VStack>

      {/* ————— GALLERY CALLOUT ————— */}
      <VStack
        bg="#F4F1EC"
        py={isMobile ? "48px" : "100px"}
        gap="24px"
        textAlign="center"
        position="relative"
      >
        {!isMobile && (
          <>
            <Icon
              position="absolute"
              left="261px"
              top="50%"
              transform="translateY(-50%)"
              color="var(--c-primary)"
            >
              {leftBrace.icon}
            </Icon>
            <Icon
              position="absolute"
              right="261px"
              top="50%"
              transform="translateY(-50%)"
              color="var(--c-primary)"
            >
              {rightBrace.icon}
            </Icon>
          </>
        )}
        <Text
          fontSize="12px"
          lineHeight="22px"
          color="var(--c-primary)"
          textTransform="uppercase"
        >
          {t("classic_look")}
        </Text>
        <Text
          fontSize={isMobile ? "22px" : "34px"}
          lineHeight="48px"
          fontWeight="500"
          color="var(--c-primary)"
        >
          {t("classic_gallery")}
        </Text>
        <Text
          fontSize="16px"
          fontWeight="400"
          color="var(--c-primary)"
          maxW="440px"
          dangerouslySetInnerHTML={{
            __html: t("classic_soon").replace(/\n/g, "<br />"),
          }}
        />
        <Button
          bg="var(--c-primary)"
          color="white"
          mt="8px"
          px="40px"
          h="40px"
          fontSize="13px"
          boxShadow="xl"
          _hover={{
            bg: "white",
            color: "#004143",
            borderColor: "#004143",
          }}
          transition="all 0.3s ease"
          as={finalData?.albumLink ? "a" : "button"}
          {...(finalData?.albumLink
            ? { href: finalData.albumLink, target: "_blank" }
            : {})}
        >
          {t("classic_view")}
        </Button>
      </VStack>

      {/* ————— OUR LOVE STORY ————— */}
      <Box
        position="relative"
        w="100%"
        py={isMobile ? "60px" : "112px"}
        // px={isMobile ? "24px" : "120px"}
        bgImage={`linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.82)), url(${storyBg.src})`}
        bgSize="cover"
        bgRepeat={"no-repeat"}
        bgPos="center"
        h="451px"
      >
        <VStack gap="40px" textAlign="center">
          <Text
            fontSize={isMobile ? "20px" : "34px"}
            lineHeight="48px"
            fontWeight="500"
          >
            {t("classic_story")}
          </Text>
          <Text
            maxW="877px"
            fontSize={isMobile ? "15px" : "18px"}
            lineHeight="28px"
            color="#323232"
            whiteSpace="pre-line"
            // dangerouslySetInnerHTML={{
            //   __html: storyText.replace(/\n/g, "<br />"),
            // }}
          >
            {storyText}
          </Text>
        </VStack>
      </Box>

      {/* ————— PHOTO STRIP ————— */}
      <Flex
        w="100%"
        // h={isMobile ? "180px" : "260px"}
        my="100px"
        px="56px"
        gap="10px"
      >
        {gallery.map((src, i) => (
          <Box
            key={i}
            flex="1"
            maxw="320px"
            h="320px"
            bgImage={`url(${typeof src === "string" ? src : src?.url || ""})`}
            bgSize="cover"
            bgPos="center"
            filter={i === 1 || i === 3 ? "grayscale(100%)" : "none"}
          />
        ))}
      </Flex>

      {/* ————— CONTACT ————— */}
      <Flex
        // bg="var(--c-primary)"
        // color="white"
        // py={isMobile ? "28px" : "40px"}
        pb="100px"
        align={"center"}
        justify={"center"}
        gap="90px"
      >
        <Text
          fontSize="30px"
          lineHeight="24px"
          fontWeight="800"
          textTransform={"uppercase"}
        >
          {t("classic_contact")}
        </Text>
        <Text fontSize="24px" lineHeight="24px" fontWeight="800">
          {phone}
        </Text>
        <Text fontSize="24px" lineHeight="24px" fontWeight="800">
          {email}
        </Text>
      </Flex>
    </Box>
  );
}
