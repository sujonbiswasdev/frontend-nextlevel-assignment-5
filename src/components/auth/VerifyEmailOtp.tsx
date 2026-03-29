"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";

import { useForm } from "@tanstack/react-form";
import { passwordSchema } from "@/validations/auth.validation";

import {
  forgotPasswordEmailOtpAction,
  resendVerificationCodeAction,
  resetPasswordAction,
  verifyEmailAction,
} from "@/actions/auth.actions";

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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import Link from "next/link";
import { FormInput } from "../ui/frominput";

function VerifyOtp({
  type,
}: {
  type: "email-verification" | "forget-password";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm({
    defaultValues: { password: "" },
    validators: { onSubmit: passwordSchema },
  });

  // ------------------ OTP Change ------------------
  const handleOtpChange = (value: string) => {
    if (value.length <= 6) setOtp(value);
  };

  // ------------------ Submit ------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required", { theme: "dark" });
      return;
    }

    if (otp.length !== 6) {
      toast.error("Enter 6-digit OTP", { theme: "dark" });
      return;
    }

    setLoading(true);

    try {
      if (type === "email-verification") {
      const toastID = toast.loading("Verifying...", { theme: "dark" });
      const res = await verifyEmailAction({ email, otp });
      if (res.success) {
        toast.dismiss(toastID)
        setResending(false);
        toast.success(res.message || "Email verified successfully!", { theme: "dark" });
        router.push("/login");
      } else {
        toast.dismiss(toastID);
        toast.error(res.message || "Verification failed", { theme: "dark" });
      }
      }

      if (type === "forget-password") {
      const toastID = toast.loading("Resetting password...", { theme: "dark" });
      const res = await resetPasswordAction({
        email,
        otp,
        newPassword: form.state.values.password,
      });
      if (res.success) {
        toast.dismiss(toastID)
        setSuccess(true);
        setResending(false);
        toast.success(res.message || "Password reset successfully!", { theme: "dark" });
        router.push("/login");
      } else {
        toast.dismiss(toastID);
        toast.error(res.message || "Password reset failed", { theme: "dark" });
      }
      }
    } catch {
      toast.error("Something went wrong", { theme: "dark" });
    }

    setLoading(false);
  };

  const handleEmailVerification = async () => {

    try {
      if (type === "email-verification") {
      setResending(true);
      try {
        const toastID = toast.loading("Verifying...", { theme: "dark" });
        const res = await verifyEmailAction({ email, otp });
        if (res.success) {
          alert("The OTP is valid for only 4 minutes. Please check your email.");
          toast.dismiss(toastID)
          toast.success(res.message || "Email verified successfully!", { theme: "dark" });
          setSuccess(true);
          setResending(false);
          router.push("/login");
        } else {
          toast.dismiss(toastID)
          toast.error(res.message || "Verification failed", { theme: "dark" });
        }
      } catch (error) {
        toast.error("Something went wrong during verification", { theme: "dark" });
      }
   
      }

      if (type === "forget-password") {
     const toastID= toast.loading("Resending OTP...", { theme: "dark" });
      setResending(true);
      try {
        const res = await forgotPasswordEmailOtpAction({ email });
        if (res.success) {
          alert("The OTP is valid for only 4 minutes. Please check your email.");
          toast.dismiss(toastID)

          toast.success(res.message || "OTP resent successfully!", { theme: "dark" });
          setSuccess(true);
          setResending(false);
          return
        } else {
          toast.dismiss(toastID)
          toast.error(res.message || "Failed to resend OTP", { theme: "dark" });
          
        }
      } catch (error) {
        toast.error("Something went wrong during OTP resend", { theme: "dark" });
      }
      }
    } catch {
      toast.error("Something went wrong", { theme: "dark" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Code sent to:{" "}
            <span className="font-medium break-all">
              {email || "your email"}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Field>
            <div className="flex justify-between items-center">
              <FieldLabel>Verification code</FieldLabel>

              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={handleEmailVerification}
                disabled={resending}
              >
                <RefreshCwIcon
                  className={resending ? "animate-spin" : ""}
                />
                {resending ? "Resending..." : "Resend"}
              </Button>
            </div>

            {/* OTP Input */}
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {/* Password Field */}
            {type === "forget-password" && (
              <div className="mt-4">
                <FieldGroup>
                  <form.Field
                   validators={{ onChange: passwordSchema.shape.password }}
                    name="password"
                    children={(field) => (
                      <FormInput
                        field={field}
                        label="Password"
                        isPassword
                      />
                    )}
                  />
                </FieldGroup>
              </div>
            )}

            <FieldDescription>
              <a href="#">No access to email?</a>
            </FieldDescription>
          </Field>
        </CardContent>

        <CardFooter>
          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading
                ? "Processing..."
                : success
                ? "Done"
                : "Verify"}
            </Button>

            <div className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link href="/contact" className="underline">
                Contact support
              </Link>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}

export default VerifyOtp;