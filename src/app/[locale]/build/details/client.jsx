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
import { TitleDemo } from "@/components/build/titleDemo";
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
import { InvitationStorageService } from "@/services/aws/index";
import { isEmptyArray, isFile } from "@/utils/checkers";

export const DetailsClient = () => {
  const router = useRouter();
  const search = useSearch();
  const hiddenFieldsRef = useRef({});
  const lastSavedFormRef = useRef(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const showOverlay = () => {
    if (!containerRef.current) return;

    containerRef.current.style.filter = "blur(3px)";
    containerRef.current.style.pointerEvents = "none";
  };

  const hideOverlay = () => {
    if (!containerRef.current) return;

    containerRef.current.style.filter = "";
    containerRef.current.style.pointerEvents = "";
  };

  const { isAuthenticated, isLoading } = useAuth0();
  const [{ template, palette, id }, setQuery] = useQueryStates({
    template: parseAsString,
    palette: parseAsString,
    id: parseAsString,
  });


  // const { data } = useGetTanstack(`templates/${template}`, !id);
  const { data } = useGetTanstack(`templates/${template}`, template);
  const { data: invitationData } = useGetAuthTanstack(
    `invitations/${id}`,
    !!id,
    0, // for a staled data
  );
  const status = invitationData?.status?.toLowerCase() || "draft";
  const endpoint = status === "draft" ? "invitations/draft" : "invitations";

  const { mutate } = useMutateAuthTanstack(endpoint, "post", {
    onSuccess: (res) => {
      const draftId = res?.id;
      const urlExtension = res?.urlExtension;

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

        if (!search?.includes(draftId)) {
          setQuery({ id: draftId });
        }
      }
      queryClient.invalidateQueries({ queryKey: [`invitations/${status}`] });

      if (res.status === "ACTIVE") {
        queryClient.invalidateQueries({
          queryKey: [`invitations/url/${res.urlExtension}`],
        });
      }
    },
    onError: (err) => console.log(err?.response?.data?.error || "Draft error!"),
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

    // Merge venues already saved in the timeline (incl. custom-added ones) so
    // they render as rows when returning to an existing draft.
    const savedVenues = Object.fromEntries(
      (invitationData?.timeline ?? [])
        .filter((it) => it?.venueKey)
        .map((it) => [it.venueKey, it.venueName]),
    );

    if (titles || Object.keys(savedVenues).length) {
      setAgenda({ ...(titles || {}), ...savedVenues });
    }
  }, [data, invitationData]);

  useEffect(() => {
    if (!invitationData) return;

    const picked = pickInvitationFields(invitationData);
    setForm(picked);

    if (invitationData?.urlExtension) {
      setUrlExtension(invitationData.urlExtension);
    }

    const sanitized = {
      ...picked,
      timeline: picked.timeline?.map((item) => ({
        venueKey: item.venueKey,
        venueName: item.venueName,
        time: item.time,
        venueLocation: item.venueLocation,
      })),
    };
    lastSavedFormRef.current = JSON.stringify(sanitized);
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

  const getEmptyValue = (value) => {
    if (Array.isArray(value)) return [];
    if (typeof value === "boolean") return false;
    if (value && typeof value === "object") return null;
    return "";
  };

  // send null
  const handleHide = (key, hidden, defaultValue = null) => {
    setForm((prev) => {
      const updated = { ...prev };

      if (hidden) {
        hiddenFieldsRef.current[key] = prev[key];
        updated[key] = getEmptyValue(prev[key]);
      } else {
        updated[key] =
          hiddenFieldsRef.current[key] ?? defaultValue ?? detailsForm[key];

        delete hiddenFieldsRef.current[key];
      }

      return updated;
    });
  };
  // const handleHide = (key, hidden) => {
  //   setForm((prev) => {
  //     const updated = { ...prev };
  //     if (hidden) {
  //       hiddenFieldsRef.current[key] = prev[key];
  //       updated[key] = getEmptyValue(prev[key]);
  //     } else {
  //       updated[key] = hiddenFieldsRef.current[key] ?? "";
  //       delete hiddenFieldsRef.current[key];
  //     }
  //     return updated;
  //   });
  // };

  // send default state with empty values
  // const handleHide = (key, hidden) => {
  //   setForm((prev) => {
  //     const updated = { ...prev };
  //     if (hidden) {
  //       hiddenFieldsRef.current[key] = prev[key];
  //       updated[key] = detailsForm[key];
  //     } else {
  //       updated[key] = hiddenFieldsRef.current[key] ?? detailsForm[key];
  //       delete hiddenFieldsRef.current[key];
  //     }
  //     return updated;
  //   });
  // };

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

  // groomName/brideName are the source of truth; title is kept in sync as
  // "groom, bride" per language.
  const handleNameChange = (lng, which, value) => {
    setForm((prev) => {
      const groomName = { ...(prev.groomName || { hy: "", en: "", ru: "" }) };
      const brideName = { ...(prev.brideName || { hy: "", en: "", ru: "" }) };

      if (which === "groom") groomName[lng] = value;
      else brideName[lng] = value;

      const title = { ...(prev.title || { hy: "", en: "", ru: "" }) };
      title[lng] = [groomName[lng]?.trim(), brideName[lng]?.trim()]
        .filter(Boolean)
        .join(", ");

      return { ...prev, groomName, brideName, title };
    });
  };

  const handleTimelineChange = (newTimeline) => {
    setForm((prev) => ({
      ...prev,
      timeline: newTimeline,
    }));
  };

  // V2 - without imgs logic inside & allowed do call without title
  const handleSmartBlur = async () => {
    const current = formRef.current;

    const sanitized = {
      ...current,
      timeline: (current.timeline ?? []).map((item) => ({
        venueKey: item.venueKey,
        venueName: item.venueName,
        time: item.time,
        venueLocation: item.venueLocation,
      })),
    };

    const clean = JSON.parse(JSON.stringify(sanitized));

    const currentDataString = JSON.stringify(clean);

    if (lastSavedFormRef.current !== currentDataString) {
      mutate(buildPayload(clean));
      lastSavedFormRef.current = currentDataString;
    }
  };

  // Photos imgs upload and delete logic
  const uploadMainImages = async (current) => {
    const imgUrls = current.mainImages;

    if (!Array.isArray(imgUrls) || !current.id) return current;

    const existing = imgUrls.filter((i) => typeof i === "string");
    const files = imgUrls.filter(isFile);

    if (!files.length) return current;

    const uploaded = await InvitationStorageService.uploadMany(
      files,
      current.id,
    );

    return {
      ...current,
      mainImages: [...existing, ...uploaded],
    };
  };

  const handlePhotoFiles = async (files) => {
    if (!files?.length) return;

    const current = formRef.current;
    const normalized = Array.from(files).filter(isFile);
    const updated = {
      ...current,
      mainImages: [
        ...(current.mainImages ?? []).filter((i) => typeof i === "string"),
        ...normalized,
      ],
    };

    setForm(updated);
    formRef.current = updated;

    showOverlay();

    try {
      const uploaded = await uploadMainImages(updated);

      formRef.current = uploaded;
      setForm(uploaded);
    } finally {
      hideOverlay();
    }
  };

  const handleDeletePhoto = (url) => {
    const current = formRef.current;

    const updated = {
      ...current,
      mainImages: (current.mainImages ?? []).filter((img) =>
        typeof img === "string" ? img !== url : img.url !== url,
      ),
    };

    formRef.current = updated;
    setForm(updated);
  };
  //

  // Story imgs upload and delete logic
  const uploadStoryImages = async (current) => {
    const photoUrls = current.ourStory?.photoUrls;

    if (!Array.isArray(photoUrls) || !current.id) return current;

    const existing = photoUrls.filter((i) => typeof i === "string");
    const files = photoUrls.filter(isFile);

    if (!files.length) return current;

    const uploaded = await InvitationStorageService.uploadMany(
      files,
      current.id,
    );

    const updated = {
      ...current,
      ourStory: {
        ...current.ourStory,
        photoUrls: [...existing, ...uploaded],
      },
    };

    setForm(updated);
    return updated;
  };

  const handleStoryFiles = async (files) => {
    if (!files?.length) return;

    const current = formRef.current;
    const normalized = Array.from(files).filter(isFile);
    const updated = {
      ...current,
      ourStory: {
        ...current.ourStory,
        photoUrls: [
          ...(current.ourStory?.photoUrls ?? []).filter(
            (i) => typeof i === "string",
          ),
          ...normalized,
        ],
      },
    };

    setForm(updated);
    formRef.current = updated;

    showOverlay();

    try {
      const uploaded = await uploadStoryImages(updated);

      formRef.current = uploaded;
      setForm(uploaded);
    } finally {
      hideOverlay();
    }
  };

  const handleDeleteStory = (url) => {
    const current = formRef.current;

    const updated = {
      ...current,
      ourStory: {
        ...current.ourStory,
        photoUrls: (current.ourStory?.photoUrls ?? []).filter((img) =>
          typeof img === "string" ? img !== url : img.url !== url,
        ),
      },
    };

    setForm(updated);
    formRef.current = updated;
  };
  //

  const submit = async (e) => {
    e.preventDefault();
    await Promise.all([
      queryClient.refetchQueries({
        queryKey: [`invitations/${id}`],
      }),
      queryClient.refetchQueries({
        queryKey: ["invitations/active"],
      }),
    ]);

    if (status === "active") {
      router.push(`/auth/invitations`);
    } else {
      router.push(`preview${search}`);
    }
  };

  return (
    <Box
      ref={containerRef}
      position="relative"
      pt={{ base: "32px", md: "48px" }}
      pb="22px"
      transition="filter .2s"
    >
       {/* VStack */}
      <Stack
        gap={{ base: "16px", md: "24px" }}
        w={{ base: "100%", lg: "748px" }}
        mx="auto"
        transition="filter .2s"
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
              groomName={form.groomName}
              brideName={form.brideName}
              urlExtension={urlExtension}
              onNameChange={handleNameChange}
              required={true}
              languages={form.languages}
              status={status}
            />
          </Animate>

          {status !== "active" && urlExtension && (
            <Animate>
              <TitleDemo urlExtension={urlExtension} />
            </Animate>
          )}

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
              value={form.mainImages}
              onFileSelect={handlePhotoFiles}
              onDelete={handleDeletePhoto}
              onLoadingStart={showOverlay}
              onLoadingEnd={hideOverlay}
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
              enabled={isEmptyArray(form.timeline) ? false : true}
              onChange={handleTimelineChange}
              required={false}
            />
          </Animate>

          <Animate>
            <Dresscode
              name="dressCode"
              value={form.dressCode}
              onChange={handleLngChange}
              setForm={setForm}
              hide={(key, hidden) =>
                handleHide(
                  key,
                  hidden,
                  data?.defaults?.dressCodeDescription
                    ? {
                        description: data.defaults.dressCodeDescription,
                      }
                    : detailsForm.dressCode,
                )
              }
              enabled={form.dressCode ? true : false}
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
              enabled={!!form.albumLink}
              required={false}
            />
          </Animate>

          <Animate>
            <Story
              name="ourStory"
              value={form.ourStory}
              onChange={handleLngChange}
              onFileSelect={handleStoryFiles}
              onDelete={handleDeleteStory}
              onLoadingStart={showOverlay}
              onLoadingEnd={hideOverlay}
              hide={(key, hidden) =>
                handleHide(
                  key,
                  hidden,
                  data?.defaults?.ourStoryText
                    ? {
                        text: data.defaults.ourStoryText,
                        photoUrls: [],
                      }
                    : detailsForm.ourStory,
                )
              }
              required={false}
              languages={form.languages}
              count={
                data?.albumImageMaxCount ??
                invitationData?.template?.albumImageMaxCount
              }
              enabled={form.ourStory ? true : false}
            />
          </Animate>

          <Animate>
            <Contact
              name="connectWithUs"
              value={form.connectWithUs}
              onChange={handleChange}
              hide={handleHide}
              enabled={form.connectWithUs ? true : false}
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