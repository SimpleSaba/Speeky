"use client";
import CustomCard, { SubmitData } from "@/components/shared/card/Card";
import { signup } from "@/lib/actions/userAction";
import React from "react";

const SignUpPage = () => {
  const handleSubmit = ({ email, password, name, lastName }: SubmitData) => {
    const fullName = name + " " + lastName;
    try {
      const response = signup({ email, password, name: fullName });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomCard
        title="Sign Up"
        description="Enter your information below to sign up to your account"
        action="Login"
        actionLink="/auth/login"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SignUpPage;
