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
import { updateParticipant } from "@/actions/participant.actions";
import { Participantstatus, PaymentStatus, UpdateParticipantInput, UpdateParticipantSchema } from "@/validations/participant.validation";

export function UpdateParticipantForm({
  id,
  role,
  onSuccess,
}: {
  id: string;
  role: string;
  onSuccess: (updated: any) => void;
}) {
  console.log(id,'id')
  const form = useForm({
    defaultValues: { status: "PENDING", // Enum default value
      paymentStatus: "UNPAID",},
    validators: { onSubmit: UpdateParticipantSchema as any },
    onSubmit: async ({ value }) => {
      console.log(value, 'va');
      const toastId = toast.loading("Saving participant update... Please wait.");
      try {
        const res = await updateParticipant(id, value as UpdateParticipantInput);
        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(res.message || "Failed to update participant. Please check your inputs and try again.");
          return;
        }
        toast.success(res.message || "Participant updated successfully!");
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
        <CardTitle className="text-center">Update Participant</CardTitle>
        <CardDescription className="text-center">Manage participant status</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="update-form" 
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        >
          <FieldGroup>
            <form.Field
              name="status"
              validators={{ onChange: UpdateParticipantSchema.shape.status as any }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="BANNED">BANNED</option>
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {role === "ADMIN" && (
              <form.Field
                name="paymentStatus"
                validators={{ onChange: UpdateParticipantSchema.shape.paymentStatus as any }}
              >
                {(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel>Payment Status</FieldLabel>
                    <select
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full border rounded p-2"
                    >
                      <option value="">Select Payment</option>
                      {PaymentStatus.options.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            )}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
        <Button type="submit" form="update-form">Update</Button>
      </CardFooter>
    </Card>
  );
}