"use client";
import { useStore } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { registerUserAction } from "@/actions/auth.actions";
import { UserCreateInput } from "@/types/auth.types";
import { createUserSchema } from "@/validations/auth.validation";
import { FormInput } from "@/components/ui/frominput";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      image: "",
    },
    validators: {
      onSubmit: createUserSchema as any,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("user creating.........");
      try {
        const result = await registerUserAction(value as UserCreateInput);
        if (!result.success) {
          toast.dismiss(toastId);
          toast.error(result.message || "user registration failed");
          return;
        }
        toast.dismiss(toastId);
        alert(result.message || "user signup successfully");
        toast.success("user signup successfully ");
        router.push(`/verify-email?email=${value.email}`);
      } catch (error: any) {
        toast.dismiss(toastId);
        toast.error("Something went wrong . please try again ", error.message);
      }
    },
  });
  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <div className="mb-3">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
        <CardTitle className="text-center text-2xl font-bold">
          Create a New Account
        </CardTitle>
          <div className="flex justify-center mt-2">
            <span className="h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-fuchsia-500 to-emerald-400 opacity-70 animate-pulse"></span>
          </div>
      </CardHeader>
      <CardContent>
        <form
          id="bug-report-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              validators={{ onChange: createUserSchema.shape.name }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Please enter your name"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="email"
              validators={{ onChange: createUserSchema.shape.email }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your email"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              validators={{ onChange: createUserSchema.shape.password }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FormInput field={field} label="Password" isPassword onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your password"
                      name={field.name}
                      value={field.state.value}
                      autoComplete="off"/>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="image"
              validators={{ onChange: createUserSchema.shape.image as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your image"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="phone"
              validators={{ onChange: createUserSchema.shape.phone as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your phone number"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      
      <CardFooter className=" flex flex-col space-y-3 justify-center items-center">
      <Link
            href="/login"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        <Field orientation="horizontal" className="flex items-center justify-center">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
