"use client";

import React from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import Classic from "@/app/[locale]/invitation/[slug]/classic";
import Modern from "@/app/[locale]/invitation/[slug]/modern";
import Vintage from "@/app/[locale]/invitation/[slug]/vintage";

export const Renderer = ({ viewport, palette }) => {
  const [{ template, id }] = useQueryStates({
    template: parseAsString,
    id: parseAsString,
  });
  // console.log(id);
  
  const { data} = useGetAuthTanstack(`invitations/${id}`, !!id);

  if (template === "template.classic.elegance") {
    return (
      <Classic viewport={viewport} palette={palette} data={data} />
    );
  }

  if (template === "template.modern.romance") {
    return <Modern viewport={viewport} palette={palette} data={data} />;
  }

  return <Vintage viewport={viewport} palette={palette} data={data} />;
};
