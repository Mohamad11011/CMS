import React from "react";
import { Metadata } from "next";
import FormElements from "@/app/components/FormElements";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
      <FormElements />
  );
};

export default FormElementsPage;
