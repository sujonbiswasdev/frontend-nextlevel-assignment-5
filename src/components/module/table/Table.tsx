'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export function ReusableTable<T extends { id: string }>({
  columns,
  data,
  actions,
  emptyMessage = 'No data found',
  className,
}: ReusableTableProps<T>) {
  return (
    <section className={cn('w-full flex justify-center px-4 sm:px-6 lg:px-8 py-6', className)}>
      
      {/* Main Container */}
      <div className="w-full max-w-[1480px]">
        
        {/* Table Wrapper */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          
          {/* Scroll Container */}
          <div className="w-full overflow-x-auto">
            
            <table className="w-full min-w-[700px] border-collapse">
              
              {/* ================= HEADER ================= */}
              <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      className={cn(
                        'px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap',
                        col.className
                      )}
                    >
                      {col.label}
                    </th>
                  ))}

                  {actions && (
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              {/* ================= BODY ================= */}
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr
                      key={item.id}
                      className={cn(
                        'transition-all duration-200',
                        'hover:bg-gray-50 dark:hover:bg-gray-800',
                        index % 2 === 0
                          ? 'bg-white dark:bg-gray-900'
                          : 'bg-gray-50/40 dark:bg-gray-800/40'
                      )}
                    >
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 break-words"
                        >
                          {col.render
                            ? col.render(item)
                            : (item[col.key] as React.ReactNode)}
                        </td>
                      ))}

                      {/* ================= ACTIONS ================= */}
                      {actions && (
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {actions.map((action, i) => (
                              <button
                                key={i}
                                onClick={() => action.onClick(item)}
                                title={action.label}
                                className={cn(
                                  'p-2 rounded-lg border border-gray-200 dark:border-gray-700',
                                  'bg-white dark:bg-gray-800',
                                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                                  'transition-all duration-200 hover:scale-105',
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
    </section>
  );
}