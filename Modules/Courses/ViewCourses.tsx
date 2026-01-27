"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal, Pen, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EntriesPerPage } from "../Utils/EntriesPerPage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseGetCourses } from "./ApiClient/ApiClient";
import PageLoader from "../Utils/PageLoader";
import PagePagination from "../Utils/Pagination";

const ViewCourses = () => {
  const router = useRouter();
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [delId, setDelId] = useState("");

  const { data, isLoading } = UseGetCourses({
    page,
    pageSize: entries,
    search: query,
  });

  const courses = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / entries);

  if (isLoading) return <PageLoader />;

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Courses
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage and organize your course offerings.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 sm:w-64"
            />
            <Button
              className="gap-2 h-9"
              onClick={() => router.push("/courses/add")}
              type="button"
            >
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Hard stop: do NOT let the table push the layout */}
        <div className="w-full max-w-full overflow-x-auto">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>

                <TableHead className="w-60">Course Title</TableHead>
                <TableHead className="w-35">Category</TableHead>

                {/* fixed widths so text can't expand the layout */}
                <TableHead className="w-[320px]">Description</TableHead>
                <TableHead className="w-65">Requirements</TableHead>

                <TableHead className="w-30">Price</TableHead>
                <TableHead className="w-30">Published</TableHead>
                <TableHead className="w-22.5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No courses found
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((course, idx) => (
                  <TableRow key={`${course.title}-${idx}`}>
                    <TableCell className="text-muted-foreground">
                      {idx + 1}
                    </TableCell>

                    <TableCell className="align-top">
                      <div
                        className="font-medium truncate"
                        title={course.title}
                      >
                        {course.title}
                      </div>
                    </TableCell>

                    <TableCell className="align-top">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                        {course.categoryId}
                      </span>
                    </TableCell>

                    <TableCell className="align-top">
                      <div
                        className="text-muted-foreground truncate"
                        title={course.description}
                      >
                        {course.description}
                      </div>
                    </TableCell>

                    <TableCell className="align-top">
                      <div
                        className="text-muted-foreground truncate"
                        title={""}
                      >
                        {"-"}
                      </div>
                    </TableCell>

                    <TableCell className="align-top font-medium">
                      {"-"}
                    </TableCell>

                    <TableCell className="align-top">
                      <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
                        {course.published ? "Published" : "Draft"}
                      </span>
                    </TableCell>

                    <TableCell className="text-right align-top">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            type="button"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Pen className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
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

export default ViewCourses;
