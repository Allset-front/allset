"use client";

export const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1);

export const deepCapitalize = (str) =>
  str?.toLowerCase()?.split(' ')?.map(word =>
    word?.charAt(0)?.toUpperCase() + word?.slice(1)
  )?.join(' ');


export function truncateText(text, maxLength, suffix = "...") {
  if (typeof text !== "string") return text;
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + suffix;
}

export function formatDate(date, format = "DD-MM-YYYY") {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
}

export function formatPrice(price, t) {
  const num = Number(price);
  if (isNaN(num)) return price;

  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formatted} ${t("currency")}`;
}

export const generateAgendaKey = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
};

export const formatDDMMYYYY = (date) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
}

// V1
// export const joinFilters = (filters) => filters?.join(",");

// V2
export const joinFilters = (filters) => {
  if (!filters) return "";

  if (Array.isArray(filters)) {
    return filters.join(",");
  }

  return filters; // already a string from query
};

import { escapeRegex } from "./regex";

export const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} style={{ background: "#81e6d9" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

import { SERVER_FIELDS, INVITATION_FIELDS } from "./constants";

export const buildPayload = (form) => {
  const payload = { ...form };
  SERVER_FIELDS.forEach((key) => delete payload[key]);
  if (!payload.id) delete payload.id;
  return payload;
};

export const pickInvitationFields = (data) =>
  INVITATION_FIELDS.reduce((acc, key) => {
    if (key in data) acc[key] = data[key];
    return acc;
  }, {});

export const extractKeyFromUrl = (url) => {
  try {
    return decodeURIComponent(new URL(url).pathname.slice(1));
  } catch {
    return null;
  }
};

// view
import { FALLBACK } from "./constants";

export const paletteToVars = (colors) => {
  const c = Array.isArray(colors) && colors.length ? colors : FALLBACK;
  return {
    "--c-primary": c[0] ?? FALLBACK[0],
    "--c-secondary": c[1] ?? c[0] ?? FALLBACK[1],
    "--c-accent": c[2] ?? c[1] ?? c[0] ?? FALLBACK[2],
    "--c-surface": c[3] ?? c[2] ?? c[1] ?? c[0] ?? FALLBACK[3],
  };
};
import { DESIGN_WIDTH, DEFAULT_VIEWPORT } from "./constants";

export const designWidth = (viewport) =>
  DESIGN_WIDTH[viewport] ?? DESIGN_WIDTH[DEFAULT_VIEWPORT];

export const fitScale = (containerWidth, viewport) => {
  if (!containerWidth) return 1;
  return Math.min(1, containerWidth / designWidth(viewport));
};

export const formatEventDate = (iso) => {
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

export const diffParts = (iso) => {
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