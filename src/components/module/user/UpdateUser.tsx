"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
// Note: We will *not* use a required validation schema for onSubmit/onChange (all fields optional).
import { updateUserByAdminAction } from "@/actions/user.actions";
import { IBaseUser } from "@/types/user.types";
import { useRouter } from "next/navigation";

export function UpdateUserForm({
  id,
  onSuccess,
  defaultValues,
}: {
  id: string;
  onSuccess:any,
  defaultValues?: Partial<IBaseUser>;
}) {
  const router=useRouter()
  const form = useForm({
    defaultValues: {
      email: "",
      role: "",
      status: "",
      ...(defaultValues || {}),
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating user...");
      try {

        const filtered = Object.fromEntries(
          Object.entries(value).filter(
            ([, v]) =>
              v !== undefined &&
              v !== null &&
              v !== "" 
          )
        );
        const res = await updateUserByAdminAction(id, filtered);

        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(res.message || "Failed to update user. Please check your inputs and try again.");
          return;
        }
        router.refresh()
        onSuccess(false)
        toast.success(res.message || "User updated successfully!");
     
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Update User</CardTitle>
        <CardDescription className="text-center">Change user role, status, or email. All fields are optional.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-user-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <input
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter email"
                    className="w-full border rounded p-2"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="role">
              {(field) => (
                <Field>
                  <FieldLabel>Role</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Role (optional)</option>
                    {['USER', 'ADMIN'].map((r: string) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status (optional)</option>
                    {['ACTIVE', 'BLOCKED', 'DELETED', "INACTIVE"].map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="update-user-form">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}