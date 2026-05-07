"use client";

import { useEffect } from "react";
import {
  FileUpload,
  Flex,
  useFileUploadContext,
  Image,
  Box,
} from "@chakra-ui/react";
import { remove } from "../../assets/svgs";

export const FileUploadList = ({ value = [], onFileSelect, onDeleteUrl }) => {
  const fileUpload = useFileUploadContext();
  const newFiles = fileUpload.acceptedFiles; 

  const urlImages = value.filter((img) => typeof img === "string");

  useEffect(() => {
    const hasUnuploadedFiles = value.some((img) => img instanceof File);
    if (!hasUnuploadedFiles && newFiles.length > 0) {
      fileUpload.clearFiles();
    }
  }, [value]);

  useEffect(() => {
    if (newFiles.length === 0) return;
    onFileSelect([...urlImages, ...newFiles]);
  }, [newFiles]);

  const hasContent = urlImages.length > 0 || newFiles.length > 0;
  
  if (!hasContent) return null;

  return (
    <Flex flexDirection="row" gap="16px" flexWrap="wrap">
      {urlImages.map((url) => (
        <Box
          key={url}
          position="relative"
          w="163px"
          h="178px"
          borderRadius="8px"
          overflow="hidden"
        >
          <Image src={url} alt="uploaded" w="100%" h="100%" objectFit="cover" />
          <Box
            as="button"
            type="button" 
            position="absolute"
            top="5px"
            right="5px"
            w="36px"
            h="36px"
            background="#E8E8E8"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => onDeleteUrl(url)}
          >
            {remove.icon}
          </Box>
        </Box>
      ))}

      <FileUpload.ItemGroup
        w="fit-content"
        as={Flex}
        flexDirection="row"
        gap="16px"
        flexWrap="wrap"
      >
        {newFiles.map((file) => (
          <FileUpload.Item
            w="163px"
            h="178px"
            file={file}
            key={file.name}
            border="none"
            p="0"
          >
            <FileUpload.ItemPreviewImage
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="8px"
            />
            <FileUpload.ItemDeleteTrigger
              w="36px"
              h="36px"
              layerStyle="fill.solid"
              bg={"none"}
              position="absolute"
              top="5px"
              right="5px"
              background="#E8E8E8"
              borderRadius="50%"
            >
              {remove.icon}
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    </Flex>
  );
};

// base 64
// useEffect(() => {
//   if (files.length > 0) {
//     const readers = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(readers).then((base64Files) => {
//       onFileSelect(base64Files);
//     });
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [files]);
