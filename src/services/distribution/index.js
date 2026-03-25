"use client";

import { isMobile } from "react-device-detect";
import { error, success } from "@/components/ui/alerts";
import { BASE_URL } from "@/lib/api/config";

export const distribute = async ({ language, code }) => {
    const title = "Share Allset Referral url."
    const url = BASE_URL + `${language}/connection?referral=${code}`

    // native
    if (isMobile && typeof navigator !== "undefined" && navigator.share) {
        try {
            await navigator.share({ title, url });
            return;
        } catch (err) {
            // IOS
            if (err?.name === "AbortError") {
                return;
            }
            // Other Devices
            error("Native share failed: ", err);
        }
    }

    // clipboard
    try {
        await navigator.clipboard.writeText(url);
        success("Copied to clipboard.");
    } catch (err) {
        error("Failed to copy.", err);
    }
};