"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";

import { ReusableTable } from "../table/Table";
import { FilterPanel } from "@/components/Filter";
import { useFilter } from "@/components/ReusableFilter";
import { TFilterField } from "@/types/filter.types";
import { InvitationArr, TResponseInvitation } from "@/types/invitation.types";
import { createInvitationColumns } from "./column/invitation.column";
import { deleteInvitationAction } from "@/actions/invitation.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UpdateInvitationForm } from "./UpdateInvitaion";
import { IBaseEvent, TPagination } from "@/types/event.types";
import PaginationPage from "../event/Pagination";
import { IBaseUser } from "@/types/user.types";
import ViewInvitationData from "./ViewData";

interface GetInvitationsProps {
  invitations: TResponseInvitation[];
  pagination: TPagination;
  user?: IBaseUser;
}

export default function GetInvitations({ invitations, pagination, user }: GetInvitationsProps) {
  const router = useRouter();
  const [tableData, setTableData] = useState<TResponseInvitation[]>([]);
  
  const { updateFilters, reset, isPending } = useFilter();

  const [open, setOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<TResponseInvitation<{ event: IBaseEvent, invitee: IBaseUser }> | null>(null);

  const [form, setForm] = useState({
    eventId: "",
    inviterId: "",
    inviteeId: "",
    status: "",
    message: "",
    createdAt: "",
  });

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    const defaultForm = {
      eventId: "",
      inviterId: "",
      inviteeId: "",
      status: "",
      message: "",
      createdAt: "",
    };
    setForm(defaultForm);
    reset();
  };

  useEffect(() => {
    setTableData(invitations ?? []);
  }, [invitations]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this invitation? This action cannot be undone.")) {
      return;
    }
    const toastId = toast.loading("Deleting invitation...");
    try {
      const res = await deleteInvitationAction(id);
      toast.dismiss(toastId);
      if (res?.success) {
        toast.success(res.message || "Invitation deleted successfully.");
        setTableData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(res?.message || "Failed to delete invitation.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Server error");
    }
  };

  const columns = createInvitationColumns();

  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (item: TResponseInvitation<{ event: IBaseEvent, invitee: IBaseUser }>) => {
        setViewData(item);
        setViewMode(true);
        setOpen(true);
      },
      className: "text-green-500",
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (item: TResponseInvitation) => {
        setSelectedInvitationId(item.id);
        setViewMode(false);
        setOpen(true);
      },
      className: "text-blue-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: TResponseInvitation) => {
        handleDelete(item.id);
      },
      className: "text-red-500",
    },
  ];

  const fields: TFilterField[] = [
    {
      type: "text",
      name: "eventId",
      value: form.eventId || "",
      placeholder: "Search event ID",
      onChange: (val) => handleChange("eventId", val),
    },
    {
      type: "text",
      name: "inviteeId",
      value: form.inviteeId || "",
      placeholder: "Search invitee",
      onChange: (val) => handleChange("inviteeId", val),
    },
    {
      type: "text",
      name: "inviterId",
      value: form.inviterId || "",
      placeholder: "Search inviter",
      onChange: (val) => handleChange("inviterId", val),
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val) => handleChange("status", val),
      options: InvitationArr.INVITATION_Status_ARR.map((v) => ({
        label: v,
        value: v,
      })),
    },
    {
      type: "date",
      name: "createdAt",
      label: "createdAt",
      value: form.createdAt || "",
      onChange: (val) => handleChange("createdAt", val),
    },
  ];

  const handleAddInvitation = () => {
    const path = user?.role === "ADMIN" 
      ? '/admin/dashboard/invitations/create-invitation' 
      : '/user/dashboard/invitations/create-invitation';
    router.push(path);
  };

  return (
    <div className="w-full py-6 sm:py-8">
      <section className="mb-8 w-full">
        <FilterPanel
          fields={fields}
          onApply={handleApply}
          onReset={handleReset}
          isPending={isPending}
        />
      </section>

      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        {isPending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm font-medium">Filtering data...</p>
          </div>
        )}
        
        <div className="p-4 sm:p-5" style={{ maxHeight: "60vh", overflow: "auto" }}>
          <div className="mb-4 flex w-full justify-center">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-semibold shadow"
              onClick={handleAddInvitation}
            >
              <Plus size={18} />
              <span>Add Invitation</span>
            </button>
          </div>
          
          <ReusableTable
            columns={columns as any}
            data={tableData as any}
            actions={actions}
            emptyMessage="No invitation found"
          />
        </div>
      </div>

      <div className="flex justify-center py-4">
        <PaginationPage pagination={pagination} />
      </div>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setSelectedInvitationId(null);
            setViewData(null);
            setViewMode(false);
          }
        }}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center p-4 font-semibold text-gray-800">
              {viewMode ? "View Invitation" : "Edit Invitation"}
            </DialogTitle>
          </DialogHeader>

          <ViewInvitationData viewData={viewData} viewMode={viewMode} />

          {!viewMode && selectedInvitationId && (
            <UpdateInvitationForm
              id={selectedInvitationId}
              onSuccess={(updated) => {
                setTableData((prev) =>
                  prev.map((item) => (item.id === updated.id ? updated : item))
                );
                setOpen(false);
                setSelectedInvitationId(null);
                toast.success("Updated!");
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}