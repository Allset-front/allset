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
} from "@chakra-ui/react";
import { bottle, heart, leftBrace, map, rightBrace } from "@/assets/svgs";
import { CountdownTimer } from "@/components/invitation/countdownTimer";
import img from "@/assets/imgs/invitations/rustic/main_img.png";
import loveBg from "@/assets/imgs/invitations/rustic/love_bg.png";
import ring from "@/assets/imgs/invitations/rustic/ring.png";
import overlay from "@/assets/imgs/invitations/rustic/overlay.png";
import overlay2 from "@/assets/imgs/invitations/rustic/overlay2.png";
import timingBg from "@/assets/imgs/invitations/classic/timing_bg.jpg";
import dresscodeBg from "@/assets/imgs/invitations/classic/dresscode_bg.jpg";
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
  const coupleImage = data?.mainImages?.[1] || timingBg.src;
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
            <VStack
              gap={isMobile ? "16px" : "60px"}
              align="center"
            >
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
              <Image src={overlay.src} alt="overlay" mb={"-35px"} zIndex={2} />
              <Calendar value={data?.eventDate} zIndex={1} />
              <Image src={overlay2.src} alt="overlay" mt={"-35px"} zIndex={2} />
            </VStack>
          </Flex>
        </Container>
      </Box>
      {/* <Box
        bgColor="var(--c-accent)" //
        mt="132px" // needs to be removed
        mb="187px" // needs to be removed
        py={isMobile ? "40px" : "60px"}
        px={isMobile ? "24px" : "100px"}
        gap={isMobile ? "24px" : "100px"}
        position={"relative"}
        h="263px"
      >
        <Container maxW="1440px" px={{ base: "24px", md: "80px" }}>
          <Image src={ring.src} alt="ring" position={"absolute"} top="-100px" />
          <Flex gap="116px" justify={"space-between"}>
            <VStack gap="60px">
              <Text color="var(--c-primary)">{t("rustic_journey")}</Text>
              {data?.countDown !== false && (
                <CountdownTimer
                  template={data?.templateId}
                  eventDate={data?.eventDate}
                  isMobile={isMobile}
                />
              )}
            </VStack>

            <Stack mt="-125px">
              <Calendar value={data?.eventDate} />
            </Stack>
          </Flex>
        </Container>
      </Box> */}

      {/* ————— RSVP ————— */}
      <Rsvp
        isMobile={isMobile}
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
    </Box>
  );
}
