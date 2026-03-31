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
import { useState } from "react";
import { FormInput } from "@/components/ui/frominput";
import { changePasswordAction } from "@/actions/auth.actions";

// Simple Zod validator for password fields.
import { z } from "zod";
const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password is required"),
});

export function ChangePasswordForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    validators: {
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Changing password...");
      try {
        const res = await changePasswordAction({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        });
        toast.dismiss(toastId);

        if (!res.success) {
          toast.error(res.message || "Failed to change password.", {
            theme: "dark",
          });
          return;
        }

        toast.success(res.message || "Password changed successfully!", {
          theme: "dark",
        });
        form.reset();
      } catch (error: any) {
        toast.dismiss(toastId);
        toast.error(
          error?.message || "Something went wrong. Please try again.",
          { theme: "dark" }
        );
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="mx-auto">Change Password</CardTitle>
        <CardDescription className="mx-auto">
          Enter your current password and your new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="change-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Current Password Field */}
            <form.Field
              name="currentPassword"
              validators={{
                onChange: changePasswordSchema.shape.currentPassword,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <>
                    <FormInput
                      field={field}
                      label="Current Password"
                      isPassword
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </>
                );
              }}
            </form.Field>
            {/* New Password Field */}
            <form.Field
              name="newPassword"
              validators={{
                onChange: changePasswordSchema.shape.newPassword,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <>
                    <FormInput
                      field={field}
                      label="New Password"
                      isPassword
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mx-auto">
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="change-password-form">
            Change Password
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
