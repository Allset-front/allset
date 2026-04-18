"use client";

export const scrollToTopWithDuration = (duration) => {
  const start = window.scrollY || document.documentElement.scrollTop;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

import { languages } from "./constants";
// export const getFlagCode = (lang) => {
//   return localesMap[lang];
// };
export const getFlagCode = (lang) => {
  const found = languages.find((l) => l.code === lang);
  return found?.flag || null;
};

import { steps } from "./constants";
export const getStepInfo = (pathname) => {
  const step = steps[pathname];

  if (!step) return { show: false };

  return {
    step,
    value: (step / 4) * 100,
    show: true,
  };
};

import { buildPages } from "./constants";
export const getPreviousRoute = (pathname) => {
  const index = buildPages.findIndex(r => r.path === pathname);
  if (index <= 0) return null;

  const prevRoute = buildPages[index - 1];
  return {
    path: `${prevRoute.path}`,
    name: prevRoute.name,
  };
};

export const getNextRoute = (pathname) => {
  const index = buildPages?.findIndex(r => r.path === pathname);
  if (index === -1 || index === buildPages.length - 1) return null;

  const nextRoute = buildPages[index + 1];
  return {
    path: `${nextRoute.path}`,
    name: nextRoute.name,
  };
};

// export const hasMultipleWords = (text) => {
//   if (!text || typeof text !== "string") return false;
//   const words = text.trim().split(/\s+/);
//   return words.length > 1;
// };

import { localesRegex } from "./regex";
export const navigateWithLocal = (pathname) =>
  pathname.replace(localesRegex, "")

export function random(num) {
  return Math.floor(Math.random() * num);
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

import cookies from "js-cookie";
export function clearAllSiteCookies() {
  Object.keys(cookies.get()).forEach((cookieName) => {
    cookies.remove(cookieName);
  });
}
import { expired, days, hours, minutes } from "./constants";

export function getTimeUntil(fullDate) {
  if (!fullDate) {
    return {};
  }

  const now = new Date();
  // const target = new Date(fullDate); // "YYYY-mm-dd"
  const [day, month, year] = fullDate.split("-").map(Number);

  const target = new Date(year, month - 1, day);
  const difference = target - now;

  if (difference <= 0) {
    return expired;
  }

  return {
    days: days(difference),
    hours: hours(difference),
    minutes: minutes(difference),
    expired: false,
  };
}

//
import profile_bg from "@/assets/imgs/profile_bg.png";
import invitations_bg from "@/assets/imgs/invitations_bg.png";
// import { transliterate } from "./formatters";

export function getAuthBg(pathname) {
  if (pathname?.includes("profile")) {
    return `url(${profile_bg.src})`
  } else if ((pathname?.includes("invitations") && !pathname?.includes("guests"))) {
    return `url(${invitations_bg.src})`
  }
}

export function getAuthBgSize(pathname) {
  if (pathname?.includes("profile")) {
    return "contain"
  } else if ((pathname?.includes("invitations") && !pathname?.includes("guests"))) {
    return "cover"
  }
}

export function getAuthBgPos(pathname) {
  if (pathname?.includes("profile")) {
    return "right"
  } else if ((pathname?.includes("invitations") && !pathname?.includes("guests"))) {
    return "center"
  }
}

export function getAuthTitle(pathname) {
  if (pathname?.includes("profile")) {
    return "profile"
  } else if ((pathname?.includes("invitations") && !pathname?.includes("guests"))) {
    return "invitations"
  } else return "guests"
}

export const getMaxDiscountPromocode = (codes = []) => {
  if (!codes.length) return null;

  return codes.reduce((max, item) =>
    item.discountValue > max.discountValue ? item : max
  );
};

export const getInitialForm = (id) => ({
  invitationId: id,
  mainGuest: "",
  secondaryGuests: [""],
  guestSide: "",
  status: "CONFIRMED",
  createdBy: "INVITATION_OWNER",
});

export const filterGuestsByName = (data = [], name = "") => {
  if (!name) return data;

  const nameLower = name.toLowerCase().trim();

  return data.filter((item) => {
    const mainMatch =
      item.mainGuest &&
      item.mainGuest.toLowerCase().includes(nameLower);

    const secondaryMatch =
      item.secondaryGuests &&
      item.secondaryGuests.some((guest) =>
        guest && guest.toLowerCase().includes(nameLower),
      );

    return mainMatch || secondaryMatch;
  });
};

export const filterInvitations = (data = [], name = "") => {
  if (!name) return data;

  const query = name.toLowerCase().trim();

  return data.filter((item) => {
    const titles = item?.title;

    const match =
      (titles?.en?.toLowerCase().includes(query) ?? false) ||
      (titles?.hy?.toLowerCase().includes(query) ?? false) ||
      (titles?.ru?.toLowerCase().includes(query) ?? false);

    return match;
  });
};