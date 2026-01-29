"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseDeleteEvents, UseGetEvents } from "../Api/ApiClient";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Loader2Icon, Pen, Plus, TrashIcon } from "lucide-react";
import { EntriesPerPage } from "@/Modules/Utils/EntriesPerPage";
import PagePagination from "@/Modules/Utils/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAvatar from "@/Modules/Utils/UserAvatar";
import { diffInMonthsCeil } from "@/Modules/Utils";
import PageLoader from "@/Modules/Utils/PageLoader";

const ViewEvents = () => {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [query, setQuery] = useState("");
  const [delId, setDelId] = useState<number | undefined>(undefined);
  const router = useRouter();

  const { data: Events, isLoading } = UseGetEvents({
    page,
    pageSize: entries,
    search: query,
  });
  const { mutateAsync } = UseDeleteEvents();

  const events = Events?.items || [];
  const totalEvents = Events?.total || 0;
  const totalPages = Math.ceil(totalEvents / entries) || 0;

  const handleDelete = async (id: number) => {
    setDelId(id);
    try {
      await mutateAsync(id);
    } catch (error) {
      console.log({ error });
    }
    setDelId(undefined);
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl md:text-2xl">Events</CardTitle>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <Input
                placeholder="Search events by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full md:w-64"
              />
              <Button
                onClick={() => router.push("/events/add")}
                className="w-full md:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No events found</p>
              <Button
                onClick={() => router.push("/events/add")}
                variant="outline"
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first event
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event, index) => (
                    <TableRow key={event.id}>
                      <TableCell>{(page - 1) * entries + index + 1}</TableCell>
                      <TableCell>
                        <UserAvatar AvatarUrl={event.photo} size={50} />
                      </TableCell>
                      <TableCell className="font-medium">
                        {event.title}
                      </TableCell>
                      <TableCell>{event.categoryId}</TableCell>
                      <TableCell>
                        {diffInMonthsCeil({
                          start: event.created_at,
                          end: event.updated_at,
                        })}
                      </TableCell>
                      <TableCell>{"event.price"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Pen className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(event.id)}
                            disabled={delId === event.id}
                          >
                            {delId === event.id ? (
                              <Loader2Icon className="animate-spin h-4 w-4" />
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        {events.length > 0 && (
          <CardFooter className="flex flex-col gap-4 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-auto">
              <EntriesPerPage onChange={setEntries} value={entries} />
            </div>
            {totalPages > 1 && (
              <div className="w-full sm:w-auto">
                <PagePagination
                  onPageChange={setPage}
                  page={page}
                  pages={totalPages}
                />
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ViewEvents;
