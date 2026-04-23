"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "@/i18n/routing";
import { parseAsString, useQueryStates } from "nuqs";
import {
  useGetAuthTanstack,
  useGetTanstack,
  useMutateAuthTanstack,
} from "@/hooks/useTanstack";
import { queryClient } from "@/providers/queryProvider";
import { buildPayload, pickInvitationFields } from "@/utils/formatters";
import { detailsForm } from "@/utils/constants";
import { Box, Stack } from "@chakra-ui/react";
import { Animate } from "@/components/ui/animate";
import { LngSelector } from "@/components/build/lngSelector";
import { TitleCreator } from "@/components/build/titleCreator";
import { EventDate } from "@/components/build/eventDate";
import { Timeline } from "@/components/build/timeline";
import { Contact } from "@/components/build/contact";
import { Dresscode } from "@/components/build/dresscode";
import { AlbumLink } from "@/components/build/albumLink";
import { Story } from "@/components/build/story";
import { TextAreaField } from "@/components/build/textareaField";
import { Photos } from "@/components/build/photos";
import { Expire } from "@/components/build/expire";
import { Venue } from "@/components/build/venue";
import { Rsvp } from "@/components/build/rsvp";
import { error } from "@/components/ui/alerts";

// export const DetailsClient = () => {
//   const router = useRouter();
//   const hiddenFieldsRef = useRef({});
//   const lastSavedFormRef = useRef(null);

//   const { isAuthenticated, isLoading } = useAuth0();
//   const [{ template, palette, id }] = useQueryStates({
//     template: parseAsString,
//     palette: parseAsString,
//     id: parseAsString,
//   });

//   if (!isLoading && !isAuthenticated) {
//     return router.push(
//       `/build/customisations?template=${template}${palette ? `&palette=${palette}` : ""}`,
//     );
//   }

//   // const { data } = useGetTanstack(`templates/${template}`); // V2
//   const { data } = useGetTanstack(`templates/${template}`, !id); // V3
//   const { data: invitationData } = useGetAuthTanstack(
//     `invitations/${id}`,
//     !!id,
//   );

//   const { mutate } = useMutateAuthTanstack("invitations/draft", "post", {
//     onSuccess: (res) => {
//       const draftId = res?.id;
//       if (draftId) {
//         setForm((prev) => {
//           if (prev.id === draftId) return prev;
//           const updated = { ...prev, id: draftId };
//           lastSavedFormRef.current = JSON.stringify(updated);
//           return updated;
//         });
//       }
//       queryClient.invalidateQueries({ queryKey: [`invitations/drafts`] });
//     },
//     onError: (err) => error(err?.response?.data?.error || "Draft error!"),
//   });

//   const [form, setForm] = useState({
//     ...detailsForm,
//     templateId: template,
//     colorPaletteId: palette,
//   });

//   const [agenda, setAgenda] = useState(
//     data?.defaults?.agendaTitles ??
//       invitationData?.template?.defaults?.agendaTitles,
//   );

//   useEffect(() => {
//     if (!invitationData) return;
//     setForm(invitationData);
//   }, [invitationData]);

//   useEffect(() => {
//     if (!data) return;

//     setForm((prev) => {
//       const updates = { ...prev };

//       if (data?.defaults?.ourStoryText) {
//         updates.ourStory = { ...prev.ourStory, text: data.ourStoryText };
//       }
//       if (data?.defaults?.description) {
//         updates.description = data.description;
//       }
//       if (data?.defaults?.dressCodeDescription) {
//         updates.dressCode = {
//           ...prev.dressCode,
//           description: data.dressCodeDescription,
//         };
//       }
//       return updates;
//     });
//   }, [data]);

//   const handleHide = (key, hidden) => {
//     setForm((prev) => {
//       const updated = { ...prev };
//       if (hidden) {
//         hiddenFieldsRef.current[key] = updated[key];
//         delete updated[key];
//       } else {
//         updated[key] = hiddenFieldsRef.current[key] || "";
//         delete hiddenFieldsRef.current[key];
//       }
//       return updated;
//     });
//   };

//   // single language V2
//   const handleChange = (e) => {
//     const updated = {
//       ...form,
//       [e.target.name]: e.target.value,
//     };

//     setForm(updated);
//   };

