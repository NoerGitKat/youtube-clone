import { UseMutateFunction } from "react-query";

function upload(
  files: File[],
  config: {
    onUploadProgress: (progressEvent: any) => void;
  },
  mutate: UseMutateFunction<
    any,
    unknown,
    {
      formData: FormData;
      config: {
        onUploadProgress: (progressEvent: any) => void;
      };
    },
    unknown
  >
) {
  const formData = new FormData();
  formData.append("video", files[0]);

  mutate({ formData, config });
}
export default upload;
