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

// InvitationStatus enum (aigula takbe)
enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

import { z } from "zod";
import { updateInvitationSchema } from "@/validations/invitation.validation";
import { updateInvitationStatusAction } from "@/actions/invitation.actions";
import { useRouter } from "next/navigation";

// Use only the defined schema from validations (remove message, as backend and zod don't allow it)
const UpdateInvitationSchema = updateInvitationSchema;
type UpdateInvitationInput = z.infer<typeof updateInvitationSchema>;

export function UpdateInvitationForm({
  id,
  defaultValues,
  onSuccess,
}: {
  id: string;
  defaultValues?: Partial<UpdateInvitationInput>;
  onSuccess: (updated: any) => void;
}) {
  const router=useRouter()
  const form = useForm({
    defaultValues: {
      status: defaultValues?.status || "PENDING",
    },
    validators: { onSubmit: UpdateInvitationSchema as any },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving invitation update... Please wait.");
      try {
        const res = await updateInvitationStatusAction({ id, status: value.status as any });
        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(res.message || "Failed to update invitation. Please check your inputs and try again.");
          return;
        }
        router.refresh()
        toast.success(res.message || "Invitation updated successfully!");
        onSuccess(res.data);
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Update Invitation</CardTitle>
        <CardDescription className="text-center">
          Manage invitation status
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="update-invitation-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="status"
              validators={{ onChange: UpdateInvitationSchema.shape.status as any }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={e =>
                      field.handleChange(
                        e.target.value as "PENDING" | "ACCEPTED" | "DECLINED"
                      )
                    }
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status</option>
                    <option value={InvitationStatus.PENDING}>PENDING</option>
                    <option value={InvitationStatus.ACCEPTED}>ACCEPTED</option>
                    <option value={InvitationStatus.DECLINED}>DECLINED</option>
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                  <div className="text-xs text-muted-foreground mt-1">
                    Only ACCEPTED or DECLINED will update status.
                  </div>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit" form="update-invitation-form">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}