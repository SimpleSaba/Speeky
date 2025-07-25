import React from "react";
import Header from "@/components/shared/header/Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#F2F5F7] w-screen">
      <Header />
      <div className="pt-[77px]">{children}</div>
    </div>
  );
};

export default AppLayout;
