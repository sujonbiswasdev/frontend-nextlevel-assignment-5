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
import { deletePayment } from "@/actions/payment.actions";
import PaginationPage from "../event/Pagination";

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
  const { updateFilters, reset,isPending } = useFilter();

  const [form, setForm] = useState({
    status: "",
    amount: "",
    userId: "",
    eventId: "",
  });

  useEffect(() => {
    setTableData(payments ?? []);
  }, [payments]);

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);
  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    const defaultForm = {
      status: "",
    amount: "",
    userId: "",
    eventId: ""
    };
    setForm(defaultForm);
    reset();
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
        { label: "FREE", value: "FREE" },
      ],
    },
  ];

  const handleDeletePayment = useCallback(async (id: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this payment?")) return;
      const toastId = toast.loading("Deleting payment...");
      const resp = await deletePayment(id);
      toast.dismiss(toastId);

      if (resp.success) {
        setTableData((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
        toast.success(resp.message || "Payment deleted successfully");
      } else {
        toast.error(resp.message || "Failed to delete payment.");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error("Something went wrong. " + (error?.message || ""));
    }
  }, [router]);

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
      onClick: (item: any) => handleDeletePayment(item.id),
      className: "text-red-500",
    },
  ];

  const columns = createPaymentColumns();

  return (
    <div className="w-full">
      <div className="mb-6 bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800">
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
           <ReusableTable
           columns={columns as any}
           data={tableData}
           actions={actions as any}
         />
        ) : (
          <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-base select-none">
            No payment data found.
          </div>
        )}
      </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setViewData(null);
            setSelectedPayment(null);
          }
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 sm:p-0 bg-white dark:bg-gray-950">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-gray-100 dark:border-gray-800 rounded-t-xl">
            <DialogTitle className="text-[1.45rem] sm:text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-1 sm:mb-2 tracking-tight text-center">
              Payment Details
            </DialogTitle>
          </DialogHeader>

          <div
            className="py-6 px-4 sm:px-8"
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {viewData && <ViewPaymentData viewData={viewData} />}

            {!viewMode && selectedPayment && (
              <div className="mt-6">
                <UpdatePaymentStatusForm
                  id={selectedPayment}
                  onSuccess={(updated: any) => {
                    setTableData((prev: any) =>
                      prev.map((item: any) =>
                        item.id === updated.id ? updated : item
                      )
                    );
                    setOpen(false);
                    setSelectedPayment(null);
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
