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
  className?: string;
}

interface ReusableTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  emptyMessage?: string;
  className?: string;
}

export function ReusableTable<T extends { id: string }>({
  columns,
  data,
  actions,
  emptyMessage = 'No data found',
  className,
}: ReusableTableProps<T>) {
  return (
    <section className={cn('w-full flex justify-center px-4 sm:px-6 lg:px-8 py-6', className)}>
      <div className="w-full max-w-[1480px]">
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="w-full overflow-x-auto">
            <div className="min-h-[420px]">
              <table className="w-full min-w-[700px] border-collapse">
                
                {/* HEADER */}
                <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
                  <tr style={{ height: 52 }}>
                    {columns.map((col) => (
                      <th
                        key={String(col.key)}
                        className="px-6 text-left text-xs font-semibold uppercase text-gray-500"
                      >
                        {col.label}
                      </th>
                    ))}
                    {actions && <th className="px-6 text-left text-xs font-semibold">Actions</th>}
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                        {emptyMessage}
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr
                        key={item.id}
                        className={cn(
                          'hover:bg-gray-50 dark:hover:bg-gray-800',
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        )}
                      >
                        {columns.map((col) => (
                          <td key={String(col.key)} className="px-6 py-3 text-sm">
                            {col.render
                              ? col.render(item)
                              : (item[col.key] as React.ReactNode)}
                          </td>
                        ))}

                        {actions && (
                          <td className="px-6 py-3">
                            <div className="flex gap-2">
                              {actions.map((action, i) => (
                                <button
                                  key={i}
                                  onClick={() => action.onClick(item)} // ✅ FIXED
                                  className={cn(
                                    'p-2 rounded-lg border hover:bg-gray-100 transition',
                                    action.className
                                  )}
                                >
                                  <action.icon className="w-4 h-4" />
                                </button>
                              ))}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}