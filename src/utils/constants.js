export const locales = ["hy", "en", "ru"]

export const prefixes = {
  'hy': '/hy',
  'en': '/en',
  'ru': '/ru'
}

import { hyFlag, enFlag, ruFlag } from '../assets/svgs';
export const languages = [
  { code: "hy", flag: hyFlag },
  { code: "en", flag: enFlag },
  { code: "ru", flag: ruFlag },
];

export const days = (difference) => Math.floor(difference / (1000 * 60 * 60 * 24));
export const hours = (difference) => Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
export const minutes = (difference) => Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

export const currentYear = new Date().getFullYear();

export const today = new Date();

export const expired = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: true,
}

import { enUS, ru, hy } from "react-day-picker/locale";

export const DATE_LOCALES = {
  en: enUS,
  hy: hy,
  ru: ru,
};

export const mainPages = [
  {
    name: "digital_invitations",
    path: "build/templates"
  },
  {
    name: "about",
    path: "about-us"
  },
]

export const socialPages = [
  { name: "privacy_policy", path: "policies/privacy-policy" },
  { name: "terms_conditions", path: "policies/terms-conditions" },
  // { name: "guides", path: "guides" },
  // { name: "blog", path: "blog" },
]

export const buildPages = [
  { path: "/build/templates", name: "themes" },
  { path: "/build/customisations", name: "customisations" },
  { path: "/build/details", name: "details" },
  { path: "/build/preview", name: "preview" },
  { path: "/build/confirm", name: "confirm" },
  // { path: "/build/payment", name: "payment" },
];

export const authPages = ["profile", "invitations", "logout"]

export const steps = {
  "/build/templates": 1,
  "/build/customisations": 2,
  "/build/details": 3,
  "/build/preview": 4,
  "/build/confirm": 5,
};

export const totalSteps = 4;


export const contentMap = {
  "/build/templates": {
    title: "plan_title_two",
    // text: "template_text",
    text: "",
  },
  "/build/details": {
    title: "details_title",
    text: "details_text",
  },
  "/build/preview": {
    title: "preview_title",
    text: "preview_text",
  },
  "/build/confirm": {
    title: "confirm_title",
    text: "confirm_text",
  },
};


import { Icon } from '@chakra-ui/react';
import { laptop, mobile, pc } from '../assets/svgs';

export const responsive = [
  {
    id: 1,
    name: "pc",
    icon: <Icon>{pc.icon}</Icon>
  },
  {
    id: 2,
    name: "laptop",
    icon: <Icon>{laptop.icon}</Icon>
  },
  {
    id: 3,
    name: "mobile",
    icon: <Icon>{mobile.icon}</Icon>
  },
]

export const styles = [
  { label: "Casual", value: "casual" },
  { label: "Formal", value: "formal" },
  { label: "Black Tie", value: "black_tie" },
]

export const schemes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Colorful", value: "colorful" },
]

export const detailsForm = {
  templateId: "",
  title: {
    hy: "",
    en: "",
    ru: ""
  },
  groomName: {
    hy: "",
    en: "",
    ru: ""
  },
  brideName: {
    hy: "",
    en: "",
    ru: ""
  },
  // urlExtension: "",
  eventDate: "",
  description: {
    hy: "",
    en: "",
    ru: ""
  },
  mainImages: [],
  confirmationEnabled: true,
  eventVenue: {
    name: "",
    locationLink: ""
  },
  timeline: [],
  countDown: true,
  connectWithUs: {
    name: "",
    phone: "",
    email: "",
  },
  dressCode: {
    description: {
      hy: "",
      en: "",
      ru: ""
    },
    colorPaletteId: "",
  },
  albumLink: "",
  ourStory: {
    text: {
      hy: "",
      en: "",
      ru: ""
    },
    photoUrls: [],
  },
  languages: ["hy"],
  colorPaletteId: "",
}

export const SERVER_FIELDS = [
  "status",
  "createdAt",
  "publishedAt",
  "expiresAt",
  "finalPrice",
  "guestCount",
  "lastModifiedAt",
  "template",
];

export const INVITATION_FIELDS = [
  "id",
  "title",
  "groomName",
  "brideName",
  "urlExtension",
  "eventDate",
  "description",
  "mainImages",
  // "closingText",
  "confirmationEnabled",
  "timeline",
  "countDown",
  "connectWithUs",
  "dressCode",
  "albumLink",
  "ourStory",
  "languages",
  "colorPaletteId",
  "eventVenue",
  "templateId",
];

import visa from "@/assets/imgs/visa.png";
import idram from "@/assets/imgs/idram.png";

