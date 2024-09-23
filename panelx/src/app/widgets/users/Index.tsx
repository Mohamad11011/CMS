"use client";
import DatePickerOne from "@/app/components/FormElements/DatePicker/DatePickerOne";
import UserForm from "@/app/components/FormElements/UserForm/Index";
import SwitcherFour from "@/app/components/Switchers/SwitcherFour";
import Button from "@/app/components/ui/button/Index";
import useGetAllUsers from "@/app/hooks/useGetAllUsers";
import BackIcon from "@/app/icon/BackIcon";
import DeleteIcon from "@/app/icon/DeleteIcon";
import EditIcon from "@/app/icon/EditIcon";
import PlusIcon from "@/app/icon/PlusIcon";
import WarningIcon from "@/app/icon/WarningIcon";
import Image from "next/image";
import { useEffect, useState } from "react";

const Users = () => {
  // const [data, setData] = useState<any>();
  const [show, setShow] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<any>();
  const [activeUserId, setActiveUserId] = useState<any>();
  const [loader, setLoader] = useState<boolean>();

  const { data, isLoading } = useGetAllUsers();

  const resetState = () => {
    console.log("reset")
    setUpdateUser(false), setShow(false);
  };

  const deleteUser = async (activeUserId: any) => {
    // Create a new FormData object
    const formData = {
      id: activeUserId,
    };

    try {
      // Post the form data to your API
      setLoader(true);
      const response = await fetch("/api/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User deleted successfully:", result);
        setLoader(false);
        setShowDelete(false);
      } else {
        setLoader(false);
        setShowDelete(false);
        console.error("Error deleting user:", result.message);
      }
    } catch (error) {
      setLoader(false);
      setShowDelete(false);
      console.error("Error submitting", error);
    }
  };

  return (
    <>
      <div className="px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1">
        {show ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h4 className=" text-xl font-semibold text-black dark:text-white">
                Add New User
              </h4>
              <Button icon={BackIcon} todo={() => resetState()}>
                Back
              </Button>
            </div>
            <UserForm
              show={show}
              className={"shadow-none border-0"}
              resetState={resetState}
            />
          </>
        ) : updateUser ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h4 className=" text-xl font-semibold text-black dark:text-white">
                Update User
              </h4>
              <Button icon={BackIcon} todo={() => resetState()}>
                Back
              </Button>
            </div>
            <UserForm
              mode="update"
              data={updateUser}
              show={show}
              className={"shadow-none border-0"}
              resetState={resetState}
            />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h4 className=" text-xl font-semibold text-black dark:text-white">
                Users
              </h4>
              <Button icon={PlusIcon} todo={() => setShow(true)}>
                Add
              </Button>
            </div>

            <div className="flex flex-col  rounded-lg overflow-hidden bg-white dark:bg-boxdark">
              <div className="grid grid-cols-12 bg-[#F9FAFB] px-5 py-4 dark:bg-meta-4 lg:px-7.5 2xl:px-11">
                <div className="col-span-3">
                  <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
                </div>
                <div className="col-span-3">
                  <h5 className="font-medium text-[#637381] dark:text-bodydark">
                    Username
                  </h5>
                </div>
                <div className="col-span-3">
                  <h5 className="font-medium text-[#637381] dark:text-bodydark">
                    Email
                  </h5>
                </div>
                <div className="col-span-3">
                  <h5 className="font-medium text-[#637381] dark:text-bodydark">
                    Actions
                  </h5>
                </div>
              </div>

              {isLoading && (
                <>
                  <div className="border-b border-stroke dark:border-strokedark  h-20 w-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                  <div className="border-b border-stroke dark:border-strokedark  h-20 w-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                  <div className="border-b border-stroke dark:border-strokedark  h-20 w-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                  <div className="h-20 w-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                </>
              )}
              {data &&
                data.map((item: any, index: any) => (
                  <div
                    className={`grid grid-cols-12 px-5 py-4 lg:px-7.5 2xl:px-11 ${
                      index === data.length
                        ? ""
                        : "border-t border-[#EEEEEE] dark:border-strokedark"
                    }`}
                    key={index}
                  >
                    <div className="col-span-3 flex items-center">
                      <div className="flex-shrink-0 ">
                        <Image
                          src={item?.image}
                          alt="Brand"
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-[#637381] dark:text-bodydark">
                        {item?.username}
                      </p>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-[#637381] dark:text-bodydark">
                        {item?.email}
                      </p>
                    </div>
                    <div className="col-span-3 flex space-x-2 items-center">
                      <div
                        onClick={() => (
                          setShowDelete(true), setActiveUserId(item?._id)
                        )}
                      >
                        <DeleteIcon className="fill-[#637381] hover:fill-slate-300 cursor-pointer" />
                      </div>
                      <div onClick={() => setUpdateUser(item)}>
                        <EditIcon
                          className="fill-[#637381] hover:fill-slate-300 cursor-pointer"
                          size={18}
                        />
                      </div>
                    </div>
                  </div>
                ))}

              {showDelete ? (
                <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
                  <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15">
                    <span className="mx-auto inline-block">
                      <WarningIcon size={60} />
                    </span>
                    <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                      Delete User
                    </h3>
                    <p className="mb-10 font-medium">
                      This confirmation message to make sure that this action
                      could not be reversed.
                    </p>
                    <div className="-mx-3 flex flex-wrap gap-y-4">
                      {loader ? (
                        <div className="flex items-center justify-center w-full">
                          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-red border-t-transparent"></div>
                        </div>
                      ) : (
                        <>
                          <div className="w-full px-3 2xsm:w-1/2">
                            <button
                              onClick={() => setShowDelete(false)}
                              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="w-full px-3 2xsm:w-1/2">
                            <button
                              onClick={() => deleteUser(activeUserId)}
                              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                            >
                              Confirm
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Users;
