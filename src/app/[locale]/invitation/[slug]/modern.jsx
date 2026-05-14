"use client";

import { useState, useRef, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import { formatEventDate, paletteToVars } from "@/utils/formatters";
import { Language } from "@/components/invitation/language";
import { getInvitationForm, pickLang } from "@/utils/helpers";
import {
  Box,
  Button,
  createListCollection,
  Flex,
  For,
  HStack,
  Icon,
  Input,
  Loader,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { leftBrace, map, rightBrace } from "@/assets/svgs";
import { CountdownTimer } from "@/components/invitation/countdownTimer";
import mainBg from "@/assets/imgs/invitations/modern/main_bg.png";
import timingBg from "@/assets/imgs/invitations/classic/timing_bg.jpg";
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

export default function Modern({
  viewport = "pc",
  palette,
  data,
  isLoading = false,
}) {
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
  const eventDateText = formatEventDate(data?.eventDate);

  const [form, setForm] = useState(getInvitationForm(id));
  const [guests, setGuests] = useState([`${t("classic_count")}`]);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
  // console.log(data);

  if (isLoading) {
    return <Loader />;
  }

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
            fontFamily="var(--font-allegrou)"
            // fontFamily={sosBanff.style.fontFamily}
            fontSize={isMobile ? "54px" : "103px"}
            lineHeight="24px"
            fontWeight="400"
          >
            {title}
          </Text>
          <Text
            fontFamily="var(--font-allegrou)"
            fontSize={isMobile ? "26px" : "63px"}
            lineHeight="24px"
            fontWeight="400"
          >
            {eventDateText}
          </Text>
        </VStack>
      </Box>

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
