export const emailRegex = /\S+@\S+\.\S+/;

export const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)(\s+[^>]*)?(\/>|>.*?<\/\1\s*>|>)/;

export const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

// export const localesRegex = /^\/(hy|en|ru)/

export const localesRegex = /^\/(hy|en|ru)(\/|$)/;

export const escapeRegex = (str = "") =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");