import { Metadata } from "next";
import { auth } from "@/auth";
import WidgetsBuilder from "./widgetsBuilder";
export const getSlug = (params: { slug: string | string[] }) => {
  let url = "";

  if (params?.slug) {
    if (typeof params.slug === "string") {
      if (params.slug !== "favicon.ico") {
        url = `/${params.slug}`;
      }
    } else if (Array.isArray(params.slug)) {
      const filteredSlugs = params.slug.filter(
        (slug) => slug !== "favicon.ico"
      );

      if (filteredSlugs.length > 0) {
        url = `/${filteredSlugs.join("/")}`;
      }
    }
  }

  return url;
};

// export const metadata: Metadata = {
//   title: "AdminX",
//   description:
//     "This is Next.js Dashboard Template Done by Mohamad Hassan web developer",
// };
type Props = {
  params: { slug: string };
};

export default async function Home({ params }: Props) {
  const pathname = getSlug(params);
  const session = await auth();
  // if (session && !session?.user) redirect("/");

  return (
    <>
      <WidgetsBuilder pathname={pathname} session={session} />
    </>
  );
}
