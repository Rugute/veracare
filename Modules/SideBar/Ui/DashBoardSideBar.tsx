"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { ChevronDown } from "lucide-react";

export function DashBoardSideBar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  // which section is open (allow multiple, or switch to single-open if you want)
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >({});

  // Auto-open the section that matches the current route
  React.useEffect(() => {
    const next: Record<string, boolean> = {};

    DashBoardItems.navMain.forEach((item) => {
      const hasActiveChild = item.items?.some((sub) =>
        pathname.startsWith(sub.url),
      );

      if (hasActiveChild) next[item.title] = true;
    });

    setOpenSections((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="font-semibold text-base">
                Vera Care
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {DashBoardItems.navMain.map((item) => {
            const hasChildren = !!item.items?.length;
            const isOpen = !!openSections[item.title];

            // Active for parent: either direct match, or any child match
            const isParentActive =
              (item.url && pathname.startsWith(item.url)) ||
              item.items?.some((sub) => pathname.startsWith(sub.url));

            return (
              <SidebarMenuItem key={item.title}>
                {hasChildren ? (
                  <SidebarMenuButton
                    onClick={() => toggle(item.title)}
                    className="justify-between"
                    isActive={!!isParentActive}
                    type="button"
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild isActive={!!isParentActive}>
                    <Link href={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                )}

                {hasChildren && isOpen ? (
                  <SidebarMenuSub>
                    {item.items!.map((sub) => {
                      const isSubActive = pathname.startsWith(sub.url);

                      return (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild isActive={isSubActive}>
                            <Link href={sub.url}>{sub.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
