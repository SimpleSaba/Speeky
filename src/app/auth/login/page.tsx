"use client";
import React, { useEffect } from "react";
import CustomCard, { SubmitData } from "@/components/shared/card/Card";
import { login } from "@/lib/actions/userAction";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/UserContext";

const LoginPage = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  console.log("user", user);

  useEffect(() => {
    if (user && user.isFirstLogin) {
      router.replace("/app/profile");
    } else if (user) {
      router.replace("/app/home");
    }
  }, [user, router]);

  if (user) return null;

  const handleSubmit = async ({ email, password }: SubmitData) => {
    try {
      const response = await login({ email, password });
      setUser(response.user);
      router.push("/app/home");
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
