"use client";

import React from "react";
import Classic from "@/app/[locale]/view/classic";
import Modern from "@/app/[locale]/view/modern";
import Vintage from "@/app/[locale]/view/vintage";

export const Renderer = ({ id, viewport, palette, data, template }) => {
  if (id === "template.classic.elegance") {
    return (
      <Classic
        viewport={viewport}
        palette={palette}
        data={data}
        template={template}
      />
    );
  }

  if (id === "template.modern.romance") {
    return (
      <Modern
        viewport={viewport}
        palette={palette}
        data={data}
        template={template}
      />
    );
  }

  return (
    <Vintage
      viewport={viewport}
      palette={palette}
      data={data}
      template={template}
    />
  );
};
