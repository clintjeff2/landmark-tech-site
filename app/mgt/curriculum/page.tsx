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
import type { CourseModule, RealWorldProject } from "@/app/mgt/lib/types";
import Link from "next/link";

export default function CurriculumPage() {
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [projects, setProjects] = useState<RealWorldProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"modules" | "projects">("modules");

  const modulesFirestore = useFirestore({
    collectionName: "curriculum/modules",
  });
  const projectsFirestore = useFirestore({
    collectionName: "curriculum/projects",
  });
  const { logDelete, logError } = useLogger();

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const modulesData = (await modulesFirestore.getAll()) || [];
        const projectsData = (await projectsFirestore.getAll()) || [];

        setModules((modulesData as CourseModule[]) || []);
        setProjects((projectsData as RealWorldProject[]) || []);
      } catch (error) {
        console.error("Failed to load curriculum:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCurriculum();
  }, []);

  const handleDeleteModule = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) {
      return;
    }

    try {
      const moduleToDelete = modules.find((m) => m.id === id);
      const documentTitle = moduleToDelete
        ? `Module ${moduleToDelete.number}: ${moduleToDelete.title}`
        : id;

      await modulesFirestore.remove(id);
      await logDelete("curriculum/modules", id, documentTitle);
      setModules(modules.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Failed to delete module:", error);
      await logError(
        "curriculum/modules",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const projectToDelete = projects.find((p) => p.id === id);
      const documentTitle = projectToDelete
        ? `Project ${projectToDelete.number}: ${projectToDelete.title}`
        : id;

      await projectsFirestore.remove(id);
      await logDelete("curriculum/projects", id, documentTitle);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
      await logError(
        "curriculum/projects",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const modulesColumns = [
    { key: "number", label: "#" },
    { key: "title", label: "Title" },
    { key: "duration", label: "Duration" },
    { key: "isActive", label: "Active" },
  ];

  const projectsColumns = [
    { key: "number", label: "#" },
    { key: "title", label: "Title" },
    { key: "difficulty", label: "Difficulty" },
    { key: "isActive", label: "Active" },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title="Curriculum"
        description="Manage course modules and real-world projects"
      >
        <Link
          href={`/mgt/curriculum/${
            activeTab === "modules" ? "modules" : "projects"
          }/new`}
        >
          <Button className="gap-2">
            <Plus size={18} />
            Add {activeTab === "modules" ? "Module" : "Project"}
          </Button>
        </Link>
      </PageHeader>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("modules")}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === "modules"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Modules ({modules.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === "projects"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Projects ({projects.length})
        </button>
      </div>

      {activeTab === "modules" ? (
        modules.length === 0 ? (
          <Alert
            type="info"
            title="No Modules"
            message="Add course modules to build your curriculum."
          />
        ) : (
          <DataTable
            columns={modulesColumns}
            data={modules}
            actions={(row) => (
              <div className="flex gap-2">
                <Link href={`/mgt/curriculum/modules/${row.id}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit2 size={14} />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                  onClick={() => handleDeleteModule(row.id)}
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            )}
          />
        )
      ) : projects.length === 0 ? (
        <Alert
          type="info"
          title="No Projects"
          message="Add real-world projects to enhance your curriculum."
        />
      ) : (
        <DataTable
          columns={projectsColumns}
          data={projects}
          actions={(row) => (
            <div className="flex gap-2">
              <Link href={`/mgt/curriculum/projects/${row.id}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit2 size={14} />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1"
                onClick={() => handleDeleteProject(row.id)}
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
