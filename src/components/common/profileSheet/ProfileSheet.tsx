import { useEffect, useState } from "react";
import CustomCalendar from "@/components/shared/calendar/Calendar";
import EditPen from "@/components/shared/icon/EditPen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/lib/UserContext";

interface ProfileSheetProps {
  user: User;
  onSave: (user: User) => void;
}

const capitalize = (text: string) =>
  text ? text[0].toUpperCase() + text.slice(1) : "";

const getInitialState = (user: User) => ({
  firstName: capitalize(user?.firstName || ""),
  lastName: capitalize(user?.lastName || ""),
  location: user?.location || "",
  birthDate: user?.birthday ? new Date(user.birthday) : undefined,
  profilePicture: user?.profilePicture || "",
  coverPhoto: user?.coverPhoto || "",
});

const ProfileSheet = ({ user, onSave }: ProfileSheetProps) => {
  const [open, setOpen] = useState(user.isFirstLogin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    location: false,
    profilePicture: false,
    coverPhoto: false,
    birthDate: false,
  });

  const resetFields = () => {
    const initial = getInitialState(user);
    setFirstName(initial.firstName);
    setLastName(initial.lastName);
    setLocation(initial.location);
    setBirthDate(initial.birthDate);
    setProfilePicture(initial.profilePicture);
    setCoverPhoto(initial.coverPhoto);
    setProfilePreview(null);
    setCoverPreview(null);
    setErrors({
      firstName: false,
      lastName: false,
      location: false,
      profilePicture: false,
      coverPhoto: false,
      birthDate: false,
    });
  };

  useEffect(() => {
    if (open) resetFields();
  }, [open, user]);

  const getValidationErrors = () => ({
    firstName: !firstName.trim(),
    lastName: !lastName.trim(),
    location: !location.trim(),
    profilePicture: !profilePicture,
    coverPhoto: !coverPhoto,
    birthDate: !birthDate,
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string) => void,
    setFile: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateAndSave = () => {
    const newErrors = getValidationErrors();
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      onSave({
        id: user.id,
        firstName,
        lastName,
        location,
        profilePicture,
        coverPhoto,
        bio: user?.bio ?? "",
        birthday: birthDate?.toISOString() || "",
        isFirstLogin: false,
      });
      setOpen(false);
    }
  };

  const canCloseSheet =
    !user.isFirstLogin || (!Object.values(errors).some(Boolean) && !open);

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setOpen(true);
        } else if (!user.isFirstLogin) {
          setOpen(false);
        } else {
          // First login: highlight errors if trying to close
          setErrors(getValidationErrors());
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-2 rounded-md border border-gray-300 flex items-center gap-2 bg-white hover:bg-[#2FC8FF] hover:border-[#2FC8FF] transition-all duration-300"
        >
          <EditPen className="fill-gray-500 group-hover:fill-white" />
          <p className="text-sm text-gray-500 font-semibold group-hover:text-white">
            Edit profile
          </p>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-firstName">First name:</Label>
            <Input
              id="sheet-demo-firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                First name is required
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-lastName">Last name:</Label>
            <Input
              id="sheet-demo-lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                Last name is required
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-location">Location</Label>
            <Input
              id="sheet-demo-location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <span className="text-red-500 text-xs">Location is required</span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Profile Photo</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileUpload(e, setProfilePreview, setProfilePicture)
              }
              className={errors.profilePicture ? "border-red-500" : ""}
            />
            {(profilePreview || profilePicture) && (
              <img
                src={profilePreview || profilePicture}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            {errors.profilePicture && (
              <span className="text-red-500 text-xs">
                Profile photo is required
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Cover Photo</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileUpload(e, setCoverPreview, setCoverPhoto)
              }
              className={errors.coverPhoto ? "border-red-500" : ""}
            />
            {(coverPreview || coverPhoto) && (
              <img
                src={coverPreview || coverPhoto}
                alt="Cover Preview"
                className="w-full h-32 object-cover"
              />
            )}
            {errors.coverPhoto && (
              <span className="text-red-500 text-xs">
                Cover photo is required
              </span>
            )}
          </div>
          <CustomCalendar birthDate={birthDate} onDateChange={setBirthDate} />
          {errors.birthDate && (
            <span className="text-red-500 text-xs">
              Date of birth is required
            </span>
          )}
        </div>
        <SheetFooter>
          <Button onClick={validateAndSave} type="button">
            Save changes
          </Button>
          <SheetClose asChild>
            <Button
              variant="outline"
              disabled={
                user.isFirstLogin && Object.values(errors).some(Boolean)
              }
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
