'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableAction<T> {
  icon: LucideIcon;
  label: string;
  onClick: (item: T) => void;
  color?: string; // Tailwind color e.g. "bg-red-500 text-white"
}

interface ReusableTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  emptyMessage?: string;
}

export function AdvancedTable<T extends { id: string }>({
  columns,
  data,
  actions,
  emptyMessage = 'No data found',
}: ReusableTableProps<T>) {
  return (
    <div className="w-full flex justify-center px-4 md:px-8 lg:px-12 py-6">
      <div className="w-full max-w-[1480px] overflow-x-auto rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        
        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          
          {/* Header */}
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider',
                    col.className
                  )}
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors transform hover:scale-[1.01]"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-6 py-4 text-gray-700 dark:text-gray-300 break-words"
                    >
                      {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                    </td>
                  ))}

                  {actions && (
                    <td className="px-6 py-4 flex gap-2">
                      {actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => act.onClick(item)}
                          className={cn(
                            'p-2 rounded-lg hover:scale-110 transition-transform shadow-sm',
                            act.color || 'bg-indigo-500 text-white'
                          )}
                          title={act.label}
                        >
                          <act.icon className="w-5 h-5" />
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}