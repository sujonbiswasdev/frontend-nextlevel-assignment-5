"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { ReusableTable } from "../table/Table";
import { FilterPanel } from "@/components/Filter";
import { TPagination } from "@/types/event.types";
import { TFilterField } from "@/types/filter.types";
import { useFilter } from "@/components/ReusableFilter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import PaginationPage from "../event/Pagination";
import { TResponseReviewData } from "@/types/review.types";
import { deleteReview } from "@/actions/review.actions";

/**
 * Assign a unique color to each status or action.
 */
const STATUS_COLOR_MAP: Record<string, string> = {
  APPROVED: "bg-green-200 text-green-800",
  PENDING: "bg-yellow-200 text-yellow-800",
  REJECTED: "bg-red-200 text-red-800"
};

const ACTION_COLOR_MAP = {
  view: "text-fuchsia-500 hover:bg-fuchsia-50",
  edit: "text-cyan-700 hover:bg-cyan-50",
  delete: "text-rose-600 hover:bg-rose-50"
};

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

  // Filters form state
  const [form, setForm] = useState({
    rating: 0,
    search: "",
    status: "",
  });

  // Handle deleting a review with loading, success, and error notifications
  const handleDeleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      return;
    }
    try {
      const toastId = toast.loading("Deleting review...");
      const result = await deleteReview(id);
      toast.dismiss(toastId);

      if (result && result.success) {
        toast.success(result.message || "Review deleted successfully!");
        setTableReviews(prev => prev.filter((review) => review.id !== id));
      } else {
        toast.error(result?.message || "Failed to delete review");
      }
    } catch (e: any) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const { updateFilters, reset } = useFilter();

  const handleChange = useCallback(
    (key: keyof typeof form, value: string | number) => {
      const updated = { ...form, [key]: value };
      setForm(updated);
      updateFilters(updated);
    },
    [form, updateFilters]
  );

  // Filter reviews based on filters
  useEffect(() => {
    let filtered = reviews;
    if (form.search) {
      const s = form.search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.comment?.toLowerCase().includes(s) ||
          r.event?.title?.toLowerCase().includes(s)
      );
    }
    if (form.rating > 0) {
      filtered = filtered.filter((r) => r.rating >= form.rating);
    }
    if (form.status) {
      filtered = filtered.filter((r) => r.status === form.status);
    }
    setTableReviews(filtered);
  }, [form, reviews]);

  // Table columns with text-[11px] classes
  const columns = [
    {
      key: "id",
      label: "ID",
      render: (r: any) => (
        <span className="font-mono text-blue-900 text-[11px]">{r.id.slice(0, 6)}</span>
      )
    },
    {
      key: "event",
      label: "Event",
      render: (r: any) => (
        <span className="text-violet-700 text-[11px]">{r.event?.title?.slice(0, 12)}</span>
      )
    },
    {
      key: "user",
      label: "User",
      render: (r: any) => (
        <span className="text-emerald-800 text-[11px]">
          {r.user?.name} <br /> <span className="text-[11px] font-light">{r.user?.email}</span>
        </span>
      )
    },
    {
      key: "comment",
      label: "Comment",
      render: (r: any) => (
        <span className="text-gray-700 italic text-[11px]">{r.comment?.slice(0, 24) + (r.comment?.length > 24 ? "..." : "")}</span>
      )
    },
    {
      key: "rating",
      label: "Rating",
      render: (r: any) => (
        <span className="bg-purple-200 px-2 py-1 rounded-md font-semibold text-purple-800 text-[11px]">{r.rating}</span>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (r: any) => (
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-md ${STATUS_COLOR_MAP[r.status] || "bg-gray-200 text-gray-800"} text-[11px]`}>
          {r.status}
        </span>
      )
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (r: any) => (
        <span className="text-indigo-600 text-[11px]">{r.createdAt?.slice(0, 10)}</span>
      )
    },
  ];

  // Actions with unique colors using text-[11px]
  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (review: any) => router.push(`/events/${review.eventId}`),
      className: ACTION_COLOR_MAP.view + " text-[11px]",
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (review: any) => {
        setSelectedReviewId(review.id);
        setOpen(true);
      },
      className: ACTION_COLOR_MAP.edit + " text-[11px]",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: async (review: any) => {
        handleDeleteReview(review.id);
      },
      className: ACTION_COLOR_MAP.delete + " text-[11px]",
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
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-gradient-to-tr from-sky-50 via-white to-indigo-50 dark:bg-gradient-to-tr dark:from-gray-900 dark:to-slate-900 shadow-lg rounded-2xl p-6 md:p-8 border border-sky-200 dark:border-blue-900/40 transition-all">
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
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
          borderRadius: "1rem",
          background: "linear-gradient(135deg, #f0f9ff 0%, #fcf6fd 100%)"
        }}
      >
        {loading ? (
          <p className="text-center text-lg text-cyan-500 font-semibold py-8">Loading...</p>
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-lime-50">
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