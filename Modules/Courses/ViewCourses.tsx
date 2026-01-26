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

const Courses = [
  {
    title: "Introduction to Therapy Practices",
    category: "Therapy",
    description:
      "Foundational course covering core therapeutic approaches and client interaction techniques.",
    requirements: "Basic understanding of psychology or healthcare",
    price: 12000,
    published: true,
  },
  {
    title: "Full-Stack Web Development",
    category: "Software Development",
    description:
      "Learn modern frontend and backend development using industry-standard tools and frameworks.",
    requirements: "Basic computer literacy",
    price: 18000,
    published: true,
  },
  {
    title: "Applied Data Science",
    category: "Data Science",
    description:
      "Hands-on course focused on data analysis, visualization, and introductory machine learning.",
    requirements: "Basic statistics and Python knowledge",
    price: 15000,
    published: false,
  },
];

const ViewCourses = () => {
  const router = useRouter();
  const [entries, setEntries] = useState(10);
  const [query, setQuery] = useState("");

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
            >
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="min-w-56">Course Title</TableHead>
                <TableHead className="min-w-32">Category</TableHead>
                <TableHead className="min-w-72 max-w-96">Description</TableHead>
                <TableHead className="min-w-56 max-w-80">
                  Requirements
                </TableHead>
                <TableHead className="min-w-28">Price</TableHead>
                <TableHead className="min-w-32">Published</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Courses.map((course, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-muted-foreground">
                    {idx + 1}
                  </TableCell>

                  <TableCell>
                    <div className="font-medium line-clamp-2">
                      {course.title}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                      {course.category}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="text-muted-foreground line-clamp-1 max-w-96">
                      {course.description}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-muted-foreground line-clamp-2 max-w-80">
                      {course.requirements}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    {course.price.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${course.published ? "border" : "border"}`}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">3</span> of{" "}
          <span className="font-medium text-foreground">3</span> courses
        </p>

        <EntriesPerPage value={entries} onChange={setEntries} />
      </CardFooter>
    </Card>
  );
};

export default ViewCourses;
