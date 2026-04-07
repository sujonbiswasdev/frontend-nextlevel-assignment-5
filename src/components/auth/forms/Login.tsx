"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/authClient";
import { loginZodSchema } from "@/validations/auth.validation";
import { loginUserAction, loginWithGoogleAction } from "@/actions/auth.actions";
import { forgotPasswordEmailOtpAction } from "@/actions/auth.actions";
import { useState } from "react";
import { FormInput } from "@/components/ui/frominput";
import Link from "next/link";

export function SigninForm() {
  const router = useRouter();
  const [email, setemail] = useState("");

  const handleForgetPassword = async (email: string) => {
    if (!email) {
      toast.error("Please enter your email first.", { theme: "dark" });
      return { success: false };
    }

    try {
      const toastId = toast.loading("Sending reset OTP...");
      const res = await forgotPasswordEmailOtpAction({ email });
      toast.dismiss(toastId);

      if (res.success) {
        toast.success(res.message || "Password reset OTP sent!", {
          theme: "dark",
        });
        alert("You have only 4 minutes to validate the OTP sent to your email.");
        return { success: true };
      } else {
        toast.error(res.message || "Failed to send OTP.", { theme: "dark" });
        return { success: false };
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.", { theme: "dark" });
      return { success: false };
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginZodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        const res = await loginUserAction(value);
        if (!res.success) {
          toast.dismiss(toastId);
          toast.error(res.message || "Login failed", { theme: "dark" });
          return;
        }
        router.refresh();
        toast.dismiss(toastId);
        toast.success(res.message || "User logged in successfully!", {
          theme: "dark",
        });
        router.push("/dashboard");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong, please try again.");
      }
    },
  });
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted py-1 px-2 sm:px-0">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white dark:bg-gray-900 transition-all sm:rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex flex-col gap-1 mb-0.5">
            <Link
              href="/"
              className="inline-block text-sm text-blue-600 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
          <CardTitle className="text-2xl font-semibold mb-0.5">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Please sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signin-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="Z"
          >
            <FieldGroup>
              {/* Email Field */}
              <form.Field
                name="email"
                validators={{ onChange: loginZodSchema.shape.email }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="">
                      <FieldLabel htmlFor={field.name} className=" text-sm font-medium">
                        Email
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          setemail(e.target.value);
                        }}
                        placeholder="Enter your email"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="block w-full"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="mt-0.5"
                        />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                validators={{ onChange: loginZodSchema.shape.password }}
                children={(field) => {
                  const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="">
                    <div className="flex items-center justify-between ">
                      <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Password
                      </FieldLabel>
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        onClick={async () => {
                          if (!email) {
                            toast.error("Please enter your email first.", {
                              theme: "dark",
                            });
                            return;
                          }
                          const res = await handleForgetPassword(email);
                          if (res?.success) {
                            const encodedEmail = encodeURIComponent(email);
                            router.push(`/reset-password?email=${encodedEmail}`);
                          }
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormInput
                      field={field}
                      isPassword
                      className=""
                    />  </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-1 items-center">
          <div className="text-sm text-center w-full mb-0.5">
            Don't have an account?{" "}
            <a
              className="text-blue-500 dark:text-blue-400 hover:underline cursor-pointer transition"
              href="/register"
            >
              Sign up
            </a>
          </div>
          <div className="flex w-full gap-1 mt-0.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="signin-form"
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
