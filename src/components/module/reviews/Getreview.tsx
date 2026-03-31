"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { ReusableTable } from "../table/Table";
import { FilterPanel } from "@/components/Filter";
import { TPagination, TResponseEvent } from "@/types/event.types";
import { TFilterField } from "@/types/filter.types";
import { useFilter } from "@/components/ReusableFilter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import PaginationPage from "../event/Pagination";
import { TResponseReviewData } from "@/types/review.types";

interface MyReviewsTableProps {
  reviews: TResponseReviewData<any>[];
  pagination?: TPagination;
  role: string;
}

export default function MyReviewsTable({ reviews, pagination, role }: MyReviewsTableProps) {
  const router = useRouter();
  const [tableReviews, setTableReviews] = useState(reviews);
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  console.log(tableReviews,'tsd')
  

  // Filters form state
  const [form, setForm] = useState({
    rating: 0,
    search: "",
    status: "",
  });

  const { updateFilters, reset } = useFilter();

  const handleChange = useCallback(
    (key: keyof typeof form, value: string | number) => {
      const updated = { ...form, [key]: value };
      setForm(updated);
      updateFilters(updated);
    },
    [form, updateFilters]
  );

  // Filter reviews based on status or other filters if needed
  useEffect(() => {
    let filtered = reviews;

    // Filter by search
    if (form.search) {
      const s = form.search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.comment?.toLowerCase().includes(s) ||
          r.event?.title?.toLowerCase().includes(s)
      );
    }

    // Filter by rating
    if (form.rating > 0) {
      filtered = filtered.filter((r) => r.rating >= form.rating);
    }

    // Filter by status
    if (form.status) {
      filtered = filtered.filter((r) => r.status === form.status);
    }

    setTableReviews(filtered);
  }, [form, reviews]);

  // Table columns
  const columns = [
    { key: "id", label: "ID", render: (r: any) => r.id.slice(0, 6) },
    { key: "event", label: "Event", render: (r: any) => r.event?.title },
    { key: "user", label: "User", render: (r: any) => {return r.user?.name && r.user.email} },
    { key: "comment", label: "Comment", render: (r: any) => r.comment.slice(0, 40) + "..." },
    { key: "rating", label: "Rating" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At", render: (r: any) => new Date(r.createdAt).toLocaleString() },
  ];

  // Actions
  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (review: any) => router.push(`/events/${review.eventId}`),
      className: "text-green-500",
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (review: any) => {
        setSelectedReviewId(review.id);
        setOpen(true);
      },
      className: "text-blue-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: async (review: any) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        const toastId = toast.loading("Deleting review...");
        // try {
        //   const resp = await deleteReview(review.id);
        //   toast.dismiss(toastId);
        //   if (resp.success) {
        //     setTableReviews((prev) => prev.filter((r) => r.id !== review.id));
        //     toast.success(resp.message || "Review deleted");
        //   } else {
        //     toast.error(resp.message || "Failed to delete review");
        //   }
        // } catch (err: any) {
        //   toast.dismiss();
        //   toast.error("Error deleting review: " + (err.message || ""));
        // }
      },
      className: "text-red-500",
    },
  ];

  // Filter fields
  const fields: TFilterField[] = [
    {
      type: "text",
      name: "search",
      value: form.search || "",
      placeholder: "Search by comment or event title",
      onChange: (val) => handleChange("search", val),
    },
    {
      type: "range",
      name: "rating",
      label: "Minimum Rating",
      min: 0,
      max: 5,
      value: form.rating,
      onChange: (val) => handleChange("rating", Number(val)),
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val) => handleChange("status", val),
      options: [
        { label: "Approved", value: "APPROVED" },
        { label: "Pending", value: "PENDING" },
        { label: "Rejected", value: "REJECTED" },
      ],
    },
  ];

  return (
    <div className="max-w-[1480px] mx-auto px-4 py-8">
      {/* Filter panel */}
      <section className="w-full mb-10 px-2">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white/80 dark:bg-gray-900/80 shadow-lg rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/40 transition-all">
          <div className="flex-1">
            <FilterPanel
              fields={fields}
              onReset={() => {
                setForm({ search: "", rating: 0, status: "" });
                reset();
                router.push("/reviews");
              }}
            />
          </div>
        </div>
      </section>

      {/* Table container */}
      <div
        className="w-full"
        style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto", borderRadius: "1rem", background: "white" }}
      >
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <ReusableTable
            columns={columns as any}
            data={tableReviews}
            actions={role === "USER" ? actions : undefined}
            emptyMessage="No reviews found"
          />
        )}
      </div>

      {/* Edit Review Dialog */}
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedReviewId(null);
        }}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader />
          {/* {selectedReviewId && (
            <UpdateReview
              id={selectedReviewId}
              onSuccess={(updated) => {
                setTableReviews((prev) =>
                  prev.map((r) => (r.id === updated.id ? updated : r))
                );
                setOpen(false);
                setSelectedReviewId(null);
                toast.success("Review updated successfully!");
              }}
            />
          )} */}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <PaginationPage pagination={pagination as TPagination} />
    </div>
  );
}