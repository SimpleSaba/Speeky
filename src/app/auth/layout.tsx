import React from "react";
import Speeky from "@/components/shared/icon/Speeky";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[linear-gradient(120deg,_#f8fafc_0%,_#e0e7ef_100%)] h-screen w-screen flex  items-center justify-center lg:justify-end lg:pr-32">
      <Speeky
        width={700}
        height={200}
        className="absolute bottom-4/5 left-1/6 translate-x-1/2 translate-y-1/2 xl:max-w-full lg:max-w-sm sm:max-w-xs lg:bottom-1/2 lg:translate-x-0 lg:left-1/12"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
