"use client";
import { Input } from "@/components/ui/input";
import UserAvatar from "../Utils/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LogOutIcon,
  User2Icon,
  SearchIcon,
  Bell,
  Settings,
  Loader2Icon,
} from "lucide-react";
import { ModeToggle } from "../Themes/ModeToggle";
import { useAuthContext } from "@/context/AuthContext";
import { UseAuthLogout } from "../Auth/Api/ApiClient";

interface Props {
  showSearch?: boolean;
}

const Header = ({ showSearch = true }: Props) => {
  const { isAuthenticated, user } = useAuthContext();

  const { mutate, isPending } = UseAuthLogout();
  const handleLogout = async () => {
    mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - Logo and Search */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          {/* Logo */}
          <div className="flex items-center">
            <button
              type="button"
              // onClick={() => router.push("/")}
              className="group flex items-center gap-3 text-left"
              aria-label="Go to homepage"
            >
              {/* Icon (simple medical mark) */}
              <div className="flex h-9 w-9 items-center justify-center rounded-md border">
                <svg
                  viewBox="0 0 48 48"
                  className="h-6 w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* bag outline */}
                  <path
                    d="M14 16.5v-2.2c0-2.6 2.1-4.8 4.8-4.8h10.4c2.6 0 4.8 2.1 4.8 4.8v2.2"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16.5h24c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4v-16c0-2.2 1.8-4 4-4Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />

                  {/* small cross */}
                  <path
                    d="M24 22v10M19 27h10"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* little “stethoscope-ish” curve */}
                  <path
                    d="M33.5 24.5c1.8 0 3 1.4 3 3.1 0 1.9-1.6 3.4-3.6 3.4h-1.4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="min-w-0 leading-tight">
                <div className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  Veracare Health Academy LLC e-Learning Platform
                </div>
                <div className="hidden truncate text-xs text-muted-foreground sm:block">
                  Learn with Purpose. Serve with Heart.
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Search */}
          {showSearch && (
            <div className="hidden md:block relative w-72 lg:w-96">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for courses, topics, or instructors..."
                className="pl-10 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          )}
        </div>

        {/* Right side - Navigation & Auth */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search toggle for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>

          {/* Notification bell */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          )}

          {/* Theme toggle */}
          <div className="relative">
            <ModeToggle />
          </div>

          {/* Auth section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 md:gap-4">
              {/* User email - Desktop only */}
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-sm font-medium text-foreground">
                  {user.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>

              {/* Avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 md:h-10 md:w-10 rounded-full p-0 hover:bg-muted transition-all"
                  >
                    <UserAvatar
                      AvatarUrl=""
                      className="border-2 border-background shadow-sm hover:shadow-md transition-shadow"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64"
                  align="end"
                  sideOffset={8}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar AvatarUrl="" size={48} />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Student
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="cursor-pointer py-3">
                    <User2Icon className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer py-3">
                    <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950 cursor-pointer"
                      onClick={() => handleLogout()}
                    >
                      {isPending ? (
                        <>
                          <Loader2Icon className="animate-spin h-4 w-5" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <LogOutIcon className="h-4 w-4" />
                          <span>Sign Out</span>
                        </>
                      )}
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button className="gap-2 cursor-pointer">
                <LogOutIcon className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search - Hidden on desktop */}
      <div className="md:hidden border-t px-4 py-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for courses..."
            className="pl-10 bg-background border-input"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
