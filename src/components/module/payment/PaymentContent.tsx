"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { ReusableTable } from "../table/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilterPanel } from "@/components/Filter";
import { useFilter } from "@/components/ReusableFilter";
import { TResponsePayment } from "@/types/payment.types";
import { IBaseEvent, TPagination } from "@/types/event.types";
import { TBaseParticipant } from "@/types/participant.types";
import { TFilterField } from "@/types/filter.types";
import { createPaymentColumns } from "./CreatePaymentColums";
import ViewPaymentData from "./ViewPaymentData";
import { IBaseUser } from "@/types/user.types";
import UpdatePaymentForm from "./UpdatePaymentForm";
import UpdatePaymentStatusForm from "./UpdatePaymentForm";

export default function PaymentContent({
  payments,
  role,
  pagination,
}: {
  payments: TResponsePayment<{
    event: IBaseEvent;
    participant: TBaseParticipant;
    user: IBaseUser;
  }>[];
  role: string;
  pagination: TPagination;
}) {
  const [tableData, setTableData] = useState(payments);
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(false);

  const router = useRouter();
  const { updateFilters, reset } = useFilter();

  const [form, setForm] = useState({
    status: "",
    amount: "",
    userId: "",
    eventId: "",
  });

  useEffect(() => {
    setTableData(payments ?? []);
  }, [payments]);

  const handleChange = (key: string, value: any) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    updateFilters(updated);
  };

  const fields: TFilterField[] = [
    {
      type: "text",
      name: "userId",
      value: form.userId,
      onChange: (val: string) => handleChange("userId", val),
    },
    {
      type: "text",
      name: "eventId",
      value: form.eventId,
      onChange: (val: string) => handleChange("eventId", val),
    },
    {
      type: "text",
      name: "amount",
      value: form.amount,
      onChange: (val: string) => handleChange("amount", val),
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "Paid", value: "PAID" },
        { label: "Unpaid", value: "UNPAID" },
        { label: "Refunded", value: "REFUNDED" },
      ],
    },
  ];

  // const handleDeletePayment = useCallback(async (id: string) => {
  //   try {
  //     if (!window.confirm("Are you sure you want to delete this payment?")) return;
  //     const toastId = toast.loading("Deleting payment...");
  //     const resp = await deletePaymentAction(id);
  //     toast.dismiss(toastId);

  //     if (resp.success) {
  //       setTableData((prev) => prev.filter((item) => item.id !== id));
  //       router.refresh();
  //       toast.success(resp.message || "Payment deleted successfully");
  //     } else {
  //       toast.error(resp.message || "Failed to delete payment.");
  //     }
  //   } catch (error: any) {
  //     toast.dismiss();
  //     toast.error("Something went wrong. " + (error?.message || ""));
  //   }
  // }, []);

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
        setSelectedPayment(item.id);
        setViewMode(false);
        setOpen(true);
      },
      className: "text-blue-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: any) => <></>,
      className: "text-red-500",
    },
  ];

  const columns = createPaymentColumns();

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-6 bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800">
        <FilterPanel
          fields={fields}
          onReset={() => {
            setForm({ status: "", amount: "", userId: "", eventId: "" });
            reset();
          }}
        />
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <ReusableTable
          columns={columns as any}
          data={tableData}
          actions={actions as any}
        />
      </div>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setViewData(null);
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 sm:p-0 bg-white dark:bg-gray-950">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-gray-100 dark:border-gray-800 rounded-t-xl">
            <DialogTitle className="text-[1.45rem] sm:text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-1 sm:mb-2 tracking-tight text-center">
              Payment Details
            </DialogTitle>
          </DialogHeader>

          {!viewMode && selectedPayment && (
            <div className="mt-6">
              <UpdatePaymentStatusForm
                currentStatus={viewData.status}
                id={selectedPayment}
                onSuccess={(updated: any) => {
                  setTableData((prev: any) =>
                    prev.map((item: any) =>
                      item.id === updated.id ? updated : item,
                    ),
                  );
                  setOpen(false);
                  // selectedPayment(null);
                }}
              />
            </div>
          )}

          <div
            style={{ maxHeight: "70vh", overflowY: "auto" }}
            className="py-6 px-4 sm:px-8"
          >
            {viewData ? <ViewPaymentData viewData={viewData} /> : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
