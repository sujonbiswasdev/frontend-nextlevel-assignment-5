"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
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
import CreateInvitationForm from "../invitation/CreateInvitation";
import PaginationPage from "../event/Pagination";

export default function ParticipantContent({ participants, role,pagination }: {participants:TResponseParticipant<{ user: IBaseUser[]; event: IBaseEvent[]}>[],role:string,pagination:TPagination}) {
  const router = useRouter();
  const [tableData, setTableData] = useState(participants);
  const [open, setOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);

  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<TResponseParticipant<{event:IBaseEvent,user:IBaseUser}> | null>(null);

  const [form, setForm] = useState({
    status: '',
    paymentStatus: '',
    joinedAt: '',
  });


  // Use the participant-specific columns instead of the event columns
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

  // amar ai data gula takbe
  // Only use the fields that are in the form state: status, paymentStatus, joinedAt
  // eventId and userId removed from fields, only status/paymentStatus/joinedAt

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
        { label: "free", value: "FREE" },
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
    }
  ];

  return (
    <>

<div className="mb-4 bg-gray-50 p-4 rounded-lg shadow">
          <FilterPanel
            fields={fields as any }
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

      <ReusableTable columns={columns as any} data={tableData} actions={actions} />



      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedParticipantId(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center py-3 border-b border-gray-100 mb-3">
            <DialogTitle className="text-2xl font-bold text-indigo-900 mb-1">
              {viewMode ? "Participant Details" : "Edit Participant"}
            </DialogTitle>
            <p
              id="dialog-description"
              className="text-base text-gray-500 leading-relaxed"
            >
              {viewMode
                ? "Review all information for this participant below."
                : "Update participant status and payment details with confidence."
              }
            </p>
          </DialogHeader>

          <ViewParticipantData viewData={viewData as TResponseParticipant<{event:IBaseEvent,user:IBaseUser}>} viewMode={viewMode}/>

          {!viewMode && selectedParticipantId && (
            <UpdateParticipantForm
              id={selectedParticipantId}
              role={role}
              onSuccess={(updated) => {
                setTableData((prev: any) =>
                  prev.map((item: any) =>
                    item.id === updated.id ? updated : item,
                  ),
                );
                setOpen(false);
                setSelectedParticipantId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <PaginationPage pagination={pagination}/>
    </>
  );
}
