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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pen, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EntriesPerPage } from "../Utils/EntriesPerPage";
import PagePagination from "../Utils/Pagination";

const Questions = [
  {
    course: "Introduction to Therapy Practices",
    lesson: "Foundations of Therapeutic Care",
    question: "What is the primary goal of therapeutic intervention?",
    questionType: "Multiple Choice",
  },
  {
    course: "Full-Stack Web Development",
    lesson: "JavaScript Fundamentals",
    question: "Explain the difference between var, let, and const.",
    questionType: "Short Answer",
  },
  {
    course: "Applied Data Science",
    lesson: "Data Analysis Basics",
    question:
      "Which metric is most appropriate for evaluating a regression model?",
    questionType: "Multiple Choice",
  },
];

const QuestionsBankPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);

  const totalPages = Math.ceil(Questions.length / entries);

  return (
    <Card className="border shadow-sm">
      {/* Header */}
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Questions Bank
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage questions by course and lesson
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input placeholder="Search questions..." className="h-9 sm:w-64" />

            <Button
              className="h-9 gap-2 cursor-pointer"
              onClick={() => router.push("/questions-bank/add")}
            >
              <Plus className="h-4 w-4" />
              Add Question
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  Filter by course
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {["cat 1", "cat 2", "cat 3"].map((i, idx) => (
                  <DropdownMenuItem key={idx}>{i}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />
      </CardHeader>

      {/* Table */}
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-55">Course</TableHead>
                <TableHead className="w-55">Lesson</TableHead>
                <TableHead>Question</TableHead>
                <TableHead className="w-40">Question Type</TableHead>
                <TableHead className="w-30 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Questions.map((i, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-muted-foreground">
                    {idx + 1}
                  </TableCell>

                  <TableCell className="truncate font-medium">
                    {i.course}
                  </TableCell>

                  <TableCell className="truncate">{i.lesson}</TableCell>

                  <TableCell className="truncate text-muted-foreground">
                    {i.question}
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                      {i.questionType}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
              {Math.min(entries, Questions.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {Questions.length}
            </span>
          </span>
        </div>

        {totalPages > 1 && (
          <PagePagination
            page={page}
            onPageChange={setPage}
            pages={totalPages}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionsBankPage;
