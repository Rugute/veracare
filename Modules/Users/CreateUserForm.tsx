"use client";

import { useForm } from "react-hook-form";
import { CreateUserSchema, CreateUserSchemaType } from "./Validations/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  UserPlus,
  Mail,
  Phone,
  User,
  Building2,
  Shield,
  FileText,
  X,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";

const GENDER_OPTIONS = [
  { value: "MALE", label: "MALE" },
  { value: "FEMALE", label: "FEMALE" },
];

const ROLE_OPTIONS = [
  { value: "ADMIN", label: "ADMINISTRATOR" },
  { value: "STUDENT", label: "STUDENT" },
  { value: "INSTRUCTOR", label: "INSTRUCTOR" },
];

const ACCOUNT_TYPES = [
  { value: "INDIVIDUAL", label: "INDIVIDUAL" },
  { value: "COPORATE", label: "COPORATE" },
];

const CreateUserForm = () => {
  const router = useRouter();
  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      file: undefined,
      firstName: "",
      gender: "",
      organization: "",
      otherNames: "",
      phone: "",
      role: "",
      userName: "",
      accountType: "",
    },
  });

  const handleSubmit = async (data: CreateUserSchemaType) => {
    const formData = new FormData();

    //     firstName,
    // lastName,
    // phone,
    // gender,
    // email,
    // password,
    // companyid,
    // dob,

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.otherNames || "");
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("email", data.email);
    formData.append("password", "");
    formData.append("dob", "");

    console.log(data);
    router.push("/users");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-full shadow-lg border-2">
        <CardHeader className="space-y-2 pb-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <UserPlus className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create New User
          </CardTitle>
          <Button variant={"ghost"} onClick={() => router.back()}>
            Back
          </Button>
          <CardDescription className="text-base">
            Add a new user to your organization
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="otherNames"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Other Names
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Doe"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="userName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="johndoe"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GENDER_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john.doe@example.com"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="0712 345 678"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Organization & Role */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Organization Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="organization"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          Organization
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Company name"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="role"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          Role
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ROLE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="accountType"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          Account Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ACCOUNT_TYPES.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Profile Picture Upload */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Profile Picture
                </h3>

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Document</FormLabel>
                      <FormControl>
                        <div className="group relative mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-6 transition-colors hover:bg-muted/80">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              field.onChange(file);
                            }}
                          />
                          <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            {field.value ? (
                              <div className="flex flex-col items-center gap-2">
                                {field.value.type.startsWith("image/") ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={URL.createObjectURL(field.value)}
                                    alt="Preview"
                                    className="h-20 w-20 rounded-md object-cover shadow-sm"
                                  />
                                ) : (
                                  <FileText className="h-10 w-10 text-primary" />
                                )}
                                <p className="text-sm font-medium text-foreground">
                                  {field.value.name}
                                </p>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    field.onChange(null);
                                  }}
                                >
                                  <X className="mr-1 h-3 w-3" /> Remove
                                </Button>
                              </div>
                            ) : (
                              <>
                                <div className="rounded-full bg-background p-3 shadow-sm ring-1 ring-muted-foreground/10">
                                  <UploadCloud className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">
                                    Click to upload or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    PNG, JPG or PDF (max. 5MB)
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-sm font-semibold"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create User Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserForm;
