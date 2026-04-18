import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { GuestsClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("invitations") + " | " + t("guests");
  const description = t("");

  return meta({ title, description, locale });
}

export default async function Guests() {
  return <GuestsClient />;
}
