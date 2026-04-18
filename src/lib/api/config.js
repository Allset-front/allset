"use strict";

const MODE = process.env.NODE_ENV

const BASE_API = MODE === "development" ? process.env.NEXT_PUBLIC_API_DEV : process.env.NEXT_PUBLIC_API_RELEASE;
const BASE_URL = MODE === "development" ? process.env.NEXT_PUBLIC_URL_DEV : process.env.NEXT_PUBLIC_URL_RELEASE;

export { MODE, BASE_API, BASE_URL }
