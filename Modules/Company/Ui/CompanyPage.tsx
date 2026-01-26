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
import { useMemo, useState } from "react";

type Company = {
  id: string;
  logo: string;
  accountNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  isActive: boolean;
};

const DUMMY_COMPANIES: Company[] = [
  {
    id: "1",
    logo: "—",
    accountNumber: "ACC-001",
    name: "Alpha Logistics Ltd",
    email: "info@alpha.com",
    phone: "+254700000001",
    address: "Nairobi",
    contactPerson: "John Mwangi",
    isActive: true,
  },
  {
    id: "2",
    logo: "—",
    accountNumber: "ACC-002",
    name: "Beta Solutions",
    email: "contact@beta.co.ke",
    phone: "+254700000002",
    address: "Mombasa",
    contactPerson: "Mary Wanjiku",
    isActive: false,
  },
  {
    id: "3",
    logo: "—",
    accountNumber: "ACC-003",
    name: "Gamma Enterprises",
    email: "hello@gamma.io",
    phone: "+254700000003",
    address: "Kisumu",
    contactPerson: "Peter Otieno",
    isActive: true,
  },
];

const CompanyPage = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCompanies = useMemo(() => {
    return DUMMY_COMPANIES.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

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
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.slice(0, entries).map((company, idx) => (
                  <TableRow key={company.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{company.logo}</TableCell>
                    <TableCell>{company.accountNumber}</TableCell>
                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.contactPerson}</TableCell>
                    <TableCell>
                      {company.isActive ? "Active" : "Inactive"}
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
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(entries, filteredCompanies.length)} of{" "}
            {filteredCompanies.length} entries
          </p>

          <EntriesPerPage value={entries} onChange={setEntries} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyPage;
