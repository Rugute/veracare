"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal, PenIcon, Plus, Trash2Icon } from "lucide-react";
import { EntriesPerPage } from "../Utils/EntriesPerPage";

type UserRow = {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  role: "Administrator" | "Student" | "Instructor";
  phone: string;
  isActive: boolean;
  accountType: "Individual" | "Corporate";
};

const DUMMY_USERS: UserRow[] = [
  {
    id: "u_001",
    userName: "j.kip",
    fullName: "John Kiprotich",
    email: "john.kiprotich@example.com",
    role: "Administrator",
    phone: "0712 345 678",
    isActive: true,
    accountType: "Corporate",
  },
  {
    id: "u_002",
    userName: "a.njeri",
    fullName: "Anne Njeri",
    email: "anne.njeri@example.com",
    role: "Instructor",
    phone: "0701 220 901",
    isActive: true,
    accountType: "Individual",
  },
];

const ViewAllUsers = () => {
  const router = useRouter();

  const [entries, setEntries] = useState(10);
  const [query, setQuery] = useState("");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">Users</h1>
            <p className="text-sm text-muted-foreground">
              Manage user accounts, roles, and status.
            </p>
          </div>

          <Button
            onClick={() => router.push("/users/add")}
            className="h-10"
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <Input
              placeholder="Search by name, username, email, role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="whitespace-nowrap">
              Showing{" "}
              <span className="font-medium text-foreground">
                {DUMMY_USERS.length}
              </span>
              of
              <span className="font-medium text-foreground">
                {DUMMY_USERS.length}
              </span>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-15">#</TableHead>
                <TableHead>UserName</TableHead>
                <TableHead>Full names</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Phone number</TableHead>
                <TableHead className="w-27.5">Status</TableHead>
                <TableHead className="w-32.5">Account type</TableHead>
                <TableHead className="w-22.5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {DUMMY_USERS.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-10">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <p className="text-sm font-medium">No results</p>
                      <p className="text-xs text-muted-foreground">
                        Try a different search term.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                DUMMY_USERS.map((u, idx) => (
                  <TableRow key={u.id} className="align-middle">
                    <TableCell className="text-muted-foreground">
                      {idx + 1}
                    </TableCell>

                    <TableCell className="font-medium">{u.userName}</TableCell>

                    <TableCell>{u.fullName}</TableCell>

                    <TableCell className="text-muted-foreground">
                      {u.email}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {u.role}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {u.phone}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={u.isActive ? "default" : "outline"}
                        className="font-normal"
                      >
                        {u.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {u.accountType}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            type="button"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open actions</span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => router.push(`/users/${u.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => router.push(`/users/${u.id}/edit`)}
                          >
                            <PenIcon className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            // Replace with your confirmation modal / server action
                            onClick={() => console.log("delete", u.id)}
                          >
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <EntriesPerPage onChange={setEntries} value={entries} />
      </CardFooter>
    </Card>
  );
};

export default ViewAllUsers;
