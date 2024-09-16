import { cn } from "@/app/helper/cn";
import CloseIcon from "@/app/icon/CloseIcon";
import { useEffect, useState } from "react";

export default function AddUserForm({ show, setShow, className, mode, data }: any) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [profilePicBinary, setProfilePicBinary] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "update" && data) {
      setUserName(data.username || "");
      setEmail(data.email || "");
      setPassword(""); 
      setUserId(data?._id)
      setProfilePicBinary(data?.image)
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
      _id: userId
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
          "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",
          className
        )}
      >
        <div className="flex flex-col gap-5.5 px-0 py-2.5 flex-1">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              User Name
            </label>
            <input
              type="text"
              placeholder="Enter user name"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={mode === "create"} // Only require password when creating a user
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Attach Profile Pic
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              onChange={handleImageUpload}
            />
          </div>

          {profilePicPreview && (
            <div className="mb-4">
              <img
                src={profilePicPreview}
                alt="Profile Pic Preview"
                className="w-28 h-28 rounded-full object-cover border-[1.5px] border-stroke dark:border-form-strokedark"
              />
            </div>
          )}

          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-opacity-90"
          >
            {mode === "update" ? "Save Updates" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
