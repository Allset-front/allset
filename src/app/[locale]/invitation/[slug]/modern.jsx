"use client";

import { useState, useRef, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import { formatDateByLang, paletteToVars } from "@/utils/formatters";
import { Language } from "@/components/invitation/language";
import { getInvitationForm, pickLang } from "@/utils/helpers";
import {
  Box,
  Button,
  Center,
  createListCollection,
  Flex,
  For,
  HStack,
  Icon,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  Image,
} from "@chakra-ui/react";
import {
  leftBrace,
  map,
  rightBrace,
  timingLeft,
  timingRight,
  rsvpLeft,
  rsvpRight,
  guestRight,
  guestLeft,
} from "@/assets/svgs";
import { CountdownTimer } from "@/components/invitation/countdownTimer";
import mainBg from "@/assets/imgs/invitations/modern/main_bg.png";
import timingBg from "@/assets/imgs/invitations/classic/timing_bg.jpg";
import borderBg from "@/assets/imgs/invitations/modern/border_bg.png";
import sliderBg from "@/assets/imgs/invitations/modern/slider_bg.png";
import storyBg from "@/assets/imgs/invitations/classic/story_bg.jpg";
import dresscodeBg from "@/assets/imgs/invitations/classic/dresscode_bg.jpg";
import { GUEST_COUNT, GALLERY_FALLBACKS, TIMELINE } from "@/utils/constants";
import { Link } from "@/i18n/routing";
import { Radio } from "@/components/auth/invitations/guests/radio";
import { isNotEmptyArray } from "@/utils/checkers";
import { error, success } from "@/components/ui/alerts";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { Rsvp } from "@/components/invitation/rsvp";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Modern({ viewport = "pc", palette, data }) {
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
  const title = pickLang(data?.title, language) || "Henry & Mariam";

  const { year, day, monthName, dayName } = formatDateByLang(
    data?.eventDate,
    language,
  );
  const [form, setForm] = useState(getInvitationForm(id));
  const [guests, setGuests] = useState([`${t("classic_count")}`]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const initialSlide = Math.floor((data?.mainImages?.length || 0) / 2);
  const heroImage = data?.mainImages?.[0] || mainBg.src;
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

  const description =
    pickLang(data?.description, language) || t("classic_title");
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
  // console.log(vars);

  return (
    <Box
      data-viewport={viewport}
      style={vars}
      // w={`${width}px`}
      bg="#F3F3F3"
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
        // bgImage={`linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%), url(${heroImage})`}
        bgImage={`linear-gradient(180deg, rgba(0,0,0,0.05) 50%, #F3F3F3 99.43%), url(${heroImage})`}
        bgSize="cover"
        bgPos="center"
      >
        <VStack
          position="absolute"
          bottom={isMobile ? "40px" : "50px"}
          left="0"
          right="0"
          gap={isMobile ? "8px" : "114px"}
          // color="white"
          textAlign="center"
        >
          <Text
            fontFamily="var(--font-allegrou)"
            // fontFamily={sosBanff.style.fontFamily}
            fontSize={isMobile ? "54px" : "103px"}
            lineHeight="24px"
            fontWeight="400"
          >
            {title}
          </Text>
        </VStack>
      </Box>

      {/* ————— DATE ————— */}
      <Flex gap="12px" align="baseline" justify="center" py="100px">
        <Text
          textAlign="center"
          fontSize={isMobile ? "18px" : "24px"}
          lineHeight="24px"
          fontWeight="600"
          minW="177px"
          border="2px solid"
          borderBottomColor="var(--c-primary)"
          borderTopColor="var(--c-primary)"
          borderLeftColor="transparent"
          borderRightColor="transparent"
          py="12px"
        >
          {dayName}
        </Text>
        <Stack gap="12px" align={"center"}>
          <Text
            fontSize={isMobile ? "26px" : "50px"}
            lineHeight="24px"
            fontWeight="1000"
          >
            {day}
          </Text>
          <Text fontSize={"16px"} lineHeight="25px" fontWeight="800">
            {year}
          </Text>
        </Stack>
        <Text
          textAlign="center"
          fontSize={isMobile ? "18px" : "24px"}
          lineHeight="24px"
          fontWeight="600"
          minW="177px"
          border="2px solid"
          borderBottomColor="var(--c-primary)"
          borderTopColor="var(--c-primary)"
          borderLeftColor="transparent"
          borderRightColor="transparent"
          py="12px"
        >
          {monthName}
        </Text>
      </Flex>

      {/* ————— MAIN ————— */}
      <Box position="relative" minH="1931px" w="100%">
        <Box
          position="absolute"
          inset="0"
          bg="var(--c-secondary)"
          style={{
            WebkitMaskImage: `url(${sliderBg.src})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url(${sliderBg.src})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            // WebkitMaskSize: "contain",
            // maskSize: "contain",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
        <VStack
          // position={"relative"}
          align={"center"}
          justify={"center"}
          minH="1931px"
          h="100%"
        >
          <Stack
            position={"relative"}
            w="100%"
            align={"center"}
            justify={"center"}
            gap="60px"
          >
            <Icon
              color="var(--c-accent)"
              position="absolute"
              left="12%"
              top="0%"
            >
              {guestLeft.icon}
            </Icon>
            <Icon
              color="var(--c-accent)"
              position="absolute"
              right="12%"
              top="0%"
            >
              {guestRight.icon}
            </Icon>
            <Text
              fontFamily="var(--font-allegrou)"
              fontWeight="400"
              fontSize={isMobile ? "100px" : "123px"}
              lineHeight="1.1"
              color="#F3F3F3"
            >
              {t("dear_guest")}
            </Text>
            <Text
              // maxW="942px"
              textAlign="center"
              fontSize={isMobile ? "15px" : "20px"}
              lineHeight="28px"
              fontWeight="400"
              color="#F3F3F3"
              w="60%"
            >
              {description}
            </Text>
            <Text
              fontWeight="500"
              fontSize={isMobile ? "15px" : "20px"}
              lineHeight={"28px"}
              color="#F3F3F3"
            >
              {t("classic_journey")}
            </Text>
            {/* ————— COUNTDOWN ————— */}
            <VStack gap={isMobile ? "24px" : "100px"}>
              {data?.countDown !== false && (
                <CountdownTimer
                  template={data?.templateId}
                  eventDate={data?.eventDate}
                  isMobile={isMobile}
                />
              )}
            </VStack>
            <Text
              fontWeight="500"
              fontSize={isMobile ? "15px" : "20px"}
              lineHeight={"28px"}
              color="#F3F3F3"
            >
              {t("rustic_journey")}
            </Text>
          </Stack>

          <Box w="100%" display="flex" justifyContent="center">
            <Swiper
              style={{ padding: "100px 0" }}
              effect={"coverflow"}
              slidesPerView={"auto"}
              centeredSlides={true}
              grabCursor={true}
              // watchOverflow={false}
              speed={500}
              spaceBetween={0}
              pagination={true}
              initialSlide={initialSlide}
              modules={[EffectCoverflow, Pagination]}
              coverflowEffect={{
                rotate: 18,
                stretch: 60,
                depth: 120,
                modifier: 1,
                slideShadows: false,
              }}
            >
              {data?.mainImages?.map((el, index) => {
                return (
                  <SwiperSlide key={index} style={{ width: "448px" }}>
                    <Stack
                      cursor={"pointer"}
                      w={"448px"}
                      h={{ base: "268px", sm: "556px" }}
                      alignItems={"center"}
                    >
                      <Image
                        src={el}
                        w={{ base: "168px", sm: "448px" }}
                        h={{ base: "268px", sm: "556px" }}
                        objectFit="cover"
                        transition="all 0.3s ease"
                        borderRadius={"10px"}
                      />
                    </Stack>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </VStack>
      </Box>

      <Box
        w="100%"
        bgImage={`url(${borderBg.src})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        {/* ————— TIMING ————— */}
        <Center pt="90px" position="relative">
          <Icon
            color="var(--c-accent)"
            position="absolute"
            left="5%"
            top="30%"
            transform="translateY(-30%)"
          >
            {timingLeft.icon}
          </Icon>
          <VStack gap="60px" px="160px" align={"center"} justify={"center"}>
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
            <Stack gap="40px" align={"center"} justify={"center"}>
              {timeline.map((item, i) => (
                <Flex
                  key={i}
                  justify={"space-between"}
                  align={"center"}
                  gap="20px"
                >
                  <VStack gap="24px" minW="160px">
                    <Text
                      fontSize={isMobile ? "20px" : "34px"}
                      fontWeight="800"
                      lineHeight={"24px"}
                    >
                      {item.time || "00:00"}
                    </Text>
                    <Text
                      fontSize={isMobile ? "15px" : "24px"}
                      fontWeight="500"
                      lineHeight={"24px"}
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
          <Icon
            color="var(--c-accent)"
            position="absolute"
            right="5%"
            top="10%"
            transform="translateY(-10%)"
          >
            {timingRight.icon}
          </Icon>
        </Center>

        {/* ————— RSVP ————— */}
        <Box position="relative">
          <Icon
            color="var(--c-accent)"
            position="absolute"
            left="10%"
            bottom="10%"
            // transform="translateY(-10%)"
          >
            {rsvpRight.icon}
          </Icon>
          <Rsvp
            isModern={true}
            isMobile={isMobile}
            color="var(--c-secondary)" // needs checking
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
          <Icon
            color="var(--c-accent)"
            position="absolute"
            right="15%"
            top="20%"
            // transform="translateY(-10%)"
          >
            {rsvpLeft.icon}
          </Icon>
        </Box>

        {/* ————— DRESS CODE ————— */}
        <Center position="relative">
          <Icon
            color="var(--c-accent)"
            position="absolute"
            left="15%"
            top="20%"
            // transform="translateY(-10%)"
          >
            {rsvpLeft.icon}
          </Icon>
          <Stack gap="32px">
            <Stack gap="32px" px="102px" position={"relative"}>
              <Text
                fontSize={isMobile ? "20px" : "34px"}
                lineHeight="24px"
                fontWeight="800"
                color="var(--c-primary)"
                textTransform={"uppercase"}
                textAlign={"center"}
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
          </Stack>
          <Icon
            color="var(--c-accent)"
            position="absolute"
            right="10%"
            bottom="10%"
            // transform="translateY(-10%)"
          >
            {rsvpRight.icon}
          </Icon>
        </Center>

        {/* ————— CONTACT ————— */}
        <Stack
          // bg="var(--c-primary)"
          // color="white"
          // py={isMobile ? "28px" : "40px"}
          pt="78px"
          pb="78px"
          align={"center"}
          justify={"center"}
          gap="32px"
        >
          <Text
            fontSize="34px"
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
            fontSize="18px"
            lineHeight="24px"
            fontWeight="400"
            color="var(--c-primary)"
          >
            {phone}
          </Text>
          <Text
            as="a"
            href={`mailto:${email}`}
            fontSize="18px"
            lineHeight="24px"
            fontWeight="400"
            color="var(--c-primary)"
          >
            {email}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
