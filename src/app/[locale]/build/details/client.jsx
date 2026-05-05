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
import { useSearch } from "@/hooks/useSearch";
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

export const DetailsClient = () => {
  const router = useRouter();
  const search = useSearch();
  const hiddenFieldsRef = useRef({});
  const lastSavedFormRef = useRef(null);
  const formRef = useRef(null);

  // TODO: set id to params after draft creation
  const { isAuthenticated, isLoading } = useAuth0();
  const [{ template, palette, id }] = useQueryStates({
    template: parseAsString,
    palette: parseAsString,
    id: parseAsString,
  });

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

  const { data } = useGetTanstack(`templates/${template}`, !id);
  const { data: invitationData } = useGetAuthTanstack(
    `invitations/${id}`,
    !!id,
  );

  const { mutate } = useMutateAuthTanstack("invitations/draft", "post", {
    onSuccess: (res) => {
      const draftId = res?.id;
      const urlExtension = res?.urlExtension;

      // setForm((prev) => {
      //   const updated = {
      //     ...prev,
      //     ...(draftId && { id: draftId }),
      //     ...(urlExtension && { urlExtension }),
      //   };

      //   lastSavedFormRef.current = JSON.stringify(updated);

      //   return updated;
      // });

      if (urlExtension) {
        setUrlExtension(urlExtension);
      }

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

  formRef.current = form;

  const [agenda, setAgenda] = useState([]);
  const [urlExtension, setUrlExtension] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(
        `/build/customisations?template=${template}${palette ? `&palette=${palette}` : ""}`,
      );
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    const titles =
      data?.defaults?.agendaTitles ??
      invitationData?.template?.defaults?.agendaTitles;
    if (titles) setAgenda(titles);
  }, [data, invitationData]);

  useEffect(() => {
    if (!invitationData) return;
    setForm(pickInvitationFields(invitationData));

    if (invitationData?.urlExtension) {
      setUrlExtension(invitationData.urlExtension);
    }
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

  useEffect(() => {
    if (!form.eventDate) return;
    handleSmartBlur();
  }, [form.eventDate]);

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

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    if (invitationData?.status === "ACTIVE") return;

    const current = formRef.current;

    const isTitleFilled = current.languages?.some((lang) =>
      current.title?.[lang]?.trim(),
    );

    if (!isTitleFilled) return;

    const currentDataString = JSON.stringify(current);

    if (lastSavedFormRef.current !== currentDataString) {
      mutate(buildPayload(current));
      lastSavedFormRef.current = currentDataString;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    router.push(`preview${search}`);
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
              urlExtension={urlExtension}
              onChange={handleLngChange}
              required={true}
              languages={form.languages}
            />
          </Animate>

          <Animate>
            <EventDate
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              disabled={form.status === "ACTIVE" ? true : false}
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
              name="eventVenue"
              value={form.eventVenue}
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
              setForm={setForm} //
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

        <Animate>
          <Expire />
        </Animate>
      </Stack>
    </Box>
  );
};

// initial={{ opacity: 0, y: 40 }}
// whileInView={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.5 }}
// viewport={{ once: true, margin: "0px 0px -100px 0px" }}
