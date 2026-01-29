"use client";

import { useState } from "react";
import { UseDeleteQuestionType, UseGetAllQuestionType } from "../Api/ApiClient";
import PageLoader from "@/Modules/Utils/PageLoader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Pen, Plus, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntriesPerPage } from "@/Modules/Utils/EntriesPerPage";
import PagePagination from "@/Modules/Utils/Pagination";

const ViewQuestionTypes = () => {
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [delId, setDelId] = useState("");
  const router = useRouter();
  const { mutateAsync } = UseDeleteQuestionType();

  const { data, isLoading } = UseGetAllQuestionType({
    page,
    pageSize: entries,
    search: query,
  });

  const questionTypes = data?.items || [];
  const totalQuestionTypes = data?.total || 0;
  const totalPages = Math.ceil(totalQuestionTypes / entries) || 0;

  const handleDelete = async (id: string) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Question Types</CardTitle>
        <div className="flex gap-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search question types name"
          />
          <Button
            variant={"outline"}
            onClick={() => router.push("/questions-type/add")}
          >
            <Plus /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="space-y-2">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionTypes.length === 0 ? (
              <div>
                <p>No question types created</p>
              </div>
            ) : (
              questionTypes.map((i, idx) => (
                <TableRow key={i.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.description ? i.description : "_"}</TableCell>
                  <TableCell>
                    <Button variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost">
                      <Pen className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      disabled={delId === String(i.id)}
                      onClick={() => handleDelete(String(i.id))}
                    >
                      {delId === String(i.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2Icon className="h-4 w-4 text-red-600" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Total items:{" "}
          <span className="font-medium text-foreground">
            {totalQuestionTypes}
          </span>
        </p>

        <EntriesPerPage value={entries} onChange={setEntries} />

        <div className="flex items-center gap-4">
          {totalPages !== 0 && (
            <PagePagination
              onPageChange={setPage}
              page={page}
              pages={totalPages}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ViewQuestionTypes;
