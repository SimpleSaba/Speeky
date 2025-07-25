"use client";
import React, { useEffect, useState } from "react";
import { User, useUser } from "@/lib/UserContext";
import Image from "next/image";
import profile from "@/assets/images/defaultProfilePic.png";
import bgImage from "@/assets/images/defaultBgImage.png";
import { getFullName } from "@/helper/userHelper";
import ProfileSheet from "@/components/common/profileSheet/ProfileSheet";
import { updateUser } from "@/lib/actions/userAction";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const ProfilePage = () => {
  const { user, setUser } = useUser();

  const fullName = getFullName(user?.firstName || "", user?.lastName || "");

  const handleUpdateUser = async (user: User) => {
    const response = await updateUser(user);
    setUser(response.user);
  };

  return (
    <div className="flex flex-col w-9/12 mx-auto">
      <div className="relative">
        <div className="relative w-full h-64 bg-gray-200 rounded-b-2xl rounded-bl-2xl shadow-lg flex items-center justify-center overflow-hidden">
          <Image
            src={user?.coverPhoto || bgImage}
            alt="bgImage"
            className={cn(
              "w-[50px] h-[50px]",
              user?.coverPhoto && "object-cover"
            )}
            fill={user?.coverPhoto ? true : false}
          />
        </div>
        <div className="absolute w-[150px] h-[150px] flex items-center justify-center bottom-0 translate-y-1/2 left-10 bg-white rounded-full">
          <div className="rounded-full overflow-hidden shadow-lg min-w-[160px] min-h-[160px] bg-white">
            <Image
              className="rounded-full object-cover"
              src={user?.profilePicture || profile}
              alt="profile"
              fill
            />
          </div>
        </div>
      </div>
      {/* image*/}
      <div className="">
        <div className="flex mt-5 justify-between items-center">
          <div className="flex flex-col gap-1 ml-56">
            <h1 className="text-2xl font-bold ">{fullName}</h1>
            <p className="text-sm text-gray-500">
              {user?.birthday
                ? dayjs(user?.birthday).format("DD/MM/YYYY")
                : "Birthday"}
            </p>
          </div>
          <ProfileSheet
            user={user || ({} as User)}
            onSave={(user) => {
              handleUpdateUser(user);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
