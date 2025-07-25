import axiosInstance from "./interseptor";
import config from "../config/config";
import { AxiosResponse } from "axios";
import { SubmitData } from "@/components/shared/card/Card";
import { User } from "../UserContext";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export const login = async ({ email, password }: SubmitData) => {
  const response: AxiosResponse<any> = await axiosInstance.post(
    config.api.endpoints.auth.login,
    { email, password }
  );

  localStorage.setItem("userAccessToken", response.data.token);
  localStorage.setItem("userData", JSON.stringify(response.data.user));

  return response.data;
};

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
}: SubmitData) => {
  const response: AxiosResponse<any> = await axiosInstance.post(
    config.api.endpoints.auth.signup,
    {
      email,
      password,
      firstName,
      lastName,
    }
  );

  return response.data;
};

export const updateUser = async (user: User) => {
  const response: AxiosResponse<any> = await axiosInstance.put(
    config.api.endpoints.user.update.replace(":id", user.id),
    user
  );

  return response.data;
};
