"use strict";

const MODE = process.env.NODE_ENV

const BASE_API = MODE === "development" ? process.env.NEXT_PUBLIC_API_DEV : process.env.NEXT_PUBLIC_API_RELEASE; // api url
const BASE_URL = MODE === "development" ? process.env.NEXT_PUBLIC_URL_DEV : process.env.NEXT_PUBLIC_URL_RELEASE; // web url


export { MODE, BASE_API, BASE_URL }
// export const getAxiosConfig = () => {
//   const token = storage.get("access_token");

//   if (!token) return undefined;

//   return {
//     headers: { Authorization: "Bearer " + token },
//   };
// };
