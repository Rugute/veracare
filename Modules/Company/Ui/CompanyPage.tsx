"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntriesPerPage } from "@/Modules/Utils/EntriesPerPage";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Plus, MoreHorizontal, Pen, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseGetCompnaies } from "../Api/ApiClient";
import UserAvatar from "@/Modules/Utils/UserAvatar";
import PagePagination from "@/Modules/Utils/Pagination";
import PageLoader from "@/Modules/Utils/PageLoader";

const CompanyPage = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading } = UseGetCompnaies({
    pageSize: entries,
    page,
    search,
  });

  const Companies = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / entries);

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-4">
      <Card>
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Registered Companies
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all registered companies
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/company/create")}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Company
          </Button>
        </CardHeader>

        {/* Search */}
        <CardContent className="space-y-4">
          <Input
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Account No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Companies.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                Companies.slice(0, entries).map((company, idx) => (
                  <TableRow key={company.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <UserAvatar AvatarUrl={company.logo} />
                    </TableCell>
                    <TableCell>{company.code}</TableCell>
                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>
                      {company.status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pen className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="flex items-center gap-2">
                            <Trash className="h-4 w-4 text-red-600" />
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
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <EntriesPerPage
              value={entries}
              onChange={(newValue) => {
                setEntries(newValue);
                setPage(1);
              }}
            />

            <span className="hidden sm:inline-block">
              Showing{" "}
              <span className="font-medium text-foreground">
                {Math.min(entries, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{totalItems}</span>
            </span>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-end">
              <PagePagination
                page={page}
                onPageChange={setPage}
                pages={totalPages}
              />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyPage;
