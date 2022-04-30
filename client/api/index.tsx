import { AxiosResponse } from "axios";
import { BASE_URL } from "../constants";
import { IMe } from "../types";
import { axios } from "../utils";

export const registerUser = async (payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}): Promise<AxiosResponse<any, any>> => {
  const data = await axios.post(`${BASE_URL}/api/users/create`, payload);
  return data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<AxiosResponse<any, any>> => {
  const data = await axios.post(`${BASE_URL}/api/auth/login`, payload);
  return data;
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
