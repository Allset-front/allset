import { getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { PolicyClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const title = t("");
  const description = t("");

  return meta({ title, description, locale });
}

export default async function Policy() {
  return <PolicyClient />;
}
