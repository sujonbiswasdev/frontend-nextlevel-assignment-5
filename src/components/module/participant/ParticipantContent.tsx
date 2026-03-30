"use client";

import { useState } from "react";
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

export default function ParticipantContent({ participants, role }: any) {
  const router = useRouter();
  const [tableData, setTableData] = useState(participants);
  const [open, setOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  console.log(selectedParticipantId, "sf");

  const columns = createParticipantColumns(router);

  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (item: any) => {
        setSelectedParticipantId(item.id);
        setOpen(true);
      },
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (item: any) => {
        setSelectedParticipantId(item.id);
        setOpen(true);
      },
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: any) => {
        if (confirm("Delete?")) {
          setTableData((prev: any) =>
            prev.filter((p: any) => p.id !== item.id),
          );
          toast.success("Deleted");
        }
      },
      className: "text-red-500",
    },
  ];

  return (
    <>
      <ReusableTable columns={columns} data={tableData} actions={actions} />

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedParticipantId(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Participant</DialogTitle>
            <p id="dialog-description" className="text-sm text-gray-500">
              Update the participant status and payment details here.
            </p>
          </DialogHeader>
          {selectedParticipantId && (
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
    </>
  );
}
