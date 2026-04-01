"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ReusableTable } from "../table/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TResponseParticipant } from "@/types/participant.types";
import { IBaseEvent, TPagination } from "@/types/event.types";
import { IBaseUser } from "@/types/user.types";

import { useFilter } from "@/components/ReusableFilter";
import { FilterPanel } from "@/components/Filter";
import PaginationPage from "../event/Pagination";
import { createParticipantColumns } from "./participantColumns";
import { toast } from "react-toastify";
import ViewParticipantData from "./ViewParicipantData";
import { deleteEventRequiestJoinData } from "@/actions/participant.actions";

export default function RequestEventJoinContent({
  participants,
}: {
  participants: TResponseParticipant<{event: IBaseEvent,user:IBaseUser }>[],
}) {
  const [tableData, setTableData] = useState(participants);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);
  const [viewData, setViewData] = useState<TResponseParticipant<{ event: IBaseEvent, user: IBaseUser }> | null>(null);
  const router=useRouter()
  const [form, setForm] = useState({
    status: "",
    paymentStatus: "",
    joinedAt: "",
  });

  const columns = createParticipantColumns();

  const { updateFilters, reset } = useFilter();

  useEffect(() => {
    setTableData(participants ?? []);
  }, [participants]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    updateFilters(updated);
  };

  const fields = [
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
      name: "joinedAt",
      value: form.joinedAt || "",
      onChange: (val: string) => handleChange("joinedAt", val),
    },
  ];


  const handleDeleteEventRequst = useCallback(async (eventId: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this join request? This action cannot be undone.")) {
        return;
      }
      const toastId = toast.loading("Deleting event. Please wait...");
      const resp = await deleteEventRequiestJoinData(eventId);
      toast.dismiss(toastId);
      if (resp.success) {
        router.refresh()
        setTableData((prev) => prev.filter((participant) => participant.id !== eventId));
        toast.success(resp.message || "The event join request has been successfully deleted.");
      } else {
        toast.error(resp.message || "Failed to delete event request. Please contact support if the problem persists.");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        "Something went wrong while deleting the event." +
          (error?.message ? ` (${error.message})` : "")
      );
    }
  }, []);

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
        icon: Trash2,
        label: "Delete",
        onClick: (event: IBaseEvent) => {
            handleDeleteEventRequst(event.id);
        },
        className: "text-red-500",
      },
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-6 bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800">
        <FilterPanel
          fields={fields as any}
          onReset={() => {
            setForm({
              status: "",
              paymentStatus: "",
              joinedAt: "",
            });
            reset();
          }}
        />
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <ReusableTable columns={columns as any} data={tableData} actions={actions as any}  />
      </div>

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
            ispay
              viewData={viewData as TResponseParticipant<{ event: IBaseEvent, user: IBaseUser }>}
              viewMode={viewMode}
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="py-4 flex justify-end">
        {/* <PaginationPage pagination={pagination} /> */}
      </div>
    </div>
  );
}
