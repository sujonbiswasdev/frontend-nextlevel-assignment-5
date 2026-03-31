'use client'
import { FilterPanel } from '@/components/Filter';
import { useFilter } from '@/components/ReusableFilter';
import { EventArr, IBaseEvent, TGroupedEvents, TPagination } from '@/types/event.types';
import { TFilterField } from '@/types/filter.types';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ReusableTable } from '../table/Table';
import { InvitationArr, TOwnInvitations, TResponseInvitation } from '@/types/invitation.types';


const GetOwnInvitations = ({ invitations }:{invitations: TOwnInvitations<TResponseInvitation[]>}) => {

    const [loading, setLoading] = useState(true);
    console.log(invitations,'invi')

    React.useEffect(() => {
        setLoading(false);
        setTableEvents(invitations.sentInvitations?? []);
    }, [invitations]);

    const [tableEvents, setTableEvents] = useState<TResponseInvitation[]>();
    const [open, setOpen] = useState(false);
    const router=useRouter()
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [form, setForm] = useState({
        eventId: "",
        inviterId: "",
        inviteeId: "",
        status: "",
        message: "",
        createdAt: "",
      });
      const { updateFilters, reset } = useFilter();
      const handleChange = (key: string, value: string) => {
        const updated = { ...form, [key]: value };
        setForm(updated);
    
        updateFilters(updated);
      };

      const columns = [
        { key: "id", label: "ID" },
        { key: "eventId", label: "Event ID" },
        { key: "inviterId", label: "Inviter" },
        { key: "inviteeId", label: "Invitee" },
        { key: "status", label: "Status" },
        { key: "message", label: "Message" },
        { key: "createdAt", label: "Invited At", render: (e: any) => e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "" },
      ];

      const actions = [
        {
          icon: Eye,
          label: "View",
          onClick: (event: TResponseInvitation) => router.push(`/events/${event.id}`),
          className: "text-green-500",
        },
        {
          icon: Pencil,
          label: "Edit",
          onClick: (event: TResponseInvitation) => {
            setSelectedEventId(event.id);
            setOpen(true);
          },
          className: "text-blue-500",
        },
        {
          icon: Trash2,
          label: "Delete",
          onClick: (event: TResponseInvitation) => {
         
          },
          className: "text-red-500",
        },
      ];

      const fields: TFilterField[] = [
        {
          type: "text",
          name: "eventId",
          value: form.eventId|| "",
          placeholder: "Search title, description, categories, or venue",
          onChange: (val) => handleChange("search", val),
        },
        {
          type: "text",
          name: "inviteeId",
          value: form.inviteeId || "",
          onChange: (val) => handleChange("inviteeId", val),
        },
        {
          type: "text",
          name: "inviterId",
          value: form.inviterId,
          onChange: (val) => handleChange("inviterId", val),
        },
        {
          type: "select",
          name: "status",
          label: "Status",
          value: form.status,
          onChange: (val) => handleChange("status", val),
          options: InvitationArr.INVITATION_Status_ARR.map((v) => ({ label: v, value: v })),
        },
        {
          type: "date",
          name: "createdAt",
          value: form.createdAt || "",
          onChange: (val) => handleChange("createdAt", val),
        },
      ];
    

  return (
    <div>
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
            data={tableEvents as TResponseInvitation[]}
            actions={actions}
            emptyMessage="No events found"
          />
        )}
      </div>
    </div>
  )
}

export default GetOwnInvitations