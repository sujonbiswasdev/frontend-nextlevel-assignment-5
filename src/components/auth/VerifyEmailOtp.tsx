"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

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
  email:emailaddress,
  type,
}: {
  email?:string |undefined,
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

    const emailVerifiy=email || emailaddress

    if (!emailVerifiy) {
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
        try {
          const res = await verifyEmailAction({ email: email || emailaddress as string, otp });
     
          if (res.success) {
            toast.dismiss(toastID);
            setResending(false);
            toast.success(
              res.message || "Email verified successfully!",
              { theme: "dark" }
            );
            router.push("/login");
          } else {
            toast.dismiss(toastID);

            // Show user-friendly OTP invalid message
            if (
              res.message &&
              (res.message.toLowerCase().includes("invalid") ||
                res.message.toLowerCase().includes("incorrect"))
            ) {
              toast.error(
                "The verification code you entered is incorrect or expired. Please check your email and try again.",
                { theme: "dark" }
              );
            } else {
              toast.error(
                res.message || "Verification failed. Please check the code and try again.",
                { theme: "dark" }
              );
            }
          }
        } catch (err: any) {
          toast.dismiss();
          // If response has an explicit invalid OTP indication, show detailed message
          const rawMsg =
            err?.response?.data?.message ||
            err?.body?.message ||
            err?.message ||
            "";
          if (
            rawMsg &&
            (rawMsg.toLowerCase().includes("invalid") ||
              rawMsg.toLowerCase().includes("incorrect"))
          ) {
            toast.error(
              "The verification code you entered is incorrect or expired. Please check your email and try again.",
              { theme: "dark" }
            );
          } else {
            toast.error(
              rawMsg || "Verification failed. Please try again.",
              { theme: "dark" }
            );
          }
        }
      }

      if (type === "forget-password") {
        const toastID = toast.loading("Resetting password...", { theme: "dark" });
        try {
          const res = await resetPasswordAction({
            email,
            otp,
            newPassword: form.state.values.password,
          });
          if (res.success) {
            toast.dismiss(toastID);
            setSuccess(true);
            setResending(false);
            toast.success(
              res.message || "Password reset successfully!",
              { theme: "dark" }
            );
            router.push("/login");
          } else {
            toast.dismiss(toastID);
            if (
              res.message &&
              (res.message.toLowerCase().includes("invalid") ||
                res.message.toLowerCase().includes("incorrect"))
            ) {
              toast.error(
                "The OTP you entered is incorrect or expired. Please check your email and try again.",
                { theme: "dark" }
              );
            } else {
              toast.error(
                res.message || "Password reset failed. Please check the code and try again.",
                { theme: "dark" }
              );
            }
          }
        } catch (err: any) {
          toast.dismiss();
          const rawMsg =
            err?.response?.data?.message ||
            err?.body?.message ||
            err?.message ||
            "";
          if (
            rawMsg &&
            (rawMsg.toLowerCase().includes("invalid") ||
              rawMsg.toLowerCase().includes("incorrect"))
          ) {
            toast.error(
              "The OTP you entered is incorrect or expired. Please check your email and try again.",
              { theme: "dark" }
            );
          } else {
            toast.error(
              rawMsg || "Password reset failed. Please try again.",
              { theme: "dark" }
            );
          }
        }
      }
    } catch {
      toast.error("Something went wrong", { theme: "dark" });
    }

    setLoading(false);
  };

  const handleEmailVerification = async () => {
    // Fix: Use the correct resend endpoints, don't try to verify OTP for "email-verification" on resend,
    // instead call resendVerificationCodeAction for email-verification and forgotPasswordEmailOtpAction for forget-password.
    try {
      setResending(true);
      if (type === "email-verification") {
        const toastID = toast.loading("Resending verification code...", { theme: "dark" });
        try {
          // Call the correct resend API for email-verification
          const res = await resendVerificationCodeAction({ email:email || emailaddress as string });
          if (res.success) {
            alert("The OTP is valid for only 10 minutes. Please check your email.");
            toast.dismiss(toastID);
            toast.success(res.message || "Verification code resent successfully!", { theme: "dark" });
            setSuccess(true);
          } else {
            toast.dismiss(toastID);
            toast.error(res.message || "Failed to resend verification code", { theme: "dark" });
          }
        } catch (error: any) {
          toast.dismiss();
          // Try to extract error code/message for known API errors:
          const errorMessage =
            (error && error.body && error.body.message) ||
            error?.message ||
            "Something went wrong during code resend";
          toast.error(errorMessage, { theme: "dark" });
        }
        setResending(false);
      }

      if (type === "forget-password") {
        const toastID = toast.loading("Resending OTP...", { theme: "dark" });
        try {
          // Call the correct resend API for forgot password flow
          const res = await forgotPasswordEmailOtpAction({ email });
          if (res.success) {
            alert("The OTP is valid for only 10 minutes. Please check your email.");
            toast.dismiss(toastID);
            toast.success(res.message || "OTP resent successfully!", { theme: "dark" });
            setSuccess(true);
          } else {
            toast.dismiss(toastID);
            toast.error(res.message || "Failed to resend OTP", { theme: "dark" });
          }
        } catch (error: any) {
          toast.dismiss();
          const errorMessage =
            (error && error.body && error.body.message) ||
            error?.message ||
            "Something went wrong during OTP resend";
          toast.error(errorMessage, { theme: "dark" });
        }
        setResending(false);
      }
    } catch {
      toast.error("Something went wrong", { theme: "dark" });
      setResending(false);
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
              {email || emailaddress || "your email"}
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