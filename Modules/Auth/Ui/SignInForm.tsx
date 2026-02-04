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
import { Building2, Loader2Icon, User, Shield, GraduationCap } from "lucide-react";
import { UseAuthSignIn, UseCoprateSignUp } from "../Api/ApiClient";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [corporateNumber, setCorporateNumber] = useState("");
  const [isLoading, startTransistion] = useTransition();

  const { mutate } = UseAuthSignIn();
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = (data: SignInSchemaType) => {
    startTransistion(() => {
      mutate(data, {
        onSuccess: () => router.push("/dashboard"),
      });
    });
  };

  const { refetch } = UseCoprateSignUp(corporateNumber);

  const handleCorporateSignUp = async () => {
    if (!corporateNumber.trim()) return;
    const result = await refetch();

    if (result.data) {
      router.push(
        `/sign-up/${result.data.id}?name=${encodeURIComponent(result.data.name)}`,
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Medical Cross Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M35 25h10v10h10v10h-10v10h-10v-10h-10v-10h10z" fill="currentColor" className="text-sky-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-cross)"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/30 mb-4">
            <GraduationCap className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            VeraCare Health Academy
          </h1>
          <p className="text-sm text-gray-600">Excellence in Clinical Education</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6 text-center border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 leading-relaxed">
              Sign in to continue your learning journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="h-11 border-gray-300 focus:border-sky-500 focus:ring-sky-500 transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Password
                        </FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-sky-600 hover:text-sky-700 hover:underline font-medium transition-colors duration-200"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="Enter your password"
                          className="h-11 border-gray-300 focus:border-sky-500 focus:ring-sky-500 transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-lg shadow-sky-500/30 transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Sign In Securely
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">
                  New to VeraCare?
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-center text-gray-600 font-medium">
                Create your account
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="h-11 border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-all duration-200"
                >
                  <Link href="/sign-up" className="gap-2 font-semibold text-sky-700">
                    <User className="h-4 w-4" />
                    Individual
                  </Link>
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="default"
                      className="h-11 gap-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 font-semibold text-blue-700 transition-all duration-200"
                    >
                      <Building2 className="h-4 w-4" />
                      Corporate
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 p-5 shadow-xl border-2 border-gray-100" align="end">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="font-bold text-sm text-gray-900">
                            Corporate Account
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Enter your corporate number to create an organization account with team management features
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                          Corporate Number
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter corp #"
                            value={corporateNumber}
                            onChange={(e) => setCorporateNumber(e.target.value)}
                            className="h-10 text-sm border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                          />
                          <Button
                            size="default"
                            className="h-10 px-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 font-semibold"
                            onClick={handleCorporateSignUp}
                            disabled={!corporateNumber.trim()}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-sky-600" />
                  <span>Secure Login</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-sky-600" />
                  <span>Accredited Courses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Need help?{" "}
          <Link href="/contact" className="text-sky-600 hover:text-sky-700 font-semibold hover:underline transition-colors duration-200">
            Contact Support
          </Link>
        </p>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SignInForm;