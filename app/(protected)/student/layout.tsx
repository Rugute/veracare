import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContextProvided } from "@/context/AuthContext";
import { getCurrentUser } from "@/lib/auth";
import Header from "@/Modules/Home/Header";
import { StudentDashboardSideBar } from "@/Modules/SideBar/Ui/StudentDashboardSideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProtectedStudentLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <AuthContextProvided initialAuth={!!user} initialUser={user}>
      <SidebarProvider>
        <StudentDashboardSideBar />

        <SidebarInset className="min-w-0 flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-3 justify-between">
            <SidebarTrigger />
            <Header showSearch={false} />
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden p-4 flex flex-col gap-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthContextProvided>
  );
};

export default ProtectedStudentLayout;
