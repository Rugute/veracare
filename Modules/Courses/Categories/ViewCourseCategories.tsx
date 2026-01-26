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
import { Eye, MoreHorizontal, Pen, Trash } from "lucide-react";
import { useMemo, useState } from "react";

const Categories = [
  {
    name: "Therapy",
    description:
      "Courses focused on therapeutic practices, mental health support, and rehabilitation techniques.",
  },
  {
    name: "Software Development",
    description:
      "Programming, system design, and modern software engineering practices.",
  },
  {
    name: "Data Science",
    description:
      "Data analysis, machine learning, statistics, and data-driven decision making.",
  },
  {
    name: "Business & Management",
    description:
      "Leadership, entrepreneurship, operations, and organizational strategy.",
  },
  {
    name: "Creative Arts",
    description:
      "Design, visual arts, creative thinking, and digital media production.",
  },
];

const ViewCourseCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(10);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-row gap-3 sm:flex-col sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Course Categories
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage and organize course categories.
            </p>
          </div>

          <div className="w-full sm:w-[320px] sm:shrink-0">
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-15">#</TableHead>
                <TableHead className="min-w-45">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-22.5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10">
                    <div className="text-center text-sm text-muted-foreground">
                      No categories found
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                Categories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    <TableCell className="text-muted-foreground leading-relaxed">
                      {category.description}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {Categories.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {Categories.length}
          </span>
        </p>

        <EntriesPerPage value={entries} onChange={setEntries} />
      </CardFooter>
    </Card>
  );
};

export default ViewCourseCategories;
