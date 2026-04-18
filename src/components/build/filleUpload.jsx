"use client";

import { useEffect } from "react";
import {
  FileUpload,
  Flex,
  Float,
  useFileUploadContext,
} from "@chakra-ui/react";
import { remove } from "../../assets/svgs";

export const FileUploadList = ({ onFileSelect }) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;

  useEffect(() => {
    if (files.length > 0) {
      const readers = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((base64Files) => {
        onFileSelect(base64Files);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  if (files.length === 0) return null;

  return (
    <FileUpload.ItemGroup
      w="fit-content"
      as={Flex}
      flexDirection="row"
      gap="16px"
      flexWrap="wrap"
    >
      {files.map((file) => (
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
          {/* <Float placement="top-end"> */}
          <FileUpload.ItemDeleteTrigger
            w="36px"
            h="36px"
            // display="flex"
            // alignItems="center"
            // justifyContent="center"
            layerStyle="fill.solid"
            bg={"none"}
            position="absolute"
            top="5px"
            right="5px"
            background="#E8E8E8"
            borderRadius="50%"
            onClick={() => onFileSelect([])}
          >
            {remove.icon}
          </FileUpload.ItemDeleteTrigger>
          {/* </Float> */}
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};
