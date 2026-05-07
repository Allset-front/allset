// "use client";

// import { useEffect } from "react";
// import {
//   FileUpload,
//   Flex,
//   Float,
//   useFileUploadContext,
// } from "@chakra-ui/react";
// import { remove } from "../../assets/svgs";

// export const FileUploadList = ({ value = [], onFileSelect, onDeleteUrl }) => {
//   const fileUpload = useFileUploadContext();
//   const files = fileUpload.acceptedFiles;
//   console.log(value);

//   // V1
//   useEffect(() => {
//     if (files.length > 0) {
//       onFileSelect(files);
//     }
//   }, [files]);

//   if (files.length === 0) return null;

//   return (
//     <FileUpload.ItemGroup
//       w="fit-content"
//       as={Flex}
//       flexDirection="row"
//       gap="16px"
//       flexWrap="wrap"
//     >
//       {files.map((file) => (
//         <FileUpload.Item
//           w="163px"
//           h="178px"
//           file={file}
//           key={file.name}
//           border="none"
//           p="0"
//         >
//           <FileUpload.ItemPreviewImage
//             w="100%"
//             h="100%"
//             objectFit="cover"
//             borderRadius="8px"
//           />
//           {/* <Float placement="top-end"> */}
//           <FileUpload.ItemDeleteTrigger
//             w="36px"
//             h="36px"
//             // display="flex"
//             // alignItems="center"
//             // justifyContent="center"
//             layerStyle="fill.solid"
//             bg={"none"}
//             position="absolute"
//             top="5px"
//             right="5px"
//             background="#E8E8E8"
//             borderRadius="50%"
//             // onClick={() => onFileSelect([])}
//             onClick={onDeleteUrl}
//           >
//             {remove.icon}
//           </FileUpload.ItemDeleteTrigger>
//           {/* </Float> */}
//         </FileUpload.Item>
//       ))}
//     </FileUpload.ItemGroup>
//   );
// };

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
  const newFiles = fileUpload.acceptedFiles; // newly picked File objects

  // Split value into existing URLs vs File objects already in value
  const urlImages = value.filter((img) => typeof img === "string");

  useEffect(() => {
    const hasUnuploadedFiles = value.some((img) => img instanceof File);
    if (!hasUnuploadedFiles && newFiles.length > 0) {
      fileUpload.clearFiles();
    }
  }, [value]);

  // ✅ When new files are picked, merge with existing URLs and notify parent
  useEffect(() => {
    if (newFiles.length === 0) return;
    // Combine: existing URL strings + newly selected File objects
    onFileSelect([...urlImages, ...newFiles]);
  }, [newFiles]);

  const hasContent = urlImages.length > 0 || newFiles.length > 0;
  if (!hasContent) return null;

  return (
    <Flex flexDirection="row" gap="16px" flexWrap="wrap">
      {/* ✅ Render existing URL images */}
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
            type="button" // ✅ prevent form submit
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
            onClick={() => onDeleteUrl(url)} // ✅ pass the URL
          >
            {remove.icon}
          </Box>
        </Box>
      ))}

      {/* ✅ Render newly selected File previews via Chakra */}
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
