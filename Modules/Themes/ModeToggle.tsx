"use client";

import { Moon, Sun, Laptop } from "lucide-react";
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
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="
            relative h-9 w-9 rounded-full
            hover:bg-muted
            focus-visible:ring-1 focus-visible:ring-ring
          "
        >
          {/* Sun */}
          <Sun
            className={`
              absolute h-5 w-5 transition-all duration-300
              ${
                theme === "dark"
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }
            `}
          />

          {/* Moon */}
          <Moon
            className={`
              absolute h-5 w-5 transition-all duration-300
              ${
                theme === "dark"
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-90 opacity-0"
              }
            `}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 rounded-md p-1">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 rounded-sm"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 rounded-sm"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 rounded-sm"
        >
          <Laptop className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
