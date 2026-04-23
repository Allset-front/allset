"use client";

import { Box, Button, Flex, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { paletteToVars } from "./theme/paletteToVars";
import { designWidth } from "./theme/viewports";

const SCRIPT_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Dancing+Script:wght@500;600;700&display=swap";

const HERO_FALLBACK = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=70";
const COUPLE_FALLBACK = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=70";
const STORY_BG = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=70";
const GALLERY_FALLBACKS = [
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=70",
];

const pickLang = (obj, lang = "en") =>
  obj?.[lang] || obj?.en || obj?.hy || obj?.ru || "";

const formatDate = (iso) => {
  if (!iso) return "14.08.2026";
  try {
    const d = new Date(iso);
    if (Number.isNaN(+d)) return iso;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}.${d.getFullYear()}`;
  } catch {
    return iso;
  }
};

const diffParts = (iso) => {
  if (!iso) return { days: 123, hours: 16, min: 45, sec: 58 };
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return { days: 123, hours: 16, min: 45, sec: 58 };
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const min = Math.floor((diff / 60000) % 60);
  const sec = Math.floor((diff / 1000) % 60);
  return { days, hours, min, sec };
};

const scriptFont = `"Dancing Script", "Great Vibes", cursive`;
const serifFont = `"Cormorant Garamond", "Playfair Display", Georgia, serif`;

export const Invitation = ({ viewport = "pc", palette, data, template }) => {
  const vars = paletteToVars(palette?.colors);
  const language = data?.languages?.[0] || "en";

  const title =
    pickLang(data?.title, language) ||
    pickLang(template?.name, language) ||
    "Henry & Mariam";

  const eventDateText = formatDate(data?.eventDate);
  const countdown = diffParts(data?.eventDate);

  const heroImage =
    data?.mainImages?.[0]?.url || data?.mainImages?.[0] || HERO_FALLBACK;
  const coupleImage =
    data?.mainImages?.[1]?.url || data?.mainImages?.[1] || COUPLE_FALLBACK;

  const description =
    pickLang(data?.description, language) ||
    pickLang(template?.defaults?.description, language) ||
    "We would be honored to have you join us as we celebrate the beginning of our new life together. Your presence will make our special day even more meaningful.";

  const timeline =
    data?.timeline?.length
      ? data.timeline
      : [
          { time: "12:00", venueName: "BRIDE'S HOME" },
          { time: "13:30", venueName: "DEPARTURE TO GROOM'S HOME" },
          { time: "16:00", venueName: "GROOM'S HOME" },
          { time: "17:30", venueName: "ARRIVAL AT RECEPTION VENUE" },
        ];

  const dressCodeDesc =
    pickLang(data?.dressCode?.description, language) ||
    pickLang(template?.defaults?.dressCodeDescription, language) ||
    "Lorem ipsum dolor sit amet consectetur. Ut enim scelerisque consequat a justo diam adipiscing velit tincidunt.";
  const dressCodeStyle = data?.dressCode?.style || "Modern Champagne";

  const storyText =
    pickLang(data?.ourStory?.text, language) ||
    pickLang(template?.defaults?.ourStoryText, language) ||
    "Our story is written with sincerity, family warmth, and true devotion.\nFrom the day we met, we felt something special — something that only grew stronger with every moment, every smile, every challenge.\nNow, with our families' blessings and love in our hearts, we are ready to start a new life together.";

  const gallery =
    data?.ourStory?.photoUrls?.length
      ? data.ourStory.photoUrls.slice(0, 4)
      : GALLERY_FALLBACKS;

  const contact = data?.connectWithUs || {};
  const phone = contact.phone || "+374 99 112233";
  const email = contact.email || "mariam1234@gmail.com";

  const width = designWidth(viewport);
  const isMobile = viewport === "mobile";

  return (
    <Box
      data-viewport={viewport}
      style={vars}
      w={`${width}px`}
      bg="white"
      color="#111"
      fontFamily={serifFont}
      overflow="hidden"
    >
      {/* Inject fonts once per preview tree */}
      <link rel="stylesheet" href={SCRIPT_FONT_URL} />

      {/* ————— HERO ————— */}
      <Box
        position="relative"
        w="100%"
        h={isMobile ? "520px" : "640px"}
        bgImage={`linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%), url(${heroImage})`}
        bgSize="cover"
        bgPos="center"
      >
        <VStack
          position="absolute"
          bottom={isMobile ? "40px" : "80px"}
          left="0"
          right="0"
          gap={isMobile ? "8px" : "16px"}
          color="white"
          textAlign="center"
        >
          <Text
            fontFamily={scriptFont}
            fontSize={isMobile ? "54px" : "84px"}
            lineHeight="1"
            fontWeight="500"
          >
            {title}
          </Text>
          <Text
            fontFamily={serifFont}
            fontSize={isMobile ? "26px" : "36px"}
            letterSpacing="0.05em"
          >
            {eventDateText}
          </Text>
        </VStack>
      </Box>

      {/* ————— INTRO + COUNTDOWN ————— */}
      <VStack
        bg="#F4F1EC"
        py={isMobile ? "40px" : "72px"}
        px={isMobile ? "24px" : "160px"}
        gap={isMobile ? "24px" : "36px"}
      >
        <Text
          textAlign="center"
          maxW="820px"
          fontSize={isMobile ? "15px" : "18px"}
          lineHeight="1.6"
          color="#333"
        >
          {description}
        </Text>

        {data?.countDown !== false && (
          <HStack
            gap={isMobile ? "16px" : "28px"}
            divideX="1px"
            divideColor="rgba(0,0,0,0.15)"
          >
            <CountdownCell value={countdown.days} label="days" isMobile={isMobile} />
            <CountdownCell value={String(countdown.hours).padStart(2, "0")} label="hours" isMobile={isMobile} />
            <CountdownCell value={String(countdown.min).padStart(2, "0")} label="min" isMobile={isMobile} />
            <CountdownCell value={String(countdown.sec).padStart(2, "0")} label="sec" isMobile={isMobile} />
          </HStack>
        )}

        <Text
          textAlign="center"
          fontStyle="italic"
          color="#6B6B6B"
          fontSize={isMobile ? "13px" : "15px"}
        >
          Our journey to forever has already begun...
        </Text>
      </VStack>

      {/* ————— TIMING ————— */}
      <Flex
        bg="var(--c-primary)"
        color="white"
        py={isMobile ? "40px" : "80px"}
        px={isMobile ? "24px" : "96px"}
        direction={isMobile ? "column" : "row"}
        align={isMobile ? "stretch" : "center"}
        gap={isMobile ? "32px" : "60px"}
      >
        <VStack align="flex-start" gap="20px" flex="1">
          <Text
            fontFamily={serifFont}
            fontWeight="600"
            fontSize={isMobile ? "22px" : "28px"}
            letterSpacing="0.04em"
            textTransform="uppercase"
          >
            Timing for our<br />special day
          </Text>
          <Text
            fontSize={isMobile ? "13px" : "15px"}
            color="rgba(255,255,255,0.75)"
            maxW="440px"
            lineHeight="1.6"
          >
            Lorem ipsum dolor sit amet consectetur. Ut enim scelerisque consequat a justo diam adipiscing velit tincidunt.
          </Text>

          <Stack gap="18px" pt="8px" w="100%">
            {timeline.map((item, i) => (
              <Flex key={i} align="flex-start" gap="20px">
                <VStack align="flex-start" gap="2px" minW="160px">
                  <Text fontSize={isMobile ? "20px" : "24px"} fontWeight="600">
                    {item.time || "00:00"}
                  </Text>
                  <Text
                    fontSize="12px"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="rgba(255,255,255,0.7)"
                  >
                    {pickLang(item.venueName, language) || item.venueName || "Venue"}
                  </Text>
                </VStack>
                <Button
                  size="xs"
                  variant="outline"
                  borderColor="rgba(255,255,255,0.3)"
                  color="white"
                  _hover={{ bg: "rgba(255,255,255,0.08)" }}
                  px="10px"
                  h="26px"
                  fontSize="11px"
                >
                  📍 Map
                </Button>
              </Flex>
            ))}
          </Stack>
        </VStack>

        {!isMobile && (
          <Box
            flex="0 0 auto"
            w="380px"
            h="520px"
            borderRadius="200px"
            overflow="hidden"
            bgImage={`url(${coupleImage})`}
            bgSize="cover"
            bgPos="center"
          />
        )}
      </Flex>

      {/* ————— RSVP ————— */}
      {data?.rsvp !== false && (
        <VStack
          bg="#F4F1EC"
          py={isMobile ? "40px" : "72px"}
          px={isMobile ? "24px" : "0"}
          gap="24px"
        >
          <Text
            fontFamily={serifFont}
            fontSize={isMobile ? "20px" : "26px"}
            letterSpacing="0.08em"
            textAlign="center"
            textTransform="uppercase"
          >
            Please let us know if you<br />will join us
          </Text>
          <VStack gap="12px" w={isMobile ? "100%" : "420px"}>
            <Input
              placeholder="Type your full name"
              size="lg"
              bg="white"
              borderColor="rgba(0,0,0,0.1)"
              fontSize="14px"
            />
            <Box
              as="select"
              w="100%"
              h="44px"
              px="14px"
              bg="white"
              border="1px solid rgba(0,0,0,0.1)"
              borderRadius="6px"
              fontSize="14px"
              color="#6B6B6B"
              disabled
            >
              <option>Guest count</option>
            </Box>
            <HStack w="100%" gap="12px" pt="4px">
              <Button
                flex="1"
                bg="var(--c-primary)"
                color="white"
                h="44px"
                fontSize="13px"
                _hover={{ opacity: 0.9 }}
              >
                I will attend
              </Button>
              <Button
                flex="1"
                variant="outline"
                borderColor="rgba(0,0,0,0.15)"
                color="#111"
                h="44px"
                fontSize="13px"
              >
                Sorry, can't make it
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
          fontFamily={serifFont}
          fontSize={isMobile ? "20px" : "26px"}
          letterSpacing="0.12em"
          fontWeight="600"
        >
          DRESS CODE
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
          <Box w="32px" h="32px" borderRadius="50%" bg="var(--c-secondary)" ml="-10px" />
          <Box w="32px" h="32px" borderRadius="50%" bg="var(--c-surface)" ml="-10px" />
        </HStack>
        <VStack gap="4px">
          <Text fontSize="14px" fontWeight="500">
            {dressCodeStyle}
          </Text>
          <Text fontSize="12px" color="rgba(255,255,255,0.6)">
            Warm and sophisticated tones.
          </Text>
        </VStack>
        <Text
          fontSize="12px"
          color="rgba(255,255,255,0.55)"
          maxW="720px"
          lineHeight="1.7"
          pt="8px"
        >
          Lorem ipsum dolor sit amet consectetur. Molestie suada sollicitudin suspendisse congue condimentum. Egestas at aliquam pharetra tempus et. Morbi tincidunt viverra nunc felis sollicitudin pretium. Lacus arcu purus sed diam. Varius laoreet quis pellentesque et justo at. Cursus cursus bibendum lacus pellentesque leo ullamcorper libero suspendisse in.
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
              fontFamily={serifFont}
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
              fontFamily={serifFont}
              opacity="0.85"
              lineHeight="1"
            >
              {"}"}
            </Text>
          </>
        )}
        <Text fontSize="12px" letterSpacing="0.15em" color="#6B6B6B" textTransform="uppercase">
          Go to look at the photos
        </Text>
        <Text
          fontFamily={serifFont}
          fontSize={isMobile ? "22px" : "28px"}
          letterSpacing="0.12em"
          fontWeight="600"
        >
          WEDDING GALLERY
        </Text>
        <Text fontSize="13px" color="#6B6B6B" maxW="440px">
          Our photos and videos will be available soon.<br />
          Please wait for the official link after the wedding.
        </Text>
        <Button
          bg="var(--c-primary)"
          color="white"
          mt="8px"
          px="40px"
          h="40px"
          fontSize="13px"
          _hover={{ opacity: 0.9 }}
          as={data?.albumLink ? "a" : "button"}
          {...(data?.albumLink ? { href: data.albumLink, target: "_blank" } : {})}
        >
          Open
        </Button>
      </VStack>

      {/* ————— OUR LOVE STORY ————— */}
      <Box
        position="relative"
        w="100%"
        py={isMobile ? "60px" : "100px"}
        px={isMobile ? "24px" : "120px"}
        bgImage={`linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.82)), url(${STORY_BG})`}
        bgSize="cover"
        bgPos="center"
      >
        <VStack gap="20px" textAlign="center">
          <Text
            fontFamily={serifFont}
            fontSize={isMobile ? "20px" : "26px"}
            letterSpacing="0.12em"
            fontWeight="600"
          >
            OUR LOVE STORY
          </Text>
          <Text
            maxW="720px"
            fontSize={isMobile ? "13px" : "15px"}
            color="#444"
            lineHeight="1.7"
            whiteSpace="pre-line"
          >
            {storyText}
          </Text>
        </VStack>
      </Box>

      {/* ————— PHOTO STRIP ————— */}
      <Flex w="100%" h={isMobile ? "180px" : "260px"}>
        {gallery.map((src, i) => (
          <Box
            key={i}
            flex="1"
            h="100%"
            bgImage={`url(${typeof src === "string" ? src : src?.url || ""})`}
            bgSize="cover"
            bgPos="center"
            filter={i === 1 || i === 3 ? "grayscale(100%)" : "none"}
          />
        ))}
      </Flex>

      {/* ————— CONTACT ————— */}
      <VStack
        bg="var(--c-primary)"
        color="white"
        py={isMobile ? "28px" : "40px"}
        gap="12px"
      >
        <Text fontSize="14px" letterSpacing="0.12em" fontWeight="600">
          CONTACT WITH US
        </Text>
        <HStack
          gap={isMobile ? "16px" : "32px"}
          fontSize="13px"
          color="rgba(255,255,255,0.85)"
        >
          <Text>{phone}</Text>
          <Text>{email}</Text>
        </HStack>
      </VStack>

      {/* Palette indicator (matches the "Palette - C1" label in the mockup) */}
      <Box bg="#222" color="rgba(255,255,255,0.6)" textAlign="center" py="8px" fontSize="11px">
        Palette — {palette?.name?.en || palette?.id || "default"}
      </Box>
    </Box>
  );
};

const CountdownCell = ({ value, label, isMobile }) => (
  <HStack px={isMobile ? "10px" : "18px"} align="baseline" gap="6px">
    <Text
      fontFamily={serifFont}
      fontSize={isMobile ? "36px" : "52px"}
      fontWeight="600"
      color="var(--c-primary)"
      lineHeight="1"
    >
      {value}
    </Text>
    <Text
      fontSize={isMobile ? "12px" : "14px"}
      color="#6B6B6B"
      textTransform="lowercase"
    >
      {label}
    </Text>
  </HStack>
);
