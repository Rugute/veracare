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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  Play,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseGetAllLessons } from "./Api/ApiClient";
import PageLoader from "@/Modules/Utils/PageLoader";

const ViewAllLessons = () => {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading } = UseGetAllLessons({
    page,
    pageSize: entries,
    search: query,
  });

  const Lessons = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / entries);

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-full flex flex-col">
      <Card className="border shadow-sm flex-1 flex flex-col">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Lessons
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage and organize all course lessons.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons..."
                className="h-9 sm:w-64"
              />
              <Button
                className="gap-2 h-9"
                onClick={() => router.push("/lessons/add")}
              >
                <Plus className="h-4 w-4" />
                Create Lesson
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto">
                <Table className="relative">
                  <TableHeader className="overflow-auto">
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>image</TableHead>
                      <TableHead className="min-w-64">Lesson Title</TableHead>
                      <TableHead className="min-w-48">Course</TableHead>
                      <TableHead>status</TableHead>
                      <TableHead className="min-w-48">Video</TableHead>
                      <TableHead className="min-w-32">Duration</TableHead>
                      <TableHead className="min-w-32">Order</TableHead>
                      <TableHead className="min-w-32">Questions</TableHead>
                      <TableHead className="min-w-32">Document</TableHead>
                      <TableHead className="w-24 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {Lessons.map((lesson, index) => (
                      <TableRow key={lesson.id}>
                        <TableCell className="text-muted-foreground">
                          {index + 1}
                        </TableCell>

                        <TableCell>
                          <div className="font-medium line-clamp-2">
                            {lesson.title}
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                            {"lesson.course"}
                          </span>
                        </TableCell>

                        <TableCell>
                          {lesson.published ? "Published" : "Not published"}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 shrink-0" />
                            <span className="truncate text-sm">
                              {"lesson.videoUrl"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="font-medium">
                            {"lesson.duration"}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
                            {"lesson.order"}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {"lesson.questions"}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              questions
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          {lesson.hasDocument ? (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">Document</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              No document
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t px-6 py-4 shrink-0 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {Lessons.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {Lessons.length}
            </span>{" "}
            lessons
          </p>

          <EntriesPerPage value={entries} onChange={setEntries} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewAllLessons;