//   // mixed with handleChange V2
//   const handleLngChange = (field, lang, value, nestedKey) => {
//     setForm((prev) => {
//       let updated;

//       if (!nestedKey) {
//         updated = {
//           ...prev,
//           [field]: {
//             ...(prev[field] || { hy: "", ru: "", en: "" }),
//             [lang]: value,
//           },
//         };
//       } else {
//         updated = {
//           ...prev,
//           [field]: {
//             ...(prev[field] || {}),
//             [nestedKey]: {
//               ...(prev[field]?.[nestedKey] || { hy: "", ru: "", en: "" }),
//               [lang]: value,
//             },
//           },
//         };
//       }

//       return updated;
//     });
//   };

//   // for timeline updates (array) V2
//   const handleTimelineChange = (newTimeline) => {
//     setForm((prev) => {
//       const updated = {
//         ...prev,
//         timeline: newTimeline,
//       };

//       return updated;
//     });
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     // mutate(form);
//     router.push(`preview`);
//   };

//   const handleSmartBlur = () => {
//     if (form.status === "ACTIVE") return;

//     const currentDataString = JSON.stringify(form);

//     if (lastSavedFormRef.current !== currentDataString) {
//       mutate(form);
//       lastSavedFormRef.current = currentDataString;
//     }
//   };

