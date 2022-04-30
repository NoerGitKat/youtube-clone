import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";

const UploadVideo = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setIsOpened(false)}
        opened={isOpened}
        title="Upload Video"
        size="xl"
      >
        Upload your video right hurr man
      </Modal>
      <Button onClick={() => setIsOpened(true)}>Upload Video</Button>
    </>
  );
};

export default UploadVideo;
