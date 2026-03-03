"use client";

import { useRef, useState, useEffect } from "react";
import { detailsForm } from "@/utils/constants";
import { useRouter } from "@/i18n/routing";
import { useNuqs } from "@/hooks/useNuqs";
import { useGetTanstack } from "@/hooks/useTanstack";
import apiClient from "@/lib/api";
import { Box, Container, Stack } from "@chakra-ui/react";
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
import { error } from "@/components/ui/alerts";
import { Venue } from "@/components/build/venue";
import { Rsvp } from "@/components/build/rsvp";

export const DetailsClient = () => {
  const router = useRouter();

  const hiddenFieldsRef = useRef({});

  const [template] = useNuqs("template");
  const [palette] = useNuqs("palette");

  const { data } = useGetTanstack("templates");

  const defaults = data?.find((item) => item.id === template)?.defaults || {};

  const [form, setForm] = useState({
    ...detailsForm,
    templateId: template,
    colorPaletteId: palette,
  });
  console.log(form); //

  const [agenda, setAgenda] = useState(defaults?.agendaTitles);
  // console.log(agenda); //

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

  useEffect(() => {
    setForm((prev) => {
      const updates = { ...prev };

      if (defaults?.ourStoryText) {
        updates.ourStory = { ...prev.ourStory, text: defaults.ourStoryText };
      }
      if (defaults?.description) {
        updates.description = defaults.description;
      }
      if (defaults?.dressCodeDescription) {
        updates.dressCode = {
          ...prev.dressCode,
          description: defaults.dressCodeDescription,
        };
      }

      return updates;
    });
  }, [defaults]);

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

  // single language
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
  // mixed with handleChange
  const handleLngChange = (field, lang, value, nestedKey) => {
    setForm((prev) => {
      if (!nestedKey) {
        return {
          ...prev,
          [field]: {
            ...(prev[field] || { hy: "", ru: "", en: "" }),
            [lang]: value,
          },
        };
      }

      return {
        ...prev,
        [field]: {
          ...(prev[field] || {}),
          [nestedKey]: {
            ...(prev[field]?.[nestedKey] || { hy: "", ru: "", en: "" }),
            [lang]: value,
          },
        },
      };
    });
  };

  // for timeline updates (array)
  const handleTimelineChange = (newTimeline) => {
    setForm((prev) => ({
      ...prev,
      timeline: newTimeline,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post(`/invitations`, form);

      if (data.status === "ok") {
        success("Basic Wedding Information Completed.");
        setForm(detailsForm);
        router.push(`/preview`);
      }
    } catch (err) {
      error(`Error - ${err}`);
    }
  };

  return (
    <Box pt="32px" pb="65px">
      <Container maxW="1360px" px={0}>
        {/* VStack */}
        <Stack gap="24px" w="748px" mx="auto">
          <Stack
            id="details"
            as="form"
            gap="24px"
            autoComplete="on"
            onSubmit={submit}
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
      </Container>
    </Box>
  );
};
