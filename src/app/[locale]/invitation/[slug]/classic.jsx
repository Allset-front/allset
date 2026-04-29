"use client";

import { useParams } from "next/navigation";
import {
  // designWidth,
  diffParts,
  formatEventDate,
  paletteToVars,
} from "@/utils/formatters";
import { pickLang } from "@/utils/helpers";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useGetTanstack } from "@/hooks/useTanstack";
import { useTranslations } from "next-intl";
import { map } from "@/assets/svgs";
import mainBg from "@/assets/imgs/invitations/classic/main_bg.png";
import timingBg from "@/assets/imgs/invitations/classic/timing_bg.jpg";
import storyBg from "@/assets/imgs/invitations/classic/story_bg.jpg";
import fallbackBg1 from "@/assets/imgs/invitations/classic/fallback_bg_1.jpg";
import fallbackBg2 from "@/assets/imgs/invitations/classic/fallback_bg_2.jpg";
import fallbackBg3 from "@/assets/imgs/invitations/classic/fallback_bg_3.jpg";
import fallbackBg4 from "@/assets/imgs/invitations/classic/fallback_bg_4.jpg";
import { Selector } from "@/components/build/selector";

// const SCRIPT_FONT_URL =
//   "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Dancing+Script:wght@500;600;700&display=swap";

const GALLERY_FALLBACKS = [
  fallbackBg1.src,
  fallbackBg2.src,
  fallbackBg3.src,
  fallbackBg4.src,
];

// const scriptFont = `"Dancing Script", "Great Vibes", cursive`;
// const serifFont = `"Cormorant Garamond", "Playfair Display", Georgia, serif`;

