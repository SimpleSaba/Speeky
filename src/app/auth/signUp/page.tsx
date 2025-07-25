"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomCard, { SubmitData } from "@/components/shared/card/Card";
import { signup } from "@/lib/actions/userAction";
import { useUser } from "@/lib/UserContext";

const SignUpPage = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/app/home");
    }
  }, [user, router]);

  if (user) return null;

  const handleSubmit = async ({
    email,
    password,
    firstName,
    lastName,
  }: SubmitData) => {
    try {
      await signup({
        email,
        password,
        firstName,
        lastName,
      });
      router.push("/auth/login");
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
