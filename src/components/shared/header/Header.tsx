"use client";
import React from "react";
import Speeky from "../icon/Speeky";
import Link from "next/link";
import { useUser } from "@/lib/UserContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { logout } = useUser();
  const router = useRouter();
  return (
    <header className="flex justify-between items-center p-2 border-b border-gray-100 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full fixed z-30">
      <Speeky />
      <div
        className="cursor-pointer"
        onClick={() => {
          logout();
          router.push("/auth/login");
        }}
      >
        Log Out
      </div>
      <Link href="/app/profile">
        <div className="w-8 h-8 flex justify-center items-center text-white  rounded-full bg-cyan-400">
          T
        </div>
      </Link>
    </header>
  );
};

export default Header;
