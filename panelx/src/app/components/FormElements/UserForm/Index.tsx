import { cn } from "@/app/helper/cn";
import CameraIcon from "@/app/icon/CameraIcon";
import CloseIcon from "@/app/icon/CloseIcon";
import EditIcon from "@/app/icon/EditIcon";
import EmailIcon from "@/app/icon/EmailIcon";
import PassIcon from "@/app/icon/PassIcon";
import PhoneIcon from "@/app/icon/PhoneIcon";
import UploadIcon from "@/app/icon/UploadIcon";
import UserIcon from "@/app/icon/UserIcon";
import { useEffect, useState } from "react";

export default function AddUserForm({
  show,
  setShow,
  className,
  mode,
  data,
  resetState,
}: any) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null
  );
  const [profilePicBinary, setProfilePicBinary] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "update" && data) {
      setUserName(data.username || "");
      setEmail(data.email || "");
      setPassword("");
      setUserId(data?._id);
      setProfilePicBinary(data?.image);
      setProfilePicPreview(data.image || null);
    }
  }, [mode, data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
        setProfilePicBinary(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      username: userName,
      email,
      password,
      image: profilePicBinary,
      _id: userId,
    };

    try {
      const url = mode === "update" ? "/api/updateUser" : "/api/addUser";
      const method = mode === "update" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User saved successfully:", result);
        setShow(false);
      } else {
        console.error("Error saving user:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <div
        className={cn(
          "rounded-sm border max-w-screen-sm p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",
          className
        )}
      >
        <div className="flex flex-col gap-5.5 px-0 py-2.5 flex-1 fill-gray dark:text-white ">
          {profilePicPreview && (
            <div className="mb-3 flex items-center justify-center relative z-30 mx-auto -mt-16  rounded-full bg-white/25 p-3 backdrop-blur">
              <div className=" bg-[#1a222c]/60 relative w-fit rounded-full ">
                <img
                  src={profilePicPreview}
                  alt="Profile Pic Preview"
                  className="w-33 h-33 rounded-full object-cover"
                />
                <div className="absolute w-full h-8 left-0 bottom-0 flex items-center justify-center cursor-pointer">
                  <label className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                    <CameraIcon className="fill-white" size={16} />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mb-2.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <UserIcon className="fill-current" />
                </span>
                <input
                  type="text"
                  placeholder="Enter user name"
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />{" "}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <PhoneIcon className="stroke-current" />
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                // value={userName}
                // onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <EmailIcon className="fill-current" size={19} />
              </span>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <PassIcon className="fill-current" />
              </span>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={mode === "create"}
              />
            </div>
          </div>

          {mode === "create" ? (
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach Profile Pic
              </label>

              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <UploadIcon className="fill-[#3C50E0]" />
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">PNG, JPG</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end gap-4.5">
            <button
              type="submit"
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              {mode === "update" ? "Update" : "Save"}
            </button>
            <button
              onClick={resetState}
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
