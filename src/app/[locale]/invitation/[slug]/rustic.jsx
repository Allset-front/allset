"use client";

import { useState, useRef, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import {
  formatEventDate,
  formatRusticTitle,
  paletteToVars,
} from "@/utils/formatters";
import { Language } from "@/components/invitation/language";
import { getInvitationForm, pickLang } from "@/utils/helpers";
import {
  Box,
  Button,
  Center,
  Container,
  createListCollection,
  Flex,
  For,
  HStack,
  Icon,
  Image,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  bottle,
  bottomPin,
  heart,
  leftBrace,
  map,
  rightBrace,
  topPin,
  view,
} from "@/assets/svgs";
import { CountdownTimer } from "@/components/invitation/countdownTimer";
import img from "@/assets/imgs/invitations/rustic/main_img.png";
import loveBg from "@/assets/imgs/invitations/rustic/love_bg.png";
import ring from "@/assets/imgs/invitations/rustic/ring.png";
import overlay from "@/assets/imgs/invitations/rustic/overlay.png";
import overlay2 from "@/assets/imgs/invitations/rustic/overlay2.png";
import galleryBg from "@/assets/imgs/invitations/rustic/gallery_bg.png";
import moments from "@/assets/imgs/invitations/rustic/moments.png";
import timingBg from "@/assets/imgs/invitations/rustic/timing_bg.png";
import timingImg from "@/assets/imgs/invitations/rustic/timing_img.png";
import dresscodeBg from "@/assets/imgs/invitations/rustic/dresscode_bg.png";
import dresscodeImg from "@/assets/imgs/invitations/rustic/dresscode_img.png";
// import storyBg from "@/assets/imgs/invitations/rustic/story_bg.jpg";
import { GUEST_COUNT, GALLERY_FALLBACKS, TIMELINE } from "@/utils/constants";
import { Link } from "@/i18n/routing";
import { Radio } from "@/components/auth/invitations/guests/radio";
import { isNotEmptyArray } from "@/utils/checkers";
import { error, success } from "@/components/ui/alerts";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { Rsvp } from "@/components/invitation/rsvp";
import { Calendar } from "@/components/invitation/calendar";

export default function Rustic({ viewport = "pc", palette, data }) {
  const t = useTranslations();
  const language = useLocale();
  const galleryRef = useRef(null);

  const { mutate } = useMutateAuthTanstack("confirmations/guest", "post", {
    onSuccess: () => {
      setForm(getInvitationForm(id));
      setGuests([`${t("classic_count")}`]);
      success("Confirmation has been sent.");
    },
    onError: (err) =>
      error(err?.response?.data?.error || "Guest list adding error!"),
  });

  const id = data?.id;
  const locales = data?.languages;
  const vars = paletteToVars(
    palette?.colors ?? data?.template?.paletteKeyword?.colors,
  );
  // const title = pickLang(data?.title, language) || "Henry & Mariam";
  const { name1, name2 } = formatRusticTitle(data?.title, language);
  const eventDateText = formatEventDate(data?.eventDate);

  const [form, setForm] = useState(getInvitationForm(id));
  const [guests, setGuests] = useState([`${t("classic_count")}`]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const heroImage = data?.mainImages?.[0] || img.src;
  const coupleImage = data?.mainImages?.[1] || null; //
  const gallery = data?.ourStory?.photoUrls?.length
    ? data.ourStory.photoUrls
    : GALLERY_FALLBACKS;

  const galleryItems = useMemo(
    () =>
      gallery.map((src) => {
        return { original: src, thumbnail: src };
      }),
    [gallery],
  );

  const description = pickLang(data?.description, language) || t("rustic_desc");
  const timeline = data?.timeline || TIMELINE;
  const dressCodeDesc =
    pickLang(data?.dressCode?.description, language) || t("dresscode_desc");
  const dressCodeName =
    data?.dressCode?.colorPaletteId || palette?.name?.[language]; // needs checking
  const dressCodeAbout = "" || palette?.description?.[language]; // needs checking
  const storyText =
    pickLang(data?.ourStory?.text, language) || t("classic_story_desc");
  const contact = data?.connectWithUs || {};
  const phone = contact.phone || "+374 99 XXXXXX";
  const email = contact.email || "username@gmail.com";
  const guestCount = createListCollection({
    items: GUEST_COUNT,
  });

  // const width = designWidth(viewport);
  const isMobile = viewport === "mobile";

  const openFullscreen = () => {
    setIsFullscreen(true);
    setTimeout(() => galleryRef.current?.fullScreen(), 50);
  };

  // form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecondaryGuestChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.secondaryGuests];
      updated[index] = value;

      return {
        ...prev,
        secondaryGuests: updated,
      };
    });
  };

  const handleGuestCountChange = ({ value }) => {
    const count = Number(value[0]) || 0;

    setGuests(value);
    setForm((prev) => ({
      ...prev,
      secondaryGuests:
        count === 0
          ? []
          : Array.from(
              { length: count },
              (_, i) => prev.secondaryGuests[i] ?? "",
            ),
    }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!form.mainGuest) return error(t("add_guest"));
    if (!form.guestSide) return error(t("invitor"));

    const hasEmptyGuest = form.secondaryGuests.some((guest) => !guest.trim());
    if (hasEmptyGuest) return error(t("accompanying_name"));

    mutate({ ...form, status: "CONFIRMED" });
  };

  const handleDecline = (e) => {
    e.preventDefault();

    if (!form.mainGuest) return error(t("add_guest"));
    if (!form.guestSide) return error(t("invitor"));

    mutate({ ...form, status: "DECLINED" });
  };
  console.log(data);
  console.log(vars);

  return (
    <Box
      data-viewport={viewport}
      style={vars}
      // w={`${width}px`}
      bg="#F6F5F4"
      color="#111"
      overflow="hidden"
      pt="75px"
      // position={"relative"}
    >
      {locales && <Language locales={locales} />}

      {/* ————— HERO ————— */}
      <Container maxW="1440px" px={{ base: "24px", md: "80px" }}>
        <Flex justify={"space-between"} gap="120px">
          <Stack position="relative">
            <Image
              src={img.src}
              alt="img"
              w="428px"
              h="427px"
              borderRadius={"5px"}
            />

            <Image
              position={"absolute"}
              bottom={"-25px"}
              right={"-80px"}
              src={loveBg.src}
              alt="img"
              w="288px"
              h="167px"
              objectFit={"contain"}
              borderRadius={"5px"}
            />
          </Stack>

          <VStack align={"start"} gap="80px">
            <Flex
              w="100%"
              gap="70px"
              justify={"space-between"}
              align={"center"}
            >
              <Text
                fontFamily="var(--font-shk)"
                color="var(--c-primary)"
                // fontFamily={sosBanff.style.fontFamily}
                fontSize={isMobile ? "54px" : "64px"}
                lineHeight="24px"
                fontWeight="400"
              >
                {t("rustic_title")}
              </Text>

              <Box
                bgColor="var(--c-accent)"
                borderRadius={"100%"}
                pb="25px"
                pl="20px"
                pr="20px"
              >
                <Icon mt={"-45px"}>{bottle.icon}</Icon>
              </Box>
            </Flex>
            <Text
              w="500px"
              fontSize={isMobile ? "16px" : "20px"}
              lineHeight="28px"
              fontWeight="400"
              color="var(--c-primary)"
            >
              {description}
            </Text>

            <Text
              fontFamily="var(--font-shk)"
              color="var(--c-primary)"
              fontSize={"74px"}
              fontWeight={"400"}
              lineHeight={"24px"}
            >
              {name1 + " + " + name2 + " = "} <Icon>{heart.icon}</Icon>
            </Text>
          </VStack>
        </Flex>
      </Container>

      {/* ————— COUNTDOWN ————— */}
      <Box
        bgColor="var(--c-accent)"
        position="relative"
        w="full"
        h="263px"
        overflow="visible"
        mt="132px"
        mb="187px"
      >
        <Container
          maxW="1440px"
          px={{ base: "24px", md: "80px" }}
          h="full"
          overflow="visible"
          position="relative"
        >
          <Image
            src={ring.src}
            alt="ring"
            position="absolute"
            top="-40px"
            // left="0"
            zIndex={1}
          />

          <Flex
            h="full"
            align="center"
            justify="space-between"
            gap={isMobile ? "24px" : "116px"}
          >
            <VStack gap={isMobile ? "16px" : "60px"} align="center">
              <Text color="var(--c-primary)">{t("rustic_journey")}</Text>
              {data?.countDown !== false && (
                <CountdownTimer
                  template={data?.templateId}
                  eventDate={data?.eventDate}
                  isMobile={isMobile}
                />
              )}
            </VStack>

            <VStack position="relative" alignSelf="center" flexShrink={0}>
              <Icon color="var(--c-accent)" mb={"-35px"} zIndex={2}>
                {topPin.icon}
              </Icon>
              {/* <Image src={overlay.src} alt="overlay" mb={"-35px"} zIndex={2} /> */}
              <Calendar value={data?.eventDate} zIndex={1} />
              <Icon color="var(--c-accent)" mt={"-35px"} zIndex={2}>
                {bottomPin.icon}
              </Icon>
              {/* <Image src={overlay2.src} alt="overlay" mt={"-35px"} zIndex={2} /> */}
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* ————— TIMING ————— */}
      <Center pt="90px">
        <Box position="relative" minH="1164px" minW="1086px">
          <Box
            position="absolute"
            inset="0"
            bg="var(--c-secondary)"
            style={{
              WebkitMaskImage: `url(${timingBg.src})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",

              maskImage: `url(${timingBg.src})`,
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          />
          <Box
            position="absolute"
            inset="0"
            bgImage={`url(${timingBg.src})`}
            bgSize="contain"
            bgPosition="center"
            bgRepeat="no-repeat"
            mixBlendMode="multiply"
            opacity={0.9}
          />
          <VStack
            position={"relative"}
            // bgImage={`url(${timingBg.src})`}
            // bgSize="contain"
            // bgPos="center"
            // bgRepeat="no-repeat"
            minH="1164px"
            h="100%"
            minW="1086px"
            // w="fit-content"
            gap="60px"
            px="160px"
            align={"center"}
            justify={"center"}
          >
            <Image
              src={timingImg.src}
              alt="timing"
              w="391px"
              position={"absolute"}
              top="-170px"
              right="-170px"
            />
            <Text
              fontWeight="800"
              fontSize={isMobile ? "22px" : "34px"}
              lineHeight="24px"
              textTransform="uppercase"
              color="var(--c-primary)"
              // dangerouslySetInnerHTML={{
              //   __html: t("classic_timing").replace(/\n/g, "<br />"),
              // }}
            >
              {t("classic_timing")}
            </Text>
            <Stack gap="40px">
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
                      color="var(--c-primary)"
                    >
                      {pickLang(item.venueName, language) || item.venueName}
                    </Text>
                    <ChakraLink
                      as={Link}
                      href={item.venueLocation}
                      target="_blank"
                      fontSize="14px"
                      color="var(--c-primary)"
                      textDecoration="underline"
                    >
                      {t("classic_map")}
                    </ChakraLink>
                  </VStack>
                </Flex>
              ))}
            </Stack>
          </VStack>
        </Box>
      </Center>

      {/* ————— RSVP ————— */}
      <Rsvp
        isMobile={isMobile}
        color="var(--c-primary)"
        data={data?.rsvp}
        guestCount={guestCount}
        form={form}
        setForm={setForm}
        guests={guests}
        handleChange={handleChange}
        handleGuestCountChange={handleGuestCountChange}
        handleConfirm={handleConfirm}
        handleDecline={handleDecline}
      />

      {/* ————— DRESS CODE ————— */}
      <Center>
        <VStack
          maxW="736px"
          minH="775px"
          gap={"60px"}
          textAlign="center"
          justify={"center"}
          bgImage={`url(${dresscodeBg.src})`}
          bgSize="contain"
          bgPos="center"
        >
          <Stack gap="32px" px="102px" position={"relative"}>
            <Image
              src={dresscodeImg.src}
              alt="moments"
              position={"absolute"}
              right="-300px"
              top="150px"
              boxSize={"423px"}
            />
            <Text
              fontSize={isMobile ? "20px" : "34px"}
              lineHeight="24px"
              fontWeight="800"
              color="var(--c-primary)"
              textTransform={"uppercase"}
            >
              {t("dresscode")}
            </Text>
            <Text
              fontSize={isMobile ? "13px" : "18px"}
              lineHeight="28px"
              color="#6F786C"
            >
              {dressCodeDesc}
            </Text>
          </Stack>

          <Stack gap={"32px"}>
            <VStack gap="20px">
              <HStack gap="0">
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="50%"
                  bg="var(--c-accent)"
                />
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
                color="var(--c-primary)"
              >
                {dressCodeName}
              </Text>
              {dressCodeAbout && (
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight={"22px"}
                  color="#6B7280"
                >
                  {dressCodeAbout}
                </Text>
              )}
            </VStack>
          </Stack>
        </VStack>
      </Center>

      {/* ————— WEDDING GALLERY ————— */}
      <Center pt="60px">
        <VStack
          bgImage={`url(${galleryBg.src})`}
          bgSize="contain"
          bgPos="center"
          bgRepeat="no-repeat"
          minW="735px"
          w="fit-content"
          h="541px"
          position={"relative"}
          align={"center"}
          justify={"center"}
        >
          <Image
            src={moments.src}
            alt="moments"
            position={"absolute"}
            left="-110px"
            top="55px"
          />
          <Text
            fontSize={"12px"}
            fontWeight={400}
            lineHeight={"22px"}
            color="var(--c-primary)"
          >
            {t("classic_look")}
          </Text>
          <Text
            w="560px"
            textAlign={"center"}
            fontSize={"34px"}
            fontWeight={500}
            lineHeight={"48px"}
            color="var(--c-primary)"
          >
            {t("classic_gallery")}
          </Text>
          <VStack>
            <Button
              variant={"plain"}
              p="23px"
              bg="#B7ADA0DE"
              borderRadius={"100%"}
              w="64px"
              h="64px"
              mt="20px"
            >
              <Icon>{view.icon}</Icon>
            </Button>
            <Text
              fontSize={"12px"}
              fontWeight={400}
              lineHeight={"22px"}
              color="var(--c-primary)"
              mb="20px"
            >
              {t("classic_view")}
            </Text>
          </VStack>
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="22px"
            color="var(--c-primary)"
            maxW="440px"
            textAlign={"center"}
            dangerouslySetInnerHTML={{
              __html: t("classic_soon").replace(/\n/g, "<br />"),
            }}
          />
        </VStack>
      </Center>

      {/* ————— OUR LOVE STORY ————— */}
      <Container maxW="1440px" px={{ base: "24px", md: "80px" }}>
        <Flex
          w="100%"
          justify={"space-between"}
          align={"center"}
          pt="106px"
          pb="50px"
        >
          <Stack gap="40px">
            <Text
              color="var(--c-primary)"
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
              color="var(--c-primary)"
              whiteSpace="pre-line"
              fontWeight="400"
              // dangerouslySetInnerHTML={{
              //   __html: storyText.replace(/\n/g, "<br />"),
              // }}
            >
              {storyText}
            </Text>
          </Stack>

          <Box
          // position="relative"
          // w="100%"
          // py={isMobile ? "60px" : "112px"}
          // px={isMobile ? "24px" : "120px"}
          // bgImage={`url(${storyBg.src})`}
          // bgSize="cover"
          // bgRepeat={"no-repeat"}
          // bgPos="center"
          // h="451px"
          >
            SOON
          </Box>
        </Flex>
      </Container>

      {/* ————— CONTACT ————— */}
      <Flex
        // bg="var(--c-primary)"
        // color="white"
        // py={isMobile ? "28px" : "40px"}
        pt="48px"
        pb="75px"
        align={"center"}
        justify={"center"}
        gap="90px"
      >
        <Text
          fontSize="30px"
          lineHeight="24px"
          fontWeight="800"
          textTransform={"uppercase"}
          color="var(--c-primary)"
        >
          {t("classic_contact")}
        </Text>
        <Text
          as="a"
          href={`tel:${phone}`}
          fontSize="24px"
          lineHeight="24px"
          fontWeight="800"
          color="var(--c-primary)"
        >
          {phone}
        </Text>
        <Text
          as="a"
          href={`mailto:${email}`}
          fontSize="24px"
          lineHeight="24px"
          fontWeight="800"
          color="var(--c-primary)"
        >
          {email}
        </Text>
      </Flex>
    </Box>
  );
}
