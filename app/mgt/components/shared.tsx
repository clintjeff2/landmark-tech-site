"use client";

import { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {children && <div className="flex gap-2">{children}</div>}
      </div>
    </div>
  );
}

interface DataTableProps {
  columns: Array<{ key: string; label: string; width?: string }>;
  data: any[];
  loading?: boolean;
  actions?: (row: any) => ReactNode;
}

export function DataTable({
  columns,
  data,
  loading = false,
  actions,
}: DataTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No data found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
      <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white ${
                  col.width || ""
                }`}
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id || idx}
              className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300"
                >
                  {renderCellValue(row[col.key])}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right">{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCellValue(value: any): ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-slate-400">—</span>;
  }

  if (typeof value === "boolean") {
    return value ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-medium">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded text-xs font-medium">
        Inactive
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {value.slice(0, 3).map((item, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs"
          >
            {item}
          </span>
        ))}
        {value.length > 3 && (
          <span className="px-2 py-1 text-xs text-slate-500">
            +{value.length - 3}
          </span>
        )}
      </div>
    );
  }

  if (typeof value === "object") {
    return <code className="text-xs">{JSON.stringify(value)}</code>;
  }

  return <span>{value}</span>;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              {change}
            </p>
          )}
        </div>
        {icon && <div className="text-3xl opacity-20">{icon}</div>}
      </div>
    </div>
  );
}

interface AlertProps {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
}

export function Alert({ type, title, message }: AlertProps) {
  const variants = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: <Info className="text-blue-600 dark:text-blue-400" />,
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      icon: <CheckCircle className="text-green-600 dark:text-green-400" />,
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: <AlertCircle className="text-yellow-600 dark:text-yellow-400" />,
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      icon: <XCircle className="text-red-600 dark:text-red-400" />,
    },
  };

  const variant = variants[type];

  return (
    <div
      className={`${variant.bg} border ${variant.border} rounded-lg p-4 mb-6`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{variant.icon}</div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
