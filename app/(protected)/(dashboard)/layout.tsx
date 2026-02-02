import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashBoardSidebarWrapper from "@/Modules/SideBar/Ui/DashBoardSideBarWrapper";
import { AuthContextProvided } from "@/context/AuthContext";
import { getCurrentUser } from "@/lib/auth";
import { UtilsContextProvider } from "@/context/UtilsContext";

interface Props {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/sign-in"); // server-side redirect
  }

  const user = await getCurrentUser();

  return (
    <AuthContextProvided initialAuth={!!user} initialUser={user}>
      <UtilsContextProvider>
        <DashBoardSidebarWrapper>{children}</DashBoardSidebarWrapper>
      </UtilsContextProvider>
    </AuthContextProvided>
  );
}
