"use client";

import { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashBoardSideBar } from "@/Modules/SideBar/Ui/DashBoardSideBar";
import Header from "@/Modules/Home/Header";

interface Props {
  children: ReactNode;
}

export default function DashBoardSidebarWrapper({ children }: Props) {
  return (
    <SidebarProvider>
      <DashBoardSideBar />
      {/* min-w-0 prevents content from pushing the sidebar */}
      <SidebarInset className="min-w-0 flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-3 justify-between">
          <SidebarTrigger />
          <Header showSearch={false} />
        </header>

        {/* overflow-x-hidden prevents tables/long text from breaking layout */}
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 flex flex-col gap-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
