"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { ReusableTable } from "../table/Table";
import { FilterPanel } from "@/components/Filter";
import { EventArr, IBaseEvent, TGroupedEvents, TPagination } from "@/types/event.types";
import { TFilterField } from "@/types/filter.types";
import { useFilter } from "@/components/ReusableFilter";
import PaginationPage from "./Pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import UpdateEvent from "./UpdateEvent";
import { deleteEvent } from "@/actions/event.actions";
import CopyableId from "@/components/shared/CopyId";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MyEventsTableProps {
  Events: TGroupedEvents;
  pagination?: TPagination;
  role: string;
}

export default function MyEventsTable({ Events, pagination, role }: MyEventsTableProps) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<keyof TGroupedEvents>("UPCOMING");
  const [tableEvents, setTableEvents] = useState<IBaseEvent[]>([]);
  const [loading] = useState(false);

  // Dialog states for event update
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Filters form state
  const [form, setForm] = useState({
    is_featured: false,
    date: "",
    categories: "",
    priceType: "",
    status: "",
    visibility: "",
    fee: 2000,
    search: "",
    createdAt: "",
  });

  const { updateFilters, reset } = useFilter();

  // Handle filter changes
  const handleChange = useCallback(
    (key: keyof typeof form, value: string | number) => {
      if (key === "is_featured") {
        const boolValue = value === "true";
        const updated = { ...form, [key]: boolValue };
        setForm(updated);
        updateFilters(updated);
      } else {
        const updated = { ...form, [key]: value };
        setForm(updated);
        updateFilters(updated);
      }
    },
    [form, updateFilters]
  );

  // Update tableEvents whenever selectedStatus or Events changes
  useEffect(() => {
    setTableEvents(Events[selectedStatus] ?? []);
  }, [selectedStatus, Events]);

  // Table columns
  const columns = [

    {
      key: "id",
      label: "ID",
      render: (e: IBaseEvent) => {
       return <CopyableId id={e.id} href={`/events/${e.id}`} />
      }
    },
    { key: "title", label: "Title" },
    { key: "description", label: "Description", render: (e: IBaseEvent) => e.description.slice(0, 40) + "..." },
    { key: "date", label: "Date", render: (e: IBaseEvent) => new Date(e.date).toLocaleDateString() },
    { key: "fee", label: "Fee" },
    { key: "visibility", label: "Visibility" },
    { key: "status", label: "Status" },
  ];
  

  // Delete event logic (fixed - moved confirmation logic inside)
  const handleDeleteEvent = useCallback(async (eventId: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
        return;
      }
      const toastId = toast.loading("Deleting event. Please wait...");
      const resp = await deleteEvent(eventId);
      toast.dismiss(toastId);
      if (resp.success) {
        setTableEvents((prev: IBaseEvent[]) => prev.filter((event) => event.id !== eventId));
        toast.success(resp.message || "Event deleted successfully");
      } else {
        toast.error(resp.message || "Failed to delete event");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        "Something went wrong while deleting the event." +
          (error?.message ? ` (${error.message})` : "")
      );
    }
  }, []);

  // Actions for USER role
  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (event: IBaseEvent) => router.push(`/events/${event.id}`),
      className: "text-green-500",
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (event: IBaseEvent) => {
        setSelectedEventId(event.id);
        setOpen(true);
      },
      className: "text-blue-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (event: IBaseEvent) => {
        handleDeleteEvent(event.id);
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
      placeholder: "Search title, description, categories, or venue",
      onChange: (val) => handleChange("search", val),
    },
    {
      type: "date",
      name: "date",
      value: form.date || "",
      onChange: (val) => handleChange("date", val),
    },
    {
      type: "select",
      name: "categories",
      label: "Categories",
      value: form.categories,
      onChange: (val) => handleChange("categories", val),
      options: EventArr.EVENT_CATEGORY_ARR.map((v) => ({ label: v, value: v })),
    },
    {
      type: "select",
      name: "priceType",
      label: "Price Type",
      value: form.priceType,
      onChange: (val) => handleChange("priceType", val),
      options: [
        { label: "Free", value: "FREE" },
        { label: "Paid", value: "PAID" },
      ],
    },
    {
      type: "range",
      name: "fee",
      label: "Price (up to)",
      value: form.fee,
      min: 1,
      max: 2000,
      onChange: (val) => handleChange("fee", Number(val)),
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val) => handleChange("status", val),
      options: EventArr.EVENT_Status_ARR.map((v) => ({ label: v, value: v })),
    },
    {
      type: "select",
      name: "visibility",
      label: "Visibility",
      value: form.visibility,
      onChange: (val) => handleChange("visibility", val),
      options: [
        { label: "Public", value: "PUBLIC" },
        { label: "Private", value: "PRIVATE" },
      ],
    },
    {
      type: "select",
      name: "is_featured",
      label: "Is Featured",
      value: form.is_featured ? "true" : "",
      onChange: (val: string) => handleChange("is_featured", val),
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "" },
      ],
    },
    {
      type: "date",
      name: "createdAt",
      value: form.createdAt || "",
      onChange: (val) => handleChange("createdAt", val),
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
                setForm({
                  is_featured: false,
                  date: "",
                  categories: "",
                  priceType: "",
                  status: "",
                  visibility: "",
                  fee: 1,
                  search: "",
                  createdAt: "",
                });
                reset();
                if (role === "USER") {
                  router.push("/user/dashboard/my-events");
                } else {
                  router.push("/events");
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Table container with max height and scroll */}
      <div
        className="w-full"
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
          borderRadius: "1rem",
          background: "white",
        }}
      >
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
           <ReusableTable
            columns={columns as any}
            data={tableEvents}
            actions={role === "USER" ? actions : undefined}
            emptyMessage="No events found"
          />
        )}
      </div>

      {/* Edit Event Dialog */}
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedEventId(null);
        }}
      >
        <DialogContent
          className="max-w-md max-h-[90vh] overflow-y-auto"
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <DialogHeader />
          {selectedEventId && (
            <UpdateEvent
              id={selectedEventId}
              role={role}
              onSuccess={(updated) => {
                setTableEvents((prev: IBaseEvent[]) =>
                  prev.map((item) =>
                    item.id === updated.id ? updated : item
                  )
                );
                setOpen(false);
                setSelectedEventId(null);
                toast.success("Event updated successfully!");
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <PaginationPage pagination={pagination as any} />
    </div>
  );
}