"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/Modules/Utils/PasswordInput";
import { Button } from "@/components/ui/button";
import { SignUpSchema, SignUpSchemaType } from "../Validations/AuthSchema";
import Link from "next/link";
import { Loader2Icon, UserPlus, Building } from "lucide-react";
import { useTransition } from "react";
import { useAuthSignUp } from "../Api/ApiClient";
import { useRouter } from "next/navigation";

const CorporateSignUpForm = ({ id, name }: { id: string; name: string }) => {
  const [isPending, startTransition] = useTransition();
  const { mutate } = useAuthSignUp();
  const router = useRouter();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: SignUpSchemaType) => {
    startTransition(() => {
      mutate(
        { formData: data, corporateId: id },
        {
          onSuccess: () => router.push("/sign-in"),
        },
      );
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-xl shadow-lg border-2">
        <CardHeader className="space-y-2 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building className="h-5 w-5 text-muted-foreground" />
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Corporate Registration
          </CardTitle>
          <CardDescription>Register through your organization</CardDescription>

          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Organization Name: </span>
              <code className="ml-2 px-2 py-1 bg-background border rounded font-mono">
                {name}
              </code>
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              Fill in your details to complete the corporate registration
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John" className="h-9" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Doe" className="h-9" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0712..."
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="******"
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="******"
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-10"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Creating Corporate Account...
                    </>
                  ) : (
                    "Create Corporate Account"
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?
                  <Link
                    href="/sign-in"
                    className="ml-1 text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </div>

                <div className="mt-2 text-center text-xs text-muted-foreground">
                  This account will be associated with your organization
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateSignUpForm;
