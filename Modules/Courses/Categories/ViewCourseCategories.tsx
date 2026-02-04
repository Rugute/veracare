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
  DropdownMenuLabel,
  DropdownMenuTrigger,
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
import {
  Eye,
  MoreHorizontal,
  Pen,
  Trash,
  Plus,
  Loader2Icon,
} from "lucide-react";
import { useState } from "react";
import {
  UseDeleteCourseCategory,
  UseGetCourseCategory,
} from "./ApiClient/ApiClient";
import PageLoader from "@/Modules/Utils/PageLoader";
import { useDebounce } from "use-debounce";
import PagePagination from "@/Modules/Utils/Pagination";
import { useRouter } from "next/navigation";

const ViewCourseCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [delId, setDelId] = useState("");
  const router = useRouter();

  const { data, isLoading } = UseGetCourseCategory({
    page: page, // Using current page
    pageSize: entries,
    search: debouncedSearch,
  });
  const { mutateAsync } = UseDeleteCourseCategory();

  const categories = data?.items || [];
  const totalItems = data?.total || 0;

  const totalPages = Math.ceil(totalItems / entries);

  const handleDelete = async (id: string) => {
    try {
      setDelId(id);
      await mutateAsync(id);
      setDelId("");
    } catch (error) {
      console.log({ error });
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Course Categories
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage and organize course categories.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 sm:w-64"
            />
            <Button
              className="gap-2 h-9 cursor-pointer"
              onClick={() => router.push("/course-categories/add")}
            >
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead className="w-60">Name</TableHead>
                <TableHead className="w-64 whitespace-normal break-words">
                  Description
                </TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <p className="text-sm text-muted-foreground">
                        No categories found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try a different search or create a new category
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell className="text-muted-foreground">
                      {(page - 1) * entries + index + 1}
                    </TableCell>

                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="align-top whitespace-normal break-words">
                      <div
                        className="text-muted-foreground"
                        title={category.description}
                      >
                        {category.description}
                      </div>
                    </TableCell>

                    <TableCell className="text-right align-top">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 relative"
                            type="button"
                            disabled={delId === category.id}
                          >
                            {/* keep icon position stable */}
                            <MoreHorizontal
                              className={`h-4 w-4 transition-opacity ${delId === category.id
                                  ? "opacity-0"
                                  : "opacity-100"
                                }`}
                            />

                            {/* overlay spinner when deleting */}
                            {delId === category.id && (
                              <Loader2Icon className="absolute h-4 w-4 animate-spin" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem disabled={delId === category.id}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem disabled={delId === category.id}>
                            <Pen className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            disabled={delId === category.id}
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash className="mr-2 h-4 w-4 text-red-600" />
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
            of <span className="font-medium text-foreground">{totalItems}</span>
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
  );
};

export default ViewCourseCategories;