export const paymentMethods = [
  {
    value: "visa",
    src: visa,
  },
  {
    value: "idram",
    src: idram,
  },
]

export const invitationTabs = [
  {
    id: 1,
    name: "active"
  },
  {
    id: 2,
    name: "drafts"
  },
  {
    id: 3,
    name: "expired"
  },
]

import { fb, insta } from "../assets/svgs";

export const social = [
  {
    href: "https://www.facebook.com/profile.php?id=61550794792772",
    icon: fb
  },
  {
    href: "https://www.instagram.com/allset_event/",
    icon: insta
  }
]

import { create, manage, check } from '../assets/svgs';
export const available = [
  {
    id: 1,
    bg: "#8D6F49",
    icon: create,
    iconBg: "#AC8A5F",
    title: "available_one_title",
    description: "available_one_desc"
  },
  {
    id: 2,
    bg: "#AC8A5F",
    icon: manage,
    iconBg: "#A17F54",
    title: "available_two_title",
    description: "available_two_desc"
  },
  {
    id: 3,
    bg: "#C2A989",
    icon: check,
    iconBg: "#AC8A5F",
    title: "available_three_title",
    description: "available_three_desc"
  }
]

export const features = [
  {
    id: 1,
    title: "feature_one_title",
    description: "feature_one_desc"
  },
  {
    id: 2,
    title: "feature_two_title",
    description: "feature_two_desc"
  },
  {
    id: 3,
    title: "feature_three_title",
    description: "feature_three_desc"
  }
]

export const choose = [
  {
    id: 1,
    title: "choose_one_title",
    description: "choose_one_desc"
  },
  {
    id: 2,
    title: "choose_two_title",
    description: "choose_two_desc"
  },
  {
    id: 3,
    title: "choose_three_title",
    description: "choose_three_desc"
  },
  {
    id: 4,
    title: "choose_four_title",
    description: "choose_four_desc",
  },
  {
    id: 5,
    title: "choose_five_title",
    description: "choose_five_desc"
  }
]

export const instruction = [
  {
    id: 1,
    title: "create_one_title",
    description: "create_one_desc"
  },
  {
    id: 2,
    title: "create_two_title",
    description: "create_two_desc"
  },
  {
    id: 3,
    title: "create_three_title",
    description: "create_three_desc"
  }
]

export const guestsTableHeader = [
  "guest_name",
  "accompanying_name",
  "status",
  "note",
  "group_count",
  "guest_group",
  "table_number",
  ""
];

export const guestEditOptions = ["GROOM", "BRIDE"];

// view
export const FALLBACK = ["#0D3B3A", "#7FA39B", "#C7D6CE", "#F1F4EF"];

export const VIEWPORTS = ["pc", "laptop", "mobile"];

export const DEFAULT_VIEWPORT = "mobile";

export const DESIGN_WIDTH = {
  pc: 1440,
  laptop: 1024,
  mobile: 375,
};

import fallbackBg1 from "@/assets/imgs/invitations/classic/fallback_bg_1.jpg";
import fallbackBg2 from "@/assets/imgs/invitations/classic/fallback_bg_2.jpg";
import fallbackBg3 from "@/assets/imgs/invitations/classic/fallback_bg_3.jpg";
import fallbackBg4 from "@/assets/imgs/invitations/classic/fallback_bg_4.jpg";

export const CLASSIC_FALLBACKS = [
  fallbackBg1.src,
  fallbackBg2.src,
  fallbackBg3.src,
  fallbackBg4.src,
];

import slide1 from "@/assets/imgs/invitations/modern/slide_1.jpg";
import slide2 from "@/assets/imgs/invitations/modern/slide_2.jpg";
import slide3 from "@/assets/imgs/invitations/modern/slide_3.jpg";
import slide4 from "@/assets/imgs/invitations/modern/slide_4.jpg";
import slide5 from "@/assets/imgs/invitations/modern/slide_5.jpg";

export const MODERN_FALLBACKS = [
  slide1.src,
  slide2.src,
  slide3.src,
  slide4.src,
  slide5.src,
];

export const GUEST_COUNT = [
  { label: "classic_no", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
]

export const TIMELINE = [
  { time: "12:00", venueName: "BRIDE'S HOME", venueLocation: "https://maps.google.com" },
  { time: "13:30", venueName: "DEPARTURE TO GROOM'S HOME", venueLocation: "https://maps.google.com" },
  { time: "16:00", venueName: "GROOM'S HOME", venueLocation: "https://maps.google.com" },
  { time: "17:30", venueName: "ARRIVAL AT RECEPTION VENUE", venueLocation: "https://maps.google.com" },
]

// used in formatEventDate & diffParts formatters
export const FALLBACK_DATE = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d;
})();