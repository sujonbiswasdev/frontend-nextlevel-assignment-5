"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { ReusableTable } from "../table/Table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FilterPanel } from "@/components/Filter";
import { useFilter } from "@/components/ReusableFilter";
import ViewUserData from "./viewUserData";
import { deleteEventRequiestJoinData } from "@/actions/participant.actions";
import { IBaseEvent, TPagination } from "@/types/event.types";
import { IgetReviewData } from "@/types/review.types";
import { IBaseUser, TResponseUserData } from "@/types/user.types";
import { createUserColumns } from "./createUserColums";
import { TFilterField } from "@/types/filter.types";
import { UpdateUserForm } from "./UpdateUser";

export default function UserContentPage({
  users,
  pagination,
}: {
  users: TResponseUserData<{reviews:IgetReviewData[],events:IBaseEvent[]}>[]; // your dynamic data
  pagination?: TPagination;
}) {
  console.log(users,'sue')
  const [tableData, setTableData] = useState(users);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<any>(null);
  const router = useRouter();
  const { updateFilters, reset } = useFilter();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    phone: "",
    image: "",
    isActive: false,
    emailVerified: false,
  });

  useEffect(() => {
    setTableData(users ?? []);
  }, [users]);

  const handleChange = (key: string, value: any) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    updateFilters(updated);
  };

  const fields = [
    {
      type: "text",
      name: "name",
      label: "Name",
      value: form.name,
      onChange: (val: string) => handleChange("name", val),
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      value: form.email,
      onChange: (val: string) => handleChange("email", val),
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      value: form.phone,
      onChange: (val: string) => handleChange("phone", val),
    },
    {
      type: "select",
      name: "role",
      label: "Role",
      value: form.role,
      onChange: (val: string) => handleChange("role", val),
      options: [
        { label: "Admin", value: "ADMIN" },
        { label: "User", value: "USER" },
      ],
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
        { label: "Blocked", value: "BLOCKED" },
        { label: "Deleted", value: "DELETED" },
      ],
    },
    {
      type: "select",
      name: "emailVerified",
      label: "Email Verified",
      value: form.emailVerified,
      onChange: (val: string) => handleChange("emailVerified", val),
      options: [
        { label: "No", value: "false" },
        { label: "Yes", value: "true" },
      ],
    },
  ];

  const handleDeleteEventRequst = useCallback(async (id: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this join request?")) return;
      const toastId = toast.loading("Deleting event. Please wait...");
      const resp = await deleteEventRequiestJoinData(id);
      toast.dismiss(toastId);

      if (resp.success) {
        setTableData((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
        toast.success(resp.message || "Deleted successfully");
      } else {
        toast.error(resp.message || "Failed to delete. Please contact support.");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error("Something went wrong. " + (error?.message || ""));
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
      icon: Pencil,
      label: "Edit",
      onClick: (item: any) => {
        setSelectedUserId(item.id);
        setViewMode(false);
        setOpen(true);
      },
      className: "text-blue-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: any) => handleDeleteEventRequst(item.id),
      className: "text-red-500",
    },
  ];

  const columns = createUserColumns();

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-6 bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800">
        <FilterPanel
          fields={fields as TFilterField[]}
          onReset={() => {
            setForm({
              name: "",
              email: "",
              role: "",
              status: "",
              phone: "",
              image: "",
              isActive: false,
              emailVerified: false,
            });
            reset();
          }}
        />
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <ReusableTable columns={columns as any} data={tableData} actions={actions as any} />
      </div>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setViewData(null);
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 sm:p-0 bg-white dark:bg-gray-950">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-t-xl shadow-none">
            <DialogTitle className="text-[1.45rem] sm:text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-1 sm:mb-2 tracking-tight text-center">
              {viewMode ? "Participant Details" : "Edit Participant"}
            </DialogTitle>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-0 text-center">
              {/* {viewMode ? "Review participant information below." : "Update status or details as needed."} */}
            </p>
          </DialogHeader>

          {!viewMode && !viewData && selectedUserId && (
            <UpdateUserForm
              id={selectedUserId}
              onSuccess={(updated:any) => {
                setOpen(updated);
                setSelectedUserId(null);
              }}
            />
          )}

          

          <div style={{ maxHeight: '70vh', overflowY: 'auto' }} className="py-6 px-4 sm:px-8">
            {viewData && viewMode==true? ( <ViewUserData viewData={viewData} viewMode={viewMode} />):null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}