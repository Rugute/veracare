"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaType } from "../Validations/AuthSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { useState } from "react";

const SignInForm = () => {
  const [coprateNumber, setCoprateNumber] = useState("");
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: SignInSchemaType) => {
    console.log(data);
  };

  const handleCoprateSignIn = () => {
    console.log(coprateNumber);
  };

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

        <CardContent className="space-y-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wider">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@example.com"
                        autoComplete="email"
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
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wider">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder="••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-6 text-sm font-semibold uppercase tracking-widest"
              >
                Sign in
              </Button>
            </form>
          </Form>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-center">
              <span className="mr-1">Don’t have an account?</span>
              <Button asChild variant="link" className="px-1">
                <Link href="/sign-up">Sign up as an individual</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Sign up as a corporate</Button>
                </PopoverTrigger>

                <PopoverContent className="space-y-3 w-72">
                  <Input
                    placeholder="Enter your corporate number"
                    type="text"
                    value={coprateNumber}
                    onChange={(e) => setCoprateNumber(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    type="button"
                    onClick={handleCoprateSignIn}
                  >
                    Submit
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
