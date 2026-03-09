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

import { localesMap } from "./constants";
export const getFlagCode = (lang) => {
  return localesMap[lang];
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

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function downloadTableList(printRef) {
  const element = printRef.current;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: "a4",
  });

  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("table-list.pdf");
}