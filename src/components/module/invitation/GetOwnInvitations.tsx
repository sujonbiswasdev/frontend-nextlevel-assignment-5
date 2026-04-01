"use client";

import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FilterPanel } from "@/components/Filter";
import { useFilter } from "@/components/ReusableFilter";
import { TFilterField } from "@/types/filter.types";
import { ReusableTable } from "../table/Table";
import { InvitationArr, TInvitation, TResponseInvitation } from "@/types/invitation.types";
import { createInvitationColumns } from "./column/invitation.column";
import { deleteInvitationAction } from "@/actions/invitation.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UpdateInvitationForm } from "./UpdateInvitaion";
import { IBaseEvent, TPagination } from "@/types/event.types";
import PaginationPage from "../event/Pagination";
import { IBaseUser } from "@/types/user.types";
import ViewInvitationData from "./ViewData";

export default function GetOwnInvitations({ invitations,pagination }: { invitations: TResponseInvitation[],pagination:TPagination }) {
  const router = useRouter();
  const [tableData, setTableData] = useState<TResponseInvitation[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal open/close and selection
  const [open, setOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(false);
const [viewData, setViewData] = useState<TResponseInvitation<{event:IBaseEvent,invitee:IBaseUser}> | null>(null);

  const [form, setForm] = useState({
    eventId: "",
    inviterId: "",
    inviteeId: "",
    status: "",
    message: "",
    createdAt: "",
  });

  const { updateFilters, reset } = useFilter();

  useEffect(() => {
    setTableData(invitations ?? []);
    setLoading(false);
  }, [invitations]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    updateFilters(updated);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this invitation? This action cannot be undone.")) {
      return;
    }
    const toastId = toast.loading("Deleting invitation...");
    try {
      const res = await deleteInvitationAction(id);
      toast.dismiss(toastId);
      if (res?.success) {
        toast.update(toastId, {
          render: res.message || "Invitation deleted successfully.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setTableData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.update(toastId, {
          render: res?.message || "Failed to delete invitation.",
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

  const columns = createInvitationColumns();

  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (item: TResponseInvitation<{event:IBaseEvent,invitee:IBaseUser}>) => {
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
      value: form.createdAt || "",
      onChange: (val) => handleChange("createdAt", val),
    },
  ];

  const handleAddInvitation = () => {
    router.push('/user/dashboard/invitations/create-invitation');
  };

  return (
    <>
      <section className="py-3 px-2 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">
            Your Invitations
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-base font-medium shadow"
            onClick={handleAddInvitation}
          >
            <Plus size={20} />
            <span>Add Invitation</span>
          </button>
        </div>
        <div className="mb-4 bg-gray-50 p-4 rounded-lg shadow">
          <FilterPanel
            fields={fields}
            onReset={() => {
              setForm({
                eventId: "",
                inviterId: "",
                inviteeId: "",
                status: "",
                message: "",
                createdAt: "",
              });
              reset();
            }}
          />
        </div>
        <div
          className="w-full bg-white rounded-xl shadow border border-gray-100"
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            overflowX: "auto"
          }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg font-medium">Loading...</p>
            </div>
          ) : (
            <ReusableTable
              columns={columns as any}
              data={tableData as TResponseInvitation<{ event: IBaseEvent; invitee: IBaseUser; }>[]}
              actions={actions}
              emptyMessage="No invitation found"
            />
          )}
        </div>
        {/* The following dialog is a placeholder for edit functionality */}
        <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) { setSelectedInvitationId(null);
            setViewData(null);
            setViewMode(false);};
        }}
      >
        <DialogContent className="max-w-md">
  <DialogHeader>
    <DialogTitle className="text-center p-4 font-semibold">
      {viewMode ? "View Invitation" : "Edit Invitation"}
    </DialogTitle>
  </DialogHeader>


  <ViewInvitationData viewData={viewData} viewMode={viewMode}/>

  {/* EDIT MODE */}
  {!viewMode && selectedInvitationId && (
    <UpdateInvitationForm
      id={selectedInvitationId}
      onSuccess={(updated) => {
        setTableData((prev: any) =>
          prev.map((item: any) =>
            item.id === updated.id ? updated : item
          )
        );
        setOpen(false);
        setSelectedInvitationId(null);
      }}
    />
  )}
</DialogContent>
      </Dialog>

      <div>
        <PaginationPage pagination={pagination}/>
      </div>
      </section>
    </>
  );
}