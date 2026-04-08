"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ReusableTable } from "../table/Table";
import { createParticipantColumns } from "./participantColumns";
import { UpdateParticipantForm } from "./UpdateParticipant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TResponseParticipant } from "@/types/participant.types";
import { IBaseEvent, TPagination } from "@/types/event.types";
import { IBaseUser } from "@/types/user.types";
import ViewParticipantData from "./ViewParicipantData";
import { useFilter } from "@/components/ReusableFilter";
import { FilterPanel } from "@/components/Filter";
import PaginationPage from "../event/Pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import { deleteParticipantAction } from "@/actions/participant.actions";
import { TFilterField } from "@/types/filter.types";

export default function ParticipantContent({
  participants,
  role,
  pagination,
}: {
  participants: TResponseParticipant<{ user: IBaseUser[]; event: IBaseEvent[] }>[],
  role: string,
  pagination: TPagination,
}) {
  const router = useRouter();
  const [tableData, setTableData] = useState(participants);
  const [open, setOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<TResponseParticipant<{ event: IBaseEvent, user: IBaseUser }> | null>(null);

  const [form, setForm] = useState({
    status: "",
    paymentStatus: "",
    joinedAt: "",
  });

  // Use the participant-specific columns instead of the event columns
  const columns = createParticipantColumns();

  const { updateFilters, reset,isPending } = useFilter();

  useEffect(() => {
    setTableData(participants ?? []);
  }, [participants]);

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);


  const handleApply = () => {
    updateFilters(form);
  };


  const handleReset = () => {
    const defaultForm = {
      status: "",
      paymentStatus: "",
      joinedAt: ""
    };
    setForm(defaultForm);
    reset();
  };

  const fields :TFilterField[] = [
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" },
        { label: "BANNED", value: "BANNED" },
      ],
    },
    {
      type: "select",
      name: "paymentStatus",
      label: "Payment Status",
      value: form.paymentStatus,
      onChange: (val: string) => handleChange("paymentStatus", val),
      options: [
        { label: "Paid", value: "PAID" },
        { label: "Free", value: "FREE" },
        { label: "Unpaid", value: "UNPAID" },
      ],
    },
    {
      type: "date",
      label: "joinedAt",
      name: "joinedAt",
      value: form.joinedAt || "",
      onChange: (val: string) => handleChange("joinedAt", val),
    },
  ];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this participant? This action cannot be undone.")) {
      return;
    }
    const toastId = toast.loading("Deleting participants...");
    try {
      const res = await deleteParticipantAction(id);
      toast.dismiss(toastId);
      if (res?.success) {
        toast.update(toastId, {
          render: res.message || "participants deleted successfully.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setTableData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.update(toastId, {
          render: res?.message || "Failed to delete participants.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.message || "Server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };


  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (item: any) => {
        setViewData(item);
        setViewMode(true);
        setOpen(true);
      },
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (item: any) => {
        setSelectedParticipantId(item.id);
        setViewMode(false);
        setOpen(true);
      },
    },
  ...(role === "ADMIN"
    ? [
        {
          icon: Trash2,
          label: "delete",
          onClick: (item: any) => {
            handleDelete(item.id);
          },
        },
      ]
    : []),
  ];

  return (
    <div className="w-full">
       <div className="mb-3 flex w-full justify-center sm:mb-4">
         <button
           type="button"
           onClick={() => router.push("/user/dashboard/event-request-join")}
           className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 focus:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
         >
           <svg
             className="w-5 h-5"
             fill="none"
             stroke="currentColor"
             strokeWidth={2}
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
             aria-hidden="true"
           >
             <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <span className="hidden md:inline">Event Join Requests data</span>
           <span className="md:hidden">Join Requests data</span>
         </button>
       </div>
       <div className="mb-6 bg-white dark:bg-gray-950 p-3 sm:p-4 md:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800 transition-all">
       <section className="mb-8 w-full">
        <FilterPanel
          fields={fields}
          onApply={handleApply}
          onReset={handleReset}
          isPending={isPending}
        />
      </section>
       </div>
       
       <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
       {isPending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm font-medium">Filtering data...</p>
          </div>
        )}
      <div className="mb-6 overflow-x-auto rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        {tableData && Array.isArray(tableData) && tableData.length > 0 ? (
          <ReusableTable columns={columns as any} data={tableData} actions={actions} />
        ) : (
          <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-base select-none">
            No participant data found.
          </div>
        )}
      </div>
      </div>

      {/* Changed Modal Design: Make content scrollable, NOT the modal itself */}
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setSelectedParticipantId(null);
            setViewData(null);
          }
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 sm:p-0 bg-white dark:bg-gray-950">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-t-xl shadow-none">
            <DialogTitle className="text-[1.45rem] sm:text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-1 sm:mb-2 tracking-tight text-center">
              {viewMode ? "Participant Details" : "Edit Participant"}
            </DialogTitle>
            <p
              id="dialog-description"
              className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-0 text-center"
            >
              {viewMode
                ? "Review participant information below."
                : "Update status or payment details as needed."}
            </p>
          </DialogHeader>

          {/* Make ONLY the modal content scrollable */}
          <div
            className="py-6 px-4 sm:px-8"
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            <ViewParticipantData
              viewData={viewData as TResponseParticipant<{ event: IBaseEvent, user: IBaseUser }>}
              viewMode={viewMode}
            />

            {!viewMode && selectedParticipantId && (
              <div className="mt-6">
                <UpdateParticipantForm
                  id={selectedParticipantId}
                  role={role}
                  onSuccess={(updated) => {
                    setTableData((prev: any) =>
                      prev.map((item: any) =>
                        item.id === updated.id ? updated : item
                      )
                    );
                    setOpen(false);
                    setSelectedParticipantId(null);
                  }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center py-4">
        <PaginationPage pagination={pagination} />
      </div>
    </div>
  );
}
