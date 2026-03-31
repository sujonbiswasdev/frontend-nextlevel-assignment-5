'use client'
import React from 'react'
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
import { updateReview } from "@/actions/review.actions";
import { z } from "zod";
import { useRouter } from 'next/navigation';

const UpdateReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .optional(),
  comment: z.string().optional(),
});
type UpdateReviewInput = z.infer<typeof UpdateReviewSchema>;

export function UpdateReviewContent({
  reviewId,
  defaultValues,
  onSuccess
}: {
  reviewId: string;
  defaultValues?: Partial<UpdateReviewInput>;
  onSuccess: (updated: any) => void;
}) {
    const router=useRouter()
  const form = useForm({
    defaultValues: {
      rating: defaultValues?.rating,
      comment: defaultValues?.comment || "",
    },
    validators: { onSubmit: UpdateReviewSchema as any },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving review changes... Please wait.");
      try {
        const res = await updateReview(reviewId, value as UpdateReviewInput);
        onSuccess(res.data)
        router.refresh()
        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(res.message || "Failed to update review. Please try again.");
          return;
        }
        toast.success(res.message || "Review updated successfully!");
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
        <CardTitle className="text-center">Update Review</CardTitle>
        <CardDescription className="text-center">Edit your review rating and comment</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-review-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="rating"
              validators={{
                onChange: UpdateReviewSchema.shape.rating as any,
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Rating</FieldLabel>
                  <select
                    value={field.state.value ?? ""}
                    onChange={e => field.handleChange(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="comment"
              validators={{
                onChange: UpdateReviewSchema.shape.comment as any,
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Comment</FieldLabel>
                  <textarea
                    value={field.state.value || ""}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2 h-24 resize-none"
                    placeholder="Enter your review comment (optional)"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
        <Button type="submit" form="update-review-form">Update</Button>
      </CardFooter>
    </Card>
  );
}

export default UpdateReviewContent;