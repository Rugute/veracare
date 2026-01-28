"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  UploadCloud,
  X,
  ArrowLeftCircle,
} from "lucide-react";
import { useTransition } from "react";
import { UseCreateRole } from "../Api/ApiClient";
import {
  CorporateProfileInputType,
  CorporateProfileSchema,
} from "../Validation/Schema";
import { useRouter } from "next/navigation";

const CreateCompanyForm = () => {
  const [isPending, startTransistion] = useTransition();
  const router = useRouter();

  const { mutate } = UseCreateRole();

  const form = useForm<CorporateProfileInputType>({
    resolver: zodResolver(CorporateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      code: "",
      phone: "",
      location: "",
      address: "",
      status: "pending",
      file: undefined,
    },
  });

  const handleSubmit = async (data: CorporateProfileInputType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("code", data.code);
    formData.append("phone", data.phone);
    formData.append("location", data.location);
    formData.append("address", data.address);
    formData.append("status", data.status || "pending");

    if (data.file) {
      formData.append("file", data.file);
    }

    startTransistion(() => {
      mutate(formData, {
        onSuccess: () => router.push("/roles"),
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-full shadow-lg border-2">
        <CardHeader className="space-y-2 pb-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Building2 className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Role 
            <div>
              <Button
                variant={"ghost"}
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                <ArrowLeftCircle /> Back
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-base">
            Register your organization to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Company Information
                </h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter company name"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Company Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter license number"
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Your business registration or license number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
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
                            placeholder="company@example.com"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
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
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Location Information
                </h3>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        City/Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Nairobi, Kenya"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter complete business address including street, building, and postal code"
                          className="resize-none min-h-20"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Registration Document
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
                      <FormDescription>
                        Upload your business registration certificate or license
                        document
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 text-sm font-semibold"
              >
                {isPending ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    <Building2 className="h-4 w-4 mr-2" />
                    Create Company Profile
                  </>
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-muted-foreground pt-2">
            By creating a company profile, you agree to our{" "}
            <Button asChild variant="link" className="px-0 h-auto text-xs">
              <a href="/terms">Terms of Service</a>
            </Button>{" "}
            and{" "}
            <Button asChild variant="link" className="px-0 h-auto text-xs">
              <a href="/privacy">Privacy Policy</a>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCompanyForm;
