"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { parseAsString, useQueryStates } from "nuqs";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import {
  useGetAuthTanstack,
  useGetTanstack,
  useMutateAuthTanstack,
} from "@/hooks/useTanstack";
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
import { error, success } from "@/components/ui/alerts";
import { Venue } from "@/components/build/venue";
import { Rsvp } from "@/components/build/rsvp";

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

  // const { data } = useGetTanstack(`templates/${template}`); // V2
  const { data } = useGetTanstack(`templates/${template}`, !id); // V3
  const { data: invitationData } = useGetAuthTanstack(
    `invitations/${id}`,
    !!id,
  );

  const { mutate, isPending } = useMutateAuthTanstack("invitations", "post", {
    onSuccess: () => {
      success("Basic Wedding Information Completed.");
      setForm(detailsForm);
      router.push(`preview`);
    },
    onError: (err) =>
      error(err?.response?.data?.error || "Personal info editing error!"),
  });
  const { mutate: mutateDraft } = useMutateAuthTanstack(
    "invitations/draft",
    "post",
    {
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
      },
      onError: (err) => error(err?.response?.data?.error || "Draft error!"),
    },
  );

  const [form, setForm] = useState({
    ...detailsForm,
    templateId: template,
    colorPaletteId: palette,
  });
  // console.log(data);
  // console.log(form);
  // console.log(invitationData);

  const [agenda, setAgenda] = useState(data?.agendaTitles);

  useEffect(() => {
    if (!invitationData) return;
    setForm(invitationData);
  }, [invitationData]);

  useEffect(() => {
    if (!data) return;

    setForm((prev) => {
      const updates = { ...prev };

      if (data?.ourStoryText) {
        updates.ourStory = { ...prev.ourStory, text: data.ourStoryText };
      }
      if (data?.description) {
        updates.description = data.description;
      }
      if (data?.dressCodeDescription) {
        updates.dressCode = {
          ...prev.dressCode,
          description: data.dressCodeDescription,
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
        updated[key] = hiddenFieldsRef.current[key] || "";
        delete hiddenFieldsRef.current[key];
      }
      return updated;
    });
  };

  // single language V2
  const handleChange = (e) => {
    const updated = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updated);
  };

  // mixed with handleChange V2
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

  // for timeline updates (array) V2
  const handleTimelineChange = (newTimeline) => {
    setForm((prev) => {
      const updated = {
        ...prev,
        timeline: newTimeline,
      };

      return updated;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    mutate(form);
  };

  const handleSmartBlur = () => {
    console.log(form.status);

    if (form.status === "ACTIVE") return;

    const currentDataString = JSON.stringify(form);

    if (lastSavedFormRef.current !== currentDataString) {
      mutateDraft(form);
      lastSavedFormRef.current = currentDataString;
    }
  };

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
              count={data?.mainImageMaxCount}
              required={true}
            />
          </Animate>

          <Animate>
            <Rsvp name="rsvp" hide={handleHide} text="rsvp" />
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
              count={data?.albumImageMaxCount}
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