export default function Classic({ viewport = "pc", palette, data }) {
  const t = useTranslations();

  // const shouldFetch = isEmptyObject(data) ;
  const { slug } = useParams();

  const { data: invitationData } = useGetTanstack(
    `invitations/url/${slug}`,
    !data && !!slug,
  );
  console.log(invitationData);

  const finalData = data ?? invitationData;
  const vars = paletteToVars(palette?.colors);
  const language = finalData?.languages?.[0] || "en";
  const title =
    pickLang(finalData?.title, language) ||
    pickLang(finalData?.name, language) ||
    "Henry & Mariam";
  const eventDateText = formatEventDate(finalData?.eventDate);
  const countdown = diffParts(finalData?.eventDate);

  const heroImage =
    finalData?.mainImages?.[0]?.url || finalData?.mainImages?.[0] || mainBg.src;
  const coupleImage =
    finalData?.mainImages?.[1]?.url ||
    finalData?.mainImages?.[1] ||
    timingBg.src;
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
    "Lorem ipsum dolor sit amet consectetur. Ut enim scelerisque consequat a justo diam adipiscing velit tincidunt.";
  const dressCodeName =
    finalData?.dressCode?.colorPaletteId || palette?.name?.[language]; // needs checking
  const dressCodeAbout = "" || palette?.description?.[language]; // needs checking
  const storyText =
    pickLang(finalData?.ourStory?.text, language) || t("classic_story_desc");
  const contact = finalData?.connectWithUs || {};
  const phone = contact.phone || "+374 99 XXXXXX";
  const email = contact.email || "username@gmail.com";

  // const width = designWidth(viewport);
  const isMobile = viewport === "mobile";
  console.log(palette); //

  return (
    <Box
      data-viewport={viewport}
      style={vars}
      // w={`${width}px`}
      bg="white"
      color="#111"
      overflow="hidden"
    >
      {/* Inject fonts once per preview tree */}
      {/* <link rel="stylesheet" href={SCRIPT_FONT_URL} /> */}

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
            fontFamily={"Oooh Baby"}
            fontSize={isMobile ? "54px" : "103px"}
            lineHeight="24px"
            fontWeight="400"
          >
            {title}
          </Text>
          <Text
            fontFamily={"Oleo Script"}
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
          fontFamily={"Myanmar Text"}
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
              <CountdownCell
                value={countdown.days}
                label="days"
                isMobile={isMobile}
              />
              <CountdownCell
                value={String(countdown.hours).padStart(2, "0")}
                label="hours"
                isMobile={isMobile}
              />
              <CountdownCell
                value={String(countdown.min).padStart(2, "0")}
                label="min"
                isMobile={isMobile}
              />
              <CountdownCell
                value={String(countdown.sec).padStart(2, "0")}
                label="sec"
                isMobile={isMobile}
              />
            </HStack>
          )}

          <Text
            fontFamily={"Myanmar Text"}
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
            fontFamily={"Mulish"}
            fontWeight="800"
            fontSize={isMobile ? "22px" : "34px"}
            lineHeight="50px"
            textTransform="uppercase"
            color="#FFFFFF"
            dangerouslySetInnerHTML={{
              __html: t("classic_timing").replace(/\n/g, "<br />"),
            }}
          />
          <Text
            fontFamily={"Mulish"}
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
                    fontFamily={"Mulish"}
                    fontSize={isMobile ? "20px" : "34px"}
                    fontWeight="800"
                    lineHeight={"24px"}
                  >
                    {item.time || "00:00"}
                  </Text>
                  <Text
                    fontFamily={"OFL Sorts Mill Goudy TT"}
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
            fontFamily={"OFL Sorts Mill Goudy TT"}
            fontSize={isMobile ? "20px" : "34px"}
            fontWeight={500}
            lineHeight="48px"
            textAlign="center"
            textTransform="uppercase"
            dangerouslySetInnerHTML={{
              __html: t("classic_join").replace(/\n/g, "<br />"),
            }}
          />
          <VStack gap="37px">
            <VStack gap="16px" minW={isMobile ? "100%" : "442px"}>
              <Input
                placeholder={t("classic_type")}
                // size="lg"
                h="52px"
                bg="white"
                borderColor="rgba(0,0,0,0.1)"
                // fontSize="14px"
              />
              <Box
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
              </Box>
            </VStack>
            {/* <Selector /> */}
            <HStack w="100%" gap="12px">
              <Button
                flex="1"
                bg="var(--c-primary)"
                color="white"
                h="44px"
                fontSize="14px"
                _hover={{ opacity: 0.9 }}
              >
                {t("classic_accept")}
              </Button>
                <Button
                flex="1"
                variant="outline"
                borderColor="rgba(0,0,0,0.15)"
                color="#111"
                h="44px"
                fontSize="14px"
              >
                {t("classic_reject")}
              </Button>
            </HStack>
          </VStack>
        </VStack>
      )}

      {/* ————— DRESS CODE ————— */}
      <VStack
        bg="var(--c-primary)"
        color="white"
        py={isMobile ? "48px" : "80px"}
        px={isMobile ? "24px" : "120px"}
        gap={isMobile ? "18px" : "24px"}
        textAlign="center"
      >
        <Text
          // fontFamily={serifFont}
          fontSize={isMobile ? "20px" : "26px"}
          letterSpacing="0.12em"
          fontWeight="600"
        >
          {t("dresscode")}
        </Text>
        <Text
          fontSize={isMobile ? "13px" : "15px"}
          color="rgba(255,255,255,0.8)"
          maxW="720px"
          lineHeight="1.6"
        >
          {dressCodeDesc}
        </Text>
        <HStack gap="0" pt="12px">
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
        <VStack gap="4px">
          <Text fontSize="14px" fontWeight="500">
            {dressCodeName}
          </Text>
          <Text fontSize="12px" color="rgba(255,255,255,0.6)">
            {dressCodeAbout}
          </Text>
        </VStack>
        <Text
          fontSize="12px"
          color="rgba(255,255,255,0.55)"
          maxW="720px"
          lineHeight="1.7"
          pt="8px"
        >
          Lorem ipsum dolor sit amet consectetur. Molestie suada sollicitudin
          suspendisse congue condimentum. Egestas at aliquam pharetra tempus et.
          Morbi tincidunt viverra nunc felis sollicitudin pretium. Lacus arcu
          purus sed diam. Varius laoreet quis pellentesque et justo at. Cursus
          cursus bibendum lacus pellentesque leo ullamcorper libero suspendisse
          in.
        </Text>
      </VStack>

      {/* ————— GALLERY CALLOUT ————— */}
      <VStack
        bg="#F4F1EC"
        py={isMobile ? "48px" : "80px"}
        px="24px"
        gap="16px"
        textAlign="center"
        position="relative"
      >
        {!isMobile && (
          <>
            <Text
              position="absolute"
              left="120px"
              top="50%"
              transform="translateY(-50%)"
              fontSize="180px"
              color="var(--c-primary)"
              // fontFamily={serifFont}
              opacity="0.85"
              lineHeight="1"
            >
              {"{"}
            </Text>
            <Text
              position="absolute"
              right="120px"
              top="50%"
              transform="translateY(-50%)"
              fontSize="180px"
              color="var(--c-primary)"
              // fontFamily={serifFont}
              opacity="0.85"
              lineHeight="1"
            >
              {"}"}
            </Text>
          </>
        )}
        <Text
          fontSize="12px"
          letterSpacing="0.15em"
          color="#6B6B6B"
          textTransform="uppercase"
        >
          {t("classic_look")}
        </Text>
        <Text
          // fontFamily={serifFont}
          fontSize={isMobile ? "22px" : "28px"}
          letterSpacing="0.12em"
          fontWeight="600"
        >
          {t("classic_gallery")}
        </Text>
        <Text
          fontSize="13px"
          color="#6B6B6B"
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
          _hover={{ opacity: 0.9 }}
          as={finalData?.albumLink ? "a" : "button"}
          {...(finalData?.albumLink
            ? { href: finalData.albumLink, target: "_blank" }
            : {})}
        >
          {t("classic_open")}
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
            fontFamily={"OFL Sorts Mill Goudy TT"}
            fontSize={isMobile ? "20px" : "34px"}
            lineHeight="48px"
            fontWeight="500"
          >
            {t("classic_story")}
          </Text>
          <Text
            maxW="877px"
            fontFamily={"Mulish"}
            fontSize={isMobile ? "15px" : "18px"}
            lineHeight="28px"
            color="#323232"
            whiteSpace="pre-line"
            // dangerouslySetInnerHTML={{
            //   __html: t("classic_story_desc").replace(/\n/g, "<br />"),
            // }}
            dangerouslySetInnerHTML={{
              __html: storyText.replace(/\n/g, "<br />"),
            }}
          />
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
          fontFamily={"Mulish"}
          fontSize="30px"
          lineHeight="24px"
          fontWeight="800"
        >
          {t("classic_contact")}
        </Text>
        <Text
          fontFamily={"Mulish"}
          fontSize="24px"
          lineHeight="24px"
          fontWeight="800"
        >
          {phone}
        </Text>
        <Text
          fontFamily={"Mulish"}
          fontSize="24px"
          lineHeight="24px"
          fontWeight="800"
        >
          {email}
        </Text>
      </Flex>
    </Box>
  );
}

const CountdownCell = ({ value, label, isMobile }) => (
  <HStack px={isMobile ? "10px" : "18px"} align="baseline" gap="6px">
    <Text
      fontFamily={"Myanmar MN"}
      fontSize={isMobile ? "36px" : "50px"}
      fontWeight="400"
      color="var(--c-primary)"
      lineHeight="28px"
    >
      {value}
    </Text>
    <Text
      fontFamily={"Myanmar MN"}
      fontSize={isMobile ? "12px" : "34px"}
      fontWeight="400"
      color="var(--c-primary)"
      lineHeight="28px"
      textTransform="lowercase"
    >
      {label}
    </Text>
  </HStack>
);
