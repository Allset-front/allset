"use client";

import dynamic from "next/dynamic";

const Modern = dynamic(() => import("./modern"));
const Rustic = dynamic(() => import("./rustic"));
const Classic = dynamic(() => import("./classic"));

export const InvitationClient = ({ data }) => {
  if (!data) return <div>Invitation not found</div>;
  
  const template = data?.templateId;

  if (template === "template.classic.elegance") {
    return <Classic data={data} />;
  }

  if (template === "template.modern.romance") {
    return <Modern data={data} />;
  }

  return <Rustic data={data} />;
};
