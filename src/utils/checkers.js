// export const getStorageCheck = () =>
//     !sessionStorage.getItem("") &&
//     localStorage.getItem("");

// export const getAuthCheck = ({ isLoggedIn, token }) =>
//     isLoggedIn && token && !getStorageCheck();

// export const getViewCheck = ({ sidebar, userData }) =>
//     isEmptyArray(sidebar) && isEmptyObject(userData);

export function overflowCheck(props) {
    props ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
}

import { htmlRegex } from "./regex";

export function isHTML(str) {
    return htmlRegex?.test(str)
}

import { urlRegex } from "./regex";

export function isURL(str) {
    return urlRegex?.test(str)
}

import { emailRegex } from "./regex";

export function isValidEmail(mail) {
    return emailRegex.test(mail);
}

export function isEmptyArray(arr) {
    return Array?.isArray(arr) && arr?.length === 0;
}

export function isNotEmptyArray(arr) {
    return Array?.isArray(arr) && arr?.length > 0;
}

export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

export function isNotEmptyObject(obj) {
    return obj && obj.constructor === Object && Object.keys(obj).length > 0;
}

export const isEmptyState = (obj) =>
    Object.values(obj).every((value) => value === "" || value === null);

export const isNotEmptyState = (obj) =>
  Object.values(obj).some((value) => value !== "" && value !== null);

// export function isNotEmptyObject(obj) {
//     return Object?.keys(obj)?.length > 0 || obj?.constructor !== Object;
// }

export const isFileSizeValid = (file, maxFileSizeMB) => {
    const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
    return file?.size <= maxFileSizeBytes;
};

export const isMenuOpen = (path, pathname, state, child) => {
    if (Object.prototype.hasOwnProperty.call(state, path)) {
        return state[path];
    }
    if (isNotEmptyArray(child)) {

        return child.some(({ segment }) =>
            pathname.includes(`${path}/${segment}`)
        );
    }
    return false;
};

export const isContinueDisabled = (pathname, values) => {
    const rules = [
        {
            path: `/build/templates`,
            required: ["template"]
        },
        {
            path: `/build/customisations`,
            required: ["template", "palette"]
        },
        {
            path: `/build/details`,
            required: ["template", "palette"]
        },
        {
            path: `/build/confirm`,
            required: ["template", "palette", "accept"]
        },
    ];

    const matchedRule = rules.find(rule => rule.path === pathname);

    if (!matchedRule) return false;

    return matchedRule.required.some(key => !values[key]);
};