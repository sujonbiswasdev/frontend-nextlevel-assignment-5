'use client'
import { FilterPanel } from '@/components/Filter';
import { useFilter } from '@/components/ReusableFilter';
import { TFilterField } from '@/types/filter.types';
import { Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ReusableTable } from '../table/Table';
import { InvitationArr, TResponseInvitation } from '@/types/invitation.types';
import { createInvitationColumns } from './column/invitation.column';

// Sorry, the design is not perfect. Please review the design visually and adjust according to your needs for better alignment, spacing, color, and responsive layout.

const GetOwnInvitations = ({ invitations }: { invitations: TResponseInvitation[] }) => {
    const [loading, setLoading] = useState(true);
    const [tableEvents, setTableEvents] = useState<TResponseInvitation[]>();
    const [open, setOpen] = useState(false);
    const router = useRouter()
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

    React.useEffect(() => {
        setLoading(false);
        setTableEvents(invitations ?? []);
    }, [invitations]);

    const handleChange = (key: string, value: string) => {
        const updated = { ...form, [key]: value };
        setForm(updated);
        updateFilters(updated);
    };


    const ivitationColuems=createInvitationColumns()

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
            onClick: (_event: TResponseInvitation) => {
                // Implement delete functionality as needed
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
                        columns={ivitationColuems as any}
                        data={tableEvents as TResponseInvitation[]}
                        actions={actions}
                        emptyMessage="No invitation found"
                    />
                )}
            </div>
        </section>
    );
}

export default GetOwnInvitations