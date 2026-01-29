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
import {
  Eye,
  Loader2Icon,
  MoreHorizontal,
  PenIcon,
  Plus,
  Trash2Icon,
} from "lucide-react";
import { EntriesPerPage } from "../Utils/EntriesPerPage";
import { UseDeleteUser, UseGetUsers } from "./Api/ApiClient";
import PageLoader from "../Utils/PageLoader";
import PagePagination from "../Utils/Pagination";

const ViewAllUsers = () => {
  const router = useRouter();
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [delId, setDelId] = useState("");

  const { data, isLoading } = UseGetUsers({
    page,
    pageSize: entries,
    search: query,
  });
  const { mutateAsync } = UseDeleteUser();

  const AllUsers = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / entries);

  const handleDeleteUser = async (id: string) => {
    try {
      setDelId(id);
      await mutateAsync(id);
    } catch (error) {
      console.log({ error });
    }
    setDelId("");
  };

  if (isLoading) return <PageLoader />;

  return (
    <Card className="border shadow-sm">
      {/* ===== Header ===== */}
      <CardHeader className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">Users</h1>
            <p className="text-sm text-muted-foreground">
              Manage user accounts, roles, and status.
            </p>
          </div>

          <Button
            onClick={() => router.push("/users/add")}
            className="h-10 px-4"
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <Input
              placeholder="Search by name, username, email, role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10"
            />
          </div>

          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Showing{" "}
            <span className="font-medium text-foreground">
              {AllUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {AllUsers.length}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* ===== Table ===== */}
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="whitespace-nowrap">
                <TableHead className="w-14">#</TableHead>
                <TableHead className="min-w-45">UserName</TableHead>
                <TableHead className="min-w-50">Full names</TableHead>
                <TableHead className="min-w-60">Email</TableHead>
                <TableHead className="min-w-35">Role</TableHead>
                <TableHead className="min-w-40">Phone number</TableHead>
                <TableHead className="min-w-30">Status</TableHead>
                <TableHead className="min-w-40">Account type</TableHead>
                <TableHead className="w-22.5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {AllUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-14">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <p className="text-sm font-medium">No results</p>
                      <p className="text-xs text-muted-foreground">
                        Try a different search term.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                AllUsers.map((u, idx) => (
                  <TableRow key={u.id} className="align-middle">
                    <TableCell className="text-muted-foreground">
                      {idx + 1}
                    </TableCell>

                    <TableCell className="font-medium">
                      <div className="max-w-50 truncate">{u.email}</div>
                    </TableCell>

                    <TableCell>
                      <div className="max-w-55 truncate">
                        {[u.firstName, u.lastName].filter(Boolean).join(" ")}
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      <div className="max-w-65 truncate">{u.email}</div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {u.role?.name || "N/A"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      <div className="max-w-45 truncate">{u.phone}</div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={u.voided === 0 ? "default" : "outline"}
                        className="font-normal"
                      >
                        {u.voided === 0 ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      <div className="max-w-40 truncate">{u.cooprateAccount === 1 ? "Cooperate" : "Individual"}</div>
                    </TableCell>

                    <TableCell className="text-right">
                      {parseInt(delId) === u.id ? (
                        <Loader2Icon className="mx-auto h-4 w-4 animate-spin" />
                      ) : (
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
                              onClick={() => handleDeleteUser(String(u.id))}
                              disabled={parseInt(delId) === u.id}
                            >
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* ===== Footer ===== */}
      <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <EntriesPerPage onChange={setEntries} value={entries} />
        {totalPages > 1 && (
          <PagePagination
            onPageChange={setPage}
            page={page}
            pages={totalPages}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default ViewAllUsers;
