"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { PageHeader, LoadingSpinner, Alert } from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatActionName, formatCollectionName } from "@/app/mgt/lib/logger";
import { CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import type { AdminLog } from "@/app/mgt/lib/types";

export default function LogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState("all");
  const [filterCollection, setFilterCollection] = useState("all");
  const [filterEmail, setFilterEmail] = useState("");

  const logsFirestore = useFirestore({ collectionName: "logs" });

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await logsFirestore.getAll();
        const sortedLogs = ((data as AdminLog[]) || []).sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(sortedLogs);
        setFilteredLogs(sortedLogs);
      } catch (error) {
        console.error("Failed to load logs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = logs;

    if (filterAction !== "all") {
      filtered = filtered.filter((log) => log.action === filterAction);
    }

    if (filterCollection !== "all") {
      filtered = filtered.filter((log) => log.collection === filterCollection);
    }

    if (filterEmail) {
      filtered = filtered.filter((log) =>
        log.adminEmail.toLowerCase().includes(filterEmail.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [logs, filterAction, filterCollection, filterEmail]);

  const handleClearLogs = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all logs? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        logs.map((log) => log.id && logsFirestore.remove(log.id))
      );
      setLogs([]);
      setFilteredLogs([]);
    } catch (error) {
      console.error("Failed to clear logs:", error);
    }
  };

  const handleDeleteLog = async (id: string) => {
    try {
      await logsFirestore.remove(id);
      setLogs(logs.filter((log) => log.id !== id));
    } catch (error) {
      console.error("Failed to delete log:", error);
    }
  };

  const getUniqueActions = (): string[] => {
    return [...new Set(logs.map((log) => log.action))].sort();
  };

  const getUniqueCollections = (): string[] => {
    return [...new Set(logs.map((log) => log.collection))].sort();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title="Activity Logs"
        description="Track all admin actions and system activities"
      />

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Action
          </label>
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {getUniqueActions().map((action) => (
                <SelectItem key={action} value={action}>
                  {formatActionName(action)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Collection
          </label>
          <Select value={filterCollection} onValueChange={setFilterCollection}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              {getUniqueCollections().map((collection) => (
                <SelectItem key={collection} value={collection}>
                  {formatCollectionName(collection)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Admin
          </label>
          <Input
            placeholder="Admin email..."
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="destructive"
            onClick={handleClearLogs}
            className="w-full"
          >
            Clear All Logs
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      {filteredLogs.length === 0 ? (
        <Alert
          type="info"
          title="No Activity"
          message={
            logs.length === 0
              ? "No admin actions recorded yet."
              : "No logs match the current filters."
          }
        />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Collection
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                      {log.adminEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      {formatActionName(log.action)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      {formatCollectionName(log.collection)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 max-w-xs truncate">
                      {log.documentTitle || log.documentId || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {log.status === "success" ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Success</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-red-600">Error</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => log.id && handleDeleteLog(log.id)}
                        className="text-slate-500 hover:text-red-600 transition-colors"
                        title="Delete log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredLogs.length} of {logs.length} total logs
          </div>
        </div>
      )}
    </div>
  );
}