export const DetailsClient = () => {
  const router = useRouter();
  const hiddenFieldsRef = useRef({});
  const lastSavedFormRef = useRef(null);

  const { isAuthenticated, isLoading } = useAuth0();
  const [{ template, palette, id }] = useQueryStates({
    template: parseAsString,
    palette: parseAsString,
    id: parseAsString,
  });

  if (!isLoading && !isAuthenticated) {
    return router.push(
      `/build/customisations?template=${template}${palette ? `&palette=${palette}` : ""}`,
    );
  }

  const { data } = useGetTanstack(`templates/${template}`, !id);
  const { data: invitationData } = useGetAuthTanstack(
    `invitations/${id}`,
    !!id,
  );

  const { mutate } = useMutateAuthTanstack("invitations/draft", "post", {
    onSuccess: (res) => {
      const draftId = res?.id;
      if (draftId) {
        setForm((prev) => {
          if (prev.id === draftId) return prev;
          const updated = { ...prev, id: draftId };
          lastSavedFormRef.current = JSON.stringify(updated);
          return updated;
        });
      }
      queryClient.invalidateQueries({ queryKey: [`invitations/drafts`] });
    },
    onError: (err) => error(err?.response?.data?.error || "Draft error!"),
  });

  const [form, setForm] = useState({
    ...detailsForm,
    templateId: template,
    colorPaletteId: palette,
  });

  // const [agenda, setAgenda] = useState(
  //   data?.defaults?.agendaTitles ??
  //     invitationData?.template?.defaults?.agendaTitles,
  // );

  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    const titles =
      data?.defaults?.agendaTitles ??
      invitationData?.template?.defaults?.agendaTitles;
    if (titles) setAgenda(titles);
  }, [data, invitationData]);

  useEffect(() => {
    if (!invitationData) return;
    setForm(pickInvitationFields(invitationData));
  }, [invitationData]);

  useEffect(() => {
    if (!data) return;

    setForm((prev) => {
      const updates = { ...prev };

      if (data?.defaults?.ourStoryText) {
        updates.ourStory = {
          ...prev.ourStory,
          text: data.defaults.ourStoryText,
        };
      }
      if (data?.defaults?.description) {
        updates.description = data.defaults.description;
      }
      if (data?.defaults?.dressCodeDescription) {
        updates.dressCode = {
          ...prev.dressCode,
          description: data.defaults.dressCodeDescription,
        };
      }
      return updates;
    });
  }, [data]);

  const handleHide = (key, hidden) => {
    setForm((prev) => {
      const updated = { ...prev };
      if (hidden) {
        hiddenFieldsRef.current[key] = updated[key];
        delete updated[key];
      } else {
        updated[key] = hiddenFieldsRef.current[key] || ""; // without rsvp
        // updated[key] =
        //   key in hiddenFieldsRef.current
        //     ? hiddenFieldsRef.current[key]
        //     : detailsForm[key]; // with rsvp
        delete hiddenFieldsRef.current[key];
      }
      return updated;
    });
  };

  const handleChange = (e) => {
    const updated = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(updated);
  };

  const handleLngChange = (field, lang, value, nestedKey) => {
    setForm((prev) => {
      let updated;

      if (!nestedKey) {
        updated = {
          ...prev,
          [field]: {
            ...(prev[field] || { hy: "", ru: "", en: "" }),
            [lang]: value,
          },
        };
      } else {
        updated = {
          ...prev,
          [field]: {
            ...(prev[field] || {}),
            [nestedKey]: {
              ...(prev[field]?.[nestedKey] || { hy: "", ru: "", en: "" }),
              [lang]: value,
            },
          },
        };
      }

      return updated;
    });
  };

  const handleTimelineChange = (newTimeline) => {
    setForm((prev) => ({
      ...prev,
      timeline: newTimeline,
    }));
  };

  const handleSmartBlur = () => {
    // TODO: add post for active invitation edit
    if (form.status === "ACTIVE") return;

    const isTitleFilled = form.languages?.some((lang) =>
      form.title?.[lang]?.trim(),
    );
    
    if (!isTitleFilled) return;

    const currentDataString = JSON.stringify(form);

    if (lastSavedFormRef.current !== currentDataString) {
      mutate(buildPayload(form));
      lastSavedFormRef.current = currentDataString;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    router.push(`preview`);
  };
  console.log(form);

  return (
    <Box pt={{ base: "32px", md: "48px" }} pb="22px">
      {/* VStack */}
      <Stack
        gap={{ base: "16px", md: "24px" }}
        w={{ base: "100%", lg: "748px" }}
        mx="auto"
      >
        <Stack
          id="details"
          as="form"
          gap={{ base: "16px", md: "24px" }}
          autoComplete="on"
          onSubmit={submit}
          onBlur={handleSmartBlur}
        >
          <Animate>
            <LngSelector
              name="languages"
              value={form.languages}
              onChange={handleChange}
              required={true}
            />
          </Animate>

          <Animate>
            <TitleCreator
              name="title"
              value={form.title}
              onChange={handleLngChange}
              setForm={setForm}
              required={true}
              languages={form.languages}
            />
          </Animate>

          <Animate>
            <EventDate
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              required={true}
            />
          </Animate>

          <Animate>
            <TextAreaField
              name="description"
              value={form.description}
              onChange={handleLngChange}
              required={true}
              text="description"
              placeholder="description_placeholder"
              languages={form.languages}
            />
          </Animate>

          <Animate>
            <Photos
              // onFileSelect={(file) =>
              //   setForm((prev) => ({ ...prev, mainImages: file }))
              // }
              name="mainImages"
              onChange={handleChange}
              count={
                data?.mainImageMaxCount ??
                invitationData?.template?.mainImageMaxCount
              }
              required={true}
            />
          </Animate>

          <Animate>
            <Rsvp
              name="confirmationEnabled"
              hide={handleHide}
              onChange={handleChange}
              text="rsvp"
              value={form.confirmationEnabled}
            />
          </Animate>

          <Animate>
            <Venue
              name="venue"
              value={form.venue}
              onChange={handleChange}
              required={true}
            />
          </Animate>

          <Animate>
            <Timeline
              data={agenda}
              setData={setAgenda}
              languages={form.languages}
              //
              name="timeline"
              value={form.timeline}
              hide={handleHide}
              onChange={handleTimelineChange}
              required={false}
            />
          </Animate>

          <Animate>
            <Dresscode
              name="dressCode"
              value={form.dressCode}
              onChange={handleLngChange}
              hide={handleHide}
              required={false}
              languages={form.languages}
            />
          </Animate>

          <Animate>
            <AlbumLink
              name="albumLink"
              value={form.albumLink}
              onChange={handleChange}
              hide={handleHide}
              required={false}
            />
          </Animate>

          <Animate>
            <Story
              name="ourStory"
              value={form.ourStory}
              onChange={handleLngChange}
              hide={handleHide}
              required={false}
              languages={form.languages}
              count={
                data?.albumImageMaxCount ??
                invitationData?.template?.albumImageMaxCount
              }
            />
          </Animate>

          <Animate>
            <Contact
              name="connectWithUs"
              value={form.connectWithUs}
              onChange={handleChange}
              hide={handleHide}
              required={false}
            />
          </Animate>
        </Stack>

        <Animate
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Expire />
        </Animate>
      </Stack>
    </Box>
  );
};

