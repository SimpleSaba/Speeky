"use client";
import React from "react";
import CustomCard, { SubmitData } from "@/components/shared/card/Card";
import { login } from "@/lib/actions/userAction";

const LoginPage = () => {
  const handleSubmit = async ({ email, password }: SubmitData) => {
    console.log(email, password);

    try {
      const response = login({ email, password });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomCard
      isLogin
      title="Login to your account"
      description="Enter your email below to login to your account"
      action="Sign Up"
      actionLink="/auth/signUp"
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
