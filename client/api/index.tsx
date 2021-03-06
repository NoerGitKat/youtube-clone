import { BASE_URL } from "../constants";
import { IMe } from "../types";
import { axios } from "../utils";

export const registerUser = async (payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) => {
  const res = await axios.post(`${BASE_URL}/api/users/create`, payload);
  return res.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, payload, {
    withCredentials: true,
  });
  return res.data;
};

export const getMe = async (): Promise<IMe | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/users/me`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadVideo = async ({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) => {
  const res = await axios.post(`${BASE_URL}/api/videos/upload`, formData, {
    withCredentials: true,
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const editVideo = async ({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) => {
  const res = await axios.patch(`${BASE_URL}/api/videos/${videoId}`, payload, {
    withCredentials: true,
  });
  return res.data;
};

export const getVideos = async () => {
  const res = await axios.get(`${BASE_URL}/api/videos`);
  return res.data;
};
