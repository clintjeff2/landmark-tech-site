"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { useLogger } from "@/app/mgt/hooks/useLogger";
import {
  PageHeader,
  DataTable,
  LoadingSpinner,
  Alert,
} from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { Class } from "@/app/mgt/lib/types";
import Link from "next/link";

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const classesFirestore = useFirestore({ collectionName: "classes" });
  const { logDelete, logError } = useLogger();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await classesFirestore.getAll();
        setClasses((data as Class[]) || []);
      } catch (error) {
        console.error("Failed to load classes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }

    try {
      const classToDelete = classes.find((c) => c.id === id);
      const documentTitle = classToDelete
        ? `${classToDelete.name} (Class ${classToDelete.number})`
        : id;

      await classesFirestore.remove(id);
      await logDelete("classes", id, documentTitle);
      setClasses(classes.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete class:", error);
      await logError(
        "classes",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const columns = [
    { key: "number", label: "Class #" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "enrolled", label: "Enrolled" },
    { key: "capacity", label: "Capacity" },
  ];

  return (
    <div>
      <PageHeader
        title="Classes"
        description="Manage your course classes and cohorts"
      >
        <Link href="/mgt/classes/new">
          <Button className="gap-2">
            <Plus size={18} />
            Add Class
          </Button>
        </Link>
      </PageHeader>

      {loading ? (
        <LoadingSpinner />
      ) : classes.length === 0 ? (
        <Alert
          type="info"
          title="No Classes"
          message="Create your first class to get started."
        />
      ) : (
        <DataTable
          columns={columns}
          data={classes}
          actions={(row) => (
            <div className="flex gap-2">
              <Link href={`/mgt/classes/${row.id}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit2 size={14} />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1"
                onClick={() => handleDelete(row.id)}
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          )}
        />
      )}
    </div>
  );
}
