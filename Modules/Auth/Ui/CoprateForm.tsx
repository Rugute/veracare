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
import { Loader2Icon, UserPlus, Building2, GraduationCap, Shield, CheckCircle2, Users } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M35 25h10v10h10v10h-10v10h-10v-10h-10v-10h10z" fill="currentColor" className="text-purple-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-cross)"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30 mb-4">
            <Building2 className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            VeraCare Health Academy
          </h1>
          <p className="text-sm text-gray-600">Corporate Training Programs</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-6 border-b border-gray-100">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Building2 className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <UserPlus className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">
                Corporate Registration
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 leading-relaxed">
                Join your organization's healthcare training program
              </CardDescription>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-2 border-purple-100">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Organization
                  </p>
                  <p className="text-base font-bold text-gray-900 truncate">
                    {name}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-purple-100">
              <div className="flex flex-col items-center text-center gap-1">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-semibold text-gray-700">Team Access</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-semibold text-gray-700">Bulk Pricing</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-semibold text-gray-700">Analytics</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Complete your registration to access corporate training features
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200" 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Work Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Date of Birth</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="date" 
                          className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200" 
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder="Create password"
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder="Confirm password"
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2 space-y-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/30 transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                        Creating Corporate Account...
                      </>
                    ) : (
                      <>
                        <Building2 className="mr-2 h-5 w-5" />
                        Create Corporate Account
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
                    >
                      Sign in here
                    </Link>
                  </div>

                  <div className="text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <Shield className="h-4 w-4 inline mr-1.5 text-purple-600" />
                    This account will be associated with <strong>{name}</strong>
                  </div>
                </div>
              </form>
            </Form>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-purple-600" />
                  <span>Enterprise Security</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-purple-600" />
                  <span>Corporate Training</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-600 mt-6">
          Corporate account questions?{" "}
          <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200">
            Contact Corporate Support
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

export default CorporateSignUpForm;