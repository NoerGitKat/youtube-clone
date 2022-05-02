import { Button, Group, Modal, Progress, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { ArrowBigUpLine } from "tabler-icons-react";
import { uploadVideo } from "../../api";
import { upload } from "../../utils";
import EditVideoForm from "./EditVideoForm";

const UploadVideo = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  console.log("mutation data", mutation);

  return (
    <>
      <Modal
        closeOnClickOutside={true}
        onClose={() => setIsOpened(false)}
        opened={isOpened}
        title="Upload Video"
        size="xl"
      >
        {progress > 0 ? (
          <Progress size="xl" value={progress} label={`%${progress}`} mb="xl" />
        ) : (
          <Dropzone
            onDrop={(files) => upload(files, config, mutation.mutate)}
            accept={[MIME_TYPES.mp4]}
            onReject={() => alert("Filetype not accepted!")}
            multiple={false}
          >
            {(status) => {
              return (
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: "50vh", justifyContent: "center" }}
                  direction="column"
                >
                  <ArrowBigUpLine />
                  <Text>Drag 'n drop a file or click to upload</Text>
                </Group>
              );
            }}
          </Dropzone>
        )}
        {mutation.data && (
          <EditVideoForm
            videoId={mutation.data.videoId}
            setIsOpened={setIsOpened}
          />
        )}
      </Modal>
      <Button onClick={() => setIsOpened(true)}>Upload Video</Button>
    </>
  );
};

export default UploadVideo;
