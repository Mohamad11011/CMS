"use client";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Calendar from "../components/Calender";
import Profile from "../widgets/profile/Index";
import ECommerce from "../widgets/dashboard/E-commerce";
import FormElementsPage from "../widgets/form/Index";
import Settings from "../widgets/settings/Index";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableOne from "../widgets/tables/Index";
import { useState, useEffect } from "react";
import Loader from "../components/common/Loader";
import Users from "../widgets/users/Index";

type Props = { pathname: any; session?: any };

export default function WidgetsBuilder({ pathname, session }: Props) {
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);
  // const fetchAllData = async () => {
  //   const response = await fetch("/api/all");

  //   if (response.ok) {
  //     const data = await response.json();
  //     setData(data);
  //   } else {
  //     alert("Failed to fetch data!");
  //   }
  // };

  const renderComponent = () => {
    switch (pathname) {
      case "/calendar":
        return <Calendar />;
      case "/profile":
        return <Profile />;
      case "/users":
        return <Users />;
      case "/forms/form-elements":
        return <FormElementsPage />;
      case "/tables":
        return (
          <>
            <Breadcrumb pageName="Tables" />
            <div className="flex flex-col gap-10">
              <TableOne />
            </div>
          </>
        );
      case "/settings":
        return <Settings />;
      case "":
        return <ECommerce />;
      default:
        return <div>404 - Page Not Found</div>;
    }
  };
  
  return (
    <>
      {/* {loading ? <Loader /> : ""} */}
      <DefaultLayout session={session}>{renderComponent()}</DefaultLayout>
    </>
  );
}
