"use client";

import * as React from "react";
import { PanelGroup, Panel, ResizeHandle } from "react-resizable-panels";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = Panel;

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof ResizeHandle>,
  React.ComponentPropsWithoutRef<typeof ResizeHandle>
>(({ className, ...props }, ref) => (
  <ResizeHandle
    ref={ref}
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      className
    )}
    {...props}
  />
));
ResizableHandle.displayName = "ResizableHandle";

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
};