import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants";

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
  const data = await axios.post(`${BASE_URL}/api/auth/login`, payload, {
    withCredentials: true,
  });
  return data;
};