// const { mutate } = useMutateAuthTanstack("invitations", "post", {
//   onSuccess: () => {
//     const isDraft = invitationData?.status === "DRAFT";

//     if (id) {
//       queryClient.invalidateQueries({
//         queryKey: [`invitations/active`],
//         refetchType: "all",
//       });

//       if (isDraft) {
//         queryClient.invalidateQueries({
//           queryKey: [`invitations/drafts`],
//           refetchType: "all",
//         });
//       }
//     }

//     const message =
//       id && !isDraft
//         ? "Basic Wedding Information Edited Successfully."
//         : "Basic Wedding Information Completed.";

//     success(message);
//     router.push(id && !isDraft ? `/auth/invitations` : `preview`);
//   },
//   onError: (err) =>
//     error(err?.response?.data?.error || "Personal info editing error!"),
// });

// const status = invitationData?.status;

// if (id) {
//   if (status === "ACTIVE") {
//     queryClient.invalidateQueries({
//       queryKey: [`invitations/active`],
//       refetchType: "all",
//     });
//     success("Basic Wedding Information Edited Successfully.");
//     router.push(`/auth/invitations`);
//   } else {
//     alert("Draft case");
//     queryClient.invalidateQueries({
//       queryKey: [`invitations/active`],
//       refetchType: "all",
//     });
//     queryClient.invalidateQueries({
//       queryKey: [`invitations/drafts`],
//       refetchType: "all",
//     });
//     success("Basic Wedding Information Completed.");
//     // // setForm(detailsForm);
//     router.push(`preview`);
//   }
// } else {
//   success("Basic Wedding Information Completed.");
//   // // setForm(detailsForm);
//   router.push(`preview`);
// }

// const handleSmartBlur = () => {
//   if (!template || !palette) return;

//   // optional: wait until template data loaded
//   if (!data) return;

//   const currentDataString = JSON.stringify(form);

//   if (lastSavedFormRef.current !== currentDataString) {
//     console.log("SENDING DRAFT:", form);
//     mutateDraft(form);
//   }
// };

// clear drafts
// const { mutate: mutateDelete } = useMutateAuthTanstack(
//   "invitations/drafts",
//   "delete",
//   {
//     onSuccess: () => {
//       success("Drafts deleted.");
//     },
//   },
// );

// useEffect(() => {
//   mutateDelete();
// }, []);
//

// for timeline updates (array) V1
// const handleTimelineChange = (newTimeline) => {
//   setForm((prev) => ({
//     ...prev,
//     timeline: newTimeline,
//   }));
// };

// single language V1
// const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value,
//   });
// };

// mixed with handleChange V1
// const handleLngChange = (field, lang, value, nestedKey) => {
//   setForm((prev) => {
//     if (!nestedKey) {
//       return {
//         ...prev,
//         [field]: {
//           ...(prev[field] || { hy: "", ru: "", en: "" }),
//           [lang]: value,
//         },
//       };
//     }

//     return {
//       ...prev,
//       [field]: {
//         ...(prev[field] || {}),
//         [nestedKey]: {
//           ...(prev[field]?.[nestedKey] || { hy: "", ru: "", en: "" }),
//           [lang]: value,
//         },
//       },
//     };
//   });
// };

// multi language
// const handleLngChange = (name, lang, value) => {
//   setForm((prev) => ({
//     ...prev,
//     [name]: {
//       ...(prev[name] || { hy: "", ru: "", en: "" }),
//       [lang]: value,
//     },
//   }));
// };

// useEffect(() => {
//   if (defaults?.ourStoryText) {
//     setForm((prev) => ({
//       ...prev,
//       ourStory: {
//         ...prev.ourStory,
//         text: defaults?.ourStoryText,
//       },
//     }));
//   }
//   if (defaults?.description) {
//     setForm((prev) => ({
//       ...prev,
//       description: {
//         ...defaults?.description,
//       },
//     }));
//   }
//   if (defaults?.dressCodeDescription) {
//     setForm((prev) => ({
//       ...prev,
//       dressCode: {
//         ...prev.dressCode,
//         description: defaults?.dressCodeDescription,
//       },
//     }));
//   }
// }, [defaults]);
