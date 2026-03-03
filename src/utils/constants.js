export const locales = ["hy", "en", "ru"]

export const prefixes = {
  'hy': '/hy',
  'en': '/en',
  'ru': '/ru'
}

export const languages = [
  {
    code: "hy",
    flag: "am",
  },
  {
    code: "en",
    flag: "gb",
  },
  {
    code: "ru",
    flag: "ru",
  },
]

export const localesMap = {
  hy: "am",
  en: "gb",
  ru: "ru",
}

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

export const calendarLocales = {
  en: enUS,
  hy: hy,
  ru: ru,
};

export const mainPages = [
  // "digital_invitations", "about-us"
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
  { name: "terms_of_service", path: "policies/terms-of-service" },
  // { name: "guides", path: "guides" },
  // { name: "blog", path: "blog" },
]

export const buildPages = [
  { path: "/build/templates", name: "themes" },
  { path: "/build/customisations", name: "customisations" },
  { path: "/build/details", name: "details" },
  { path: "/build/preview", name: "preview" },
  { path: "/build/confirm", name: "confirm" },
  { path: "/build/payment", name: "payment" },
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
    title: "template_title",
    text: "template_text",
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
  languages: ["hy"],
  templateId: "",
  colorPaletteId: "",
  title: {
    hy: "",
    en: "",
    ru: ""
  },
  urlExtension: "",
  eventDate: "",
  description: {
    hy: "",
    en: "",
    ru: ""
  },
  mainImages: [],
  rsvp: true,
  // closingText: {
  //   hy: "",
  //   en: "",
  //   ru: ""
  // },
  venue: {
    location: "",
    link: ""
  },
  timeline: [],
  countDown: true,
  connectWithUs: {
    // description: "",
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
    style: "",
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
  }
}

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

import { fb, insta, twitter, youtube, tiktok, pinterest } from "../assets/svgs";

export const social = [
  {
    href: "https://",
    icon: fb
  },
  {
    href: "https://",
    icon: insta
  },
  {
    href: "https://",
    icon: twitter
  },
  {
    href: "https://",
    icon: youtube
  },
  {
    href: "https://",
    icon: tiktok
  },
  {
    href: "https://",
    icon: pinterest
  },
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

// export const translitMap = {
//   // Armenian letters
//   ա: "a", բ: "b", գ: "g", դ: "d", ե: "e", զ: "z", է: "e", ը: "y",
//   թ: "t", ժ: "zh", ի: "i", լ: "l", խ: "kh", ծ: "ts", կ: "k", հ: "h",
//   ձ: "dz", ղ: "gh", ճ: "ch", մ: "m", յ: "y", ն: "n", շ: "sh", ո: "vo",
//   չ: "ch", պ: "p", ջ: "j", ռ: "r", ս: "s", վ: "v", տ: "t", ր: "r",
//   ց: "ts", ւ: "u", փ: "p", ք: "q", օ: "o", ֆ: "f",

//   // Russian letters
//   а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
//   з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
//   п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
//   ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
// };