import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashBoardSidebarWrapper from "@/Modules/SideBar/Ui/DashBoardSideBarWrapper";

interface Props {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
 const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("token");
 
  if (!token) {
    redirect("/sign-in"); // server-side redirect
  }

  return <DashBoardSidebarWrapper>{children}</DashBoardSidebarWrapper>;
}
