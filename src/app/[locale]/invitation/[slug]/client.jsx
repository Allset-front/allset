"use client";

import { useGetTanstack } from "@/hooks/useTanstack";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const Modern = dynamic(() => import("./modern"));
const Rustic = dynamic(() => import("./rustic"));
const Classic = dynamic(() => import("./classic"));

export const ViewClient = () => {
  const { slug } = useParams();
  const { isLoading, data } = useGetTanstack(`invitations/url/${slug}`, !!slug);

  const template = data?.templateId;

  if (template === "template.classic.elegance") {
    return <Classic data={data} isLoading={isLoading} />;
  }

  if (template === "template.modern.romance") {
    return <Modern data={data} isLoading={isLoading} />;
  }

  return <Rustic data={data} isLoading={isLoading} />;
};
