"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashBoardSideBar } from "@/Modules/SideBar/Ui/DashBoardSideBar";
import { ModeToggle } from "@/Modules/Themes/ModeToggle";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashBoardSideBar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-3 justify-between">
          <SidebarTrigger />
          <ModeToggle />
        </header>
        <main className="flex-1 p-4 flex flex-col gap-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
