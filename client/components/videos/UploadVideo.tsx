import { Button, Group, Modal, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import React, { useState } from "react";
import { ArrowBigUpLine } from "tabler-icons-react";
// import { upload } from "../../utils";

const UploadVideo = () => {
  const [isOpened, setIsOpened] = useState(false);

  // const mutation = useMutation();
  // upload()
  return (
    <>
      <Modal
        closeOnClickOutside={true}
        onClose={() => setIsOpened(false)}
        opened={isOpened}
        title="Upload Video"
        size="xl"
      >
        <Dropzone
          onDrop={(files) => {}}
          accept={[MIME_TYPES.mp4]}
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
      </Modal>
      <Button onClick={() => setIsOpened(true)}>Upload Video</Button>
    </>
  );
};

export default UploadVideo;
