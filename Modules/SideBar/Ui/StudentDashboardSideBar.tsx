"use client";

import { NavMain } from "@/Modules/SideBar/Ui/nav-main";
import { NavUser } from "@/Modules/SideBar/Ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { StudentSideBarItems } from "../Data/StudentDashBoardItems";

export function StudentDashboardSideBar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  return (
    <Sidebar collapsible="icon" className="border-r" {...props}>
      <SidebarContent className="py-2">
        <NavMain items={StudentSideBarItems.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t">
        <NavUser user={StudentSideBarItems.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
