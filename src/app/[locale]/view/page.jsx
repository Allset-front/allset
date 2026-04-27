import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { ViewClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("");
  const description = t("");

  return meta({ title, description, locale });
}

export default async function View() {
  return <ViewClient />;
}
