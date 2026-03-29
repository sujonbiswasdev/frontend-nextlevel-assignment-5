'use client'
import { IBaseEvent } from '@/types/event.types'
import { TResponseParticipant } from '@/types/participant.types'
import { IBaseUser } from '@/types/user.types'
import React from 'react'
import { Edit, Eye, Pencil, Trash2 } from 'lucide-react'
import { ReusableTable } from '../table/Table'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const actions = [
  {
    icon: Eye,
    label: 'View',
    onClick: (item: any) => console.log('View', item),
  },
  {
    icon: Pencil,
    label: 'Edit',
    onClick: (item: any) => console.log('Edit', item),
  },
  {
    icon: Trash2,
    label: 'Delete',
    onClick: (item: any) => console.log('Delete', item),
    className: 'text-red-500',
  },
];
const ParticipantContent = ({participants}:{participants:TResponseParticipant<{user:IBaseUser[],event:IBaseEvent[]}>[]}) => {
  const router =useRouter()
  const columns = [
    { 
      key: 'id', 
      label: 'ID',
      className: 'text-sm py-2', // increased from text-[11px] py-1
      render:(p:any)=><span className="text-sm">{p.id.slice(0,2)}</span>
    },
    { 
      key: 'userId',
      label: 'userId',
      className: 'text-sm py-2',
      render:(p:any)=>(
        <div>
          <span className="text-sm cursor-pointer inline-block px-2 py-1 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 font-mono">
            {p.userId.slice(0,5)}...
          </span>
        </div>
      )
    },
    { 
      key: 'eventId', 
      label: 'eventId',
      className: 'text-sm py-2',
      render: (p:any) =>{
        return <Button className="cursor-pointer" onClick={()=>router.push(`/events/${p.eventId}`)}>{p.eventId.slice(0,5)}....</Button>
      }
    },
    { 
      key: "status",
      label: "Status",
      className: 'text-sm py-2',
      render: (p: any) => {
        let colorClass = "text-gray-500";
        switch (p.status) {
          case "PENDING":
            colorClass = "text-yellow-500";
            break;
          case "APPROVED":
            colorClass = "text-green-500";
            break;
          case "REJECTED":
            colorClass = "text-red-500";
            break;
          case "BANNED":
            colorClass = "text-purple-700";
            break;
        }
        return <span className={colorClass + " text-sm"}>{p.status}</span>
      }
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      className: 'text-sm py-2',
      render: (p: any) => {
        switch (p.paymentStatus) {
          case 'PAID':
            return (
              <span className="text-sm inline-block px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-semibold">
                PAID
              </span>
            );
          case 'UNPAID':
            return (
              <span className="text-sm inline-block px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 font-semibold">
                UNPAID
              </span>
            );
          case 'FREE':
            return (
              <span className="text-sm inline-block px-2 py-1 rounded bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200 font-semibold">
                FREE atake kore daw
              </span>
            );
          default:
            return <span className="text-sm text-gray-400">N/A</span>;
        }
      },
    },
    { 
      key: 'joinedAt', 
      label: 'Joined At',
      className: 'text-sm py-2',
      render: (p: any) => (
        <span className="text-sm inline-block px-2 py-1 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-semibold">
          {p.joinedAt ? new Date(p.joinedAt).toLocaleString() : <span className="text-gray-400">N/A</span>}
        </span>
      )
    },
  ];
  return (
    <div>
        <ReusableTable
          columns={columns as any}
          data={participants}
          actions={actions}
        />
    </div>
  )
}

export default ParticipantContent