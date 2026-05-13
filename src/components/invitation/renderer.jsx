"use client";

import React from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import Classic from "@/app/[locale]/invitation/[slug]/classic";
import Modern from "@/app/[locale]/invitation/[slug]/modern";
import Rustic from "@/app/[locale]/invitation/[slug]/rustic";

export const Renderer = ({ viewport, palette }) => {
  const [{ template, id }] = useQueryStates({
    template: parseAsString,
    id: parseAsString,
  });
  
  const { data } = useGetAuthTanstack(`invitations/${id}`, !!id);

  if (template === "template.classic.elegance") {
    return <Classic viewport={viewport} palette={palette} data={data} />;
  }

  if (template === "template.modern.romance") {
    return <Modern viewport={viewport} palette={palette} data={data} />;
  }

  return <Rustic viewport={viewport} palette={palette} data={data} />;
};
