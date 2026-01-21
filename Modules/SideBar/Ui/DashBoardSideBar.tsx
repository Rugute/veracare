"use client";

import * as React from "react";
import { DashBoardItems } from "../Data/SideBArItems";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

export function DashBoardSideBar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      {/* Header / Logo */}
      <SidebarHeader className="px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="font-bold text-lg">
                Vera Care
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Menu Items */}
      <SidebarContent className="px-2">
        <SidebarMenu>
          {DashBoardItems.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url} className="font-medium">
                  {item.title}
                </a>
              </SidebarMenuButton>

              {/* Sub-items */}
              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton asChild isActive={sub.isActive}>
                        <a href={sub.url}>{sub.title}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
