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

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { CreateEventSchema } from "@/validations/event.validation";
import { createEvent } from "@/actions/event.actions";
import { FormInput } from "@/components/ui/frominput";
import { Input } from "@/components/ui/input";
import { EventArr } from "@/types/event.types";

export function CreateEvent() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      image: "",
      visibility: "PUBLIC",
      priceType: "FREE",
      status:'',
      categories: "", // Or set to a default category as needed, e.g. eventcategoryArr[0]
      fee: null,
    },
    validators: {
      onSubmit: CreateEventSchema as any,
    },
    onSubmit: async ({ value }) => {
      console.log("fjkjfsdjfsdf");
      console.log(value, "valuedata");
      const toastId = toast.loading("Creating event, please wait...");
      try {
        const result = await createEvent(value as any);
        toast.dismiss(toastId);
        if (result.success !== true) {
          toast.error(
            result.message ? result.message : "Event creation failed"
          );
          return;
        }
        toast.success("Event created successfully!");
        toast.info("Please wait 60 seconds before creating another event.",{autoClose:4000});
      } catch (error: any) {
        toast.dismiss(toastId);
        toast.error(
          "Something went wrong. Please try again." +
            (error?.message ? ` (${error.message})` : ""),
        );
      }
    },
  });
  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>create a new user</CardTitle>
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
              name="title"
              validators={{ onChange: CreateEventSchema.shape.title }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Title <span style={{ color: 'red' }}>*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter the event title"
                      autoComplete="on"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="description"
              validators={{ onChange: CreateEventSchema.shape.description }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    
                    <FieldLabel htmlFor={field.name}>
                      Description <span style={{ color: 'red' }}>*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter the event description"
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
              name="date"
              validators={{ onChange: CreateEventSchema.shape.date }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>                    
                    <FieldLabel htmlFor={field.name}>Date <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Select the event date"
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
              name="time"
              validators={{ onChange: CreateEventSchema.shape.time }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Time <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="time"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Select the event time"
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
              name="venue"
              validators={{ onChange: CreateEventSchema.shape.venue }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Venue <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter the event venue"
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
              name="image"
              validators={{ onChange: CreateEventSchema.shape.image }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image URL <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Paste the event image URL"
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
              name="visibility"
              validators={{ onChange: CreateEventSchema.shape.visibility as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Visibility <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="input"
                    >
                      <option value="" disabled>
                        Please select option
                      </option>
                      {["PUBLIC", "PRIVATE"].map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {isInvalid && (
                      <div>Please select a visibility option.</div>
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="priceType"
              validators={{ onChange: CreateEventSchema.shape.priceType as any}}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Price Type <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="input"
                    >
                      <option value="" disabled>
                        Please select price type
                      </option>
                      {EventArr.EVENT_Pricing_ARR.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {isInvalid && (
                    <div>
                      {isInvalid && (
                        <div className="text-red-500 text-sm mt-1 font-medium">
                          Please select a valid price type.
                        </div>
                      )}
                    </div>
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="categories"
              validators={{ onChange: CreateEventSchema.shape.categories }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Categories <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="input"
                    >
                      <option value="" disabled>
                        Please select category
                      </option>
                      {EventArr.EVENT_CATEGORY_ARR.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  {isInvalid && (
                    <div className="text-red-500 text-sm mt-1 font-medium">
                      Please select a valid category.
                    </div>
                  )}
                   
                  </Field>
                );
              }}
            />
            <form.Field
              name="status"
              validators={{ onChange: CreateEventSchema.shape.status as any}}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Status <span style={{ color: 'red' }}>*</span></FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="input"
                    >
                      <option value="" disabled>
                        Please select status
                      </option>
                      {EventArr.EVENT_Status_ARR.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  {isInvalid && (
                    <div className="text-red-500 text-sm mt-1 font-medium">
                      Please select a valid status.
                    </div>
                  )}
                    
                  </Field>
                );
              }}
            />
            <form.Field
              name={"fee" as any}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Fee </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter event fee if applicable"
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
      <CardFooter>
        <Field orientation="horizontal">
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
