"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaType } from "../Validations/AuthSchema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { Building2, Loader2Icon, User } from "lucide-react";
import { UseAuthSignIn } from "../Api/ApiClient";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [corporateNumber, setCorporateNumber] = useState("");
  const [isLoading, startTransistion] = useTransition();
  const router = useRouter();
  const { mutateAsync } = UseAuthSignIn();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = (data: SignInSchemaType) => {
    startTransistion(async () => {
      await mutateAsync(data, {
        onSuccess: () => router.push("/"),
      });
    });
  };
  const handleCorporateSignIn = () => console.log(corporateNumber);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Sign in
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@example.com"
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Enter password"
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-9 text-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2Icon className="mr-2 h-4 w-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                New here?
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" size="sm" className="w-full h-9">
              <Link href="/sign-up" className="gap-2">
                <User className="h-3.5 w-3.5" /> Individual
              </Link>
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 gap-2"
                >
                  <Building2 className="h-3.5 w-3.5" /> Corporate
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-3" align="end">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-xs">Corporate Account</h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Enter corporate number to create organization account
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Corp #"
                      value={corporateNumber}
                      onChange={(e) => setCorporateNumber(e.target.value)}
                      className="h-8 text-xs"
                    />
                    <Button
                      size="sm"
                      className="h-8"
                      onClick={handleCorporateSignIn}
                      disabled={!corporateNumber.trim()}
                    >
                      Go
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
