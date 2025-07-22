import axiosInstance from "./interseptor";
import config from "../config/config";
import { AxiosResponse } from "axios";
import { SubmitData } from "@/components/shared/card/Card";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export const login = async ({ email, password }: SubmitData) => {
  const response: AxiosResponse<any> = await axiosInstance.post(
    config.api.endpoints.auth.login,
    { email, password }
  );
  console.log(response);

  localStorage.setItem("userAccessToken", response.data.token);

  return response.data;
};

export const signup = async ({ email, password, name }: SubmitData) => {
  const response: AxiosResponse<any> = await axiosInstance.post(
    config.api.endpoints.auth.signup,
    {
      email,
      password,
      name,
    }
  );

  return response.data;
};
