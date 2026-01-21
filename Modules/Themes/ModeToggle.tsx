"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle theme"
          className="relative p-2"
        >
          <Sun
            className={`absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          />
          {/* Moon */}
          <Moon
            className={`absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-30">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
