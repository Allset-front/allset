"use client";

export const storage = {
    // setItem(key, data) {
    //     window.localStorage.setItem(key, JSON.stringify(data));
    // },

    // getItem(key) {
    //     const value = window.localStorage.getItem(key);
    //     return value ? JSON.parse(value) : null;
    // },

    set(key, data) {
        window.localStorage.setItem(key, data);
    },

    get(key) {
        const value = window.localStorage.getItem(key);
        return value ?? null;
    },

    remove(key) {
        window.localStorage.removeItem(key);
    },

    clear() {
        window.localStorage.clear();
    },
};