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
  Loader2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseDeleteLesson, UseGetAllLessons } from "./Api/ApiClient";
import PageLoader from "@/Modules/Utils/PageLoader";
import PagePagination from "@/Modules/Utils/Pagination";
import UserAvatar from "@/Modules/Utils/UserAvatar";

const ViewAllLessons = () => {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [delId, setDelId] = useState("");
  const router = useRouter();

  const { data, isLoading } = UseGetAllLessons({
    page,
    pageSize: entries,
    search: query,
  });

  const { mutateAsync } = UseDeleteLesson();

  const Lessons = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / entries);

  const handleDelete = async (id: string) => {
    setDelId(id);
    try {
      await mutateAsync({ id });
    } catch (error) {
      console.log({ error });
    }
    setDelId("");
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-full flex flex-col">
      <Card className="border shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CardHeader className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Lessons
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage and organize all course lessons.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons..."
                className="h-10 w-full sm:w-72"
              />
              <Button
                className="h-10 px-4 gap-2"
                onClick={() => router.push("/lessons/add")}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Create Lesson
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-0 flex-1 overflow-hidden">
          <div className="h-full w-full overflow-auto">
            <Table className="relative">
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow className="whitespace-nowrap">
                  <TableHead className="w-14">#</TableHead>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead className="min-w-70">Course</TableHead>
                  <TableHead className="min-w-50">Lesson Title</TableHead>
                  <TableHead className="min-w-65">Video</TableHead>
                  <TableHead className="min-w-30">Duration</TableHead>
                  <TableHead className="min-w-25">Order</TableHead>
                  <TableHead className="min-w-35">Questions</TableHead>
                  <TableHead className="min-w-40">Document</TableHead>
                  <TableHead className="w-22.5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Lessons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="py-14">
                      <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2 text-center">
                        <p className="text-sm font-medium">No lessons found</p>
                        <p className="text-xs text-muted-foreground">
                          Try a different search term.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  Lessons.map((lesson, index) => (
                    <TableRow key={lesson.id} className="align-middle">
                      <TableCell className="text-muted-foreground">
                        {index + 1}
                      </TableCell>

                      <TableCell>
                        <UserAvatar AvatarUrl={lesson.photo} />
                      </TableCell>
                      <TableCell>

                        <div className="font-medium leading-snug line-clamp-2 max-w-[320px]">
                          {lesson.course?.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium leading-snug line-clamp-2 max-w-[320px]">
                          {lesson.lessonName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-0">
                          <Play className="h-4 w-4 shrink-0 opacity-70" />
                          <span className="truncate text-sm text-muted-foreground">
                            {lesson.lessonVideo}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm font-medium">
                          {lesson.lessonDuration}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Minutes
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium">
                          {lesson.lessonOrder}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-baseline gap-1">
                          <span className="font-medium">
                            {lesson._count?.questions || 0}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            questions
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {
                          /* lesson.hasDocument */ true ? (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 opacity-70" />
                              <span className="text-sm">Document</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              No document
                            </span>
                          )
                        }
                      </TableCell>

                      <TableCell className="text-right">
                        {delId === lesson.id.toString() ? (
                          <div className="inline-flex h-8 w-8 items-center justify-center">
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              disabled={delId === lesson.id.toString()}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                type="button"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-44">
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

                              <DropdownMenuItem
                                onClick={() => handleDelete(lesson.id.toString())}
                              >
                                <Trash className="mr-2 h-4 w-4" />
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

        {/* Footer */}
        <CardFooter className="flex flex-col gap-4 border-t px-6 py-4 shrink-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {Lessons.length}
            </span>{" "}
            of <span className="font-medium text-foreground">{totalItems}</span>{" "}
            lessons
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <EntriesPerPage value={entries} onChange={setEntries} />
            {totalPages > 1 && (
              <PagePagination
                onPageChange={setPage}
                page={page}
                pages={totalPages}
              />
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewAllLessons;
