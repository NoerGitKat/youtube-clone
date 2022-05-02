import { Button, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { useMutation } from "react-query";
import { editVideo } from "../../api";
import { useVideos } from "../../context/video";
import { IVideo } from "../../types";

const EditVideoForm = ({
  videoId,
  setIsOpened,
}: {
  videoId: string;
  setIsOpened: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { refetch } = useVideos();
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });

  const mutation = useMutation<
    AxiosResponse<IVideo>,
    AxiosError,
    Parameters<typeof editVideo>["0"]
  >(editVideo, {
    onSuccess: () => {
      refetch();
      setIsOpened(false);
    },
  });

  return (
    <form
      onSubmit={onSubmit((values) => {
        mutation.mutate({ videoId, ...values });
      })}
    >
      <Stack>
        <TextInput
          label="Title"
          placeholder="My amazing vidya"
          required
          {...getInputProps("title")}
        />
        <TextInput
          label="Description"
          required
          {...getInputProps("description")}
        />
        <Switch label="Published" {...getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};

export default EditVideoForm;
