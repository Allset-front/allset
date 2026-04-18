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

export const cleanUrlExtension = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\\-]/g, "");
};

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
      <span key={i} style={{ background: "#81e6d9"}}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};