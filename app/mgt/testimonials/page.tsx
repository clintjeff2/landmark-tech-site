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
import type { VideoTestimonial, WrittenTestimonial } from "@/app/mgt/lib/types";
import Link from "next/link";

export default function TestimonialsPage() {
  const [videoTestimonials, setVideoTestimonials] = useState<
    VideoTestimonial[]
  >([]);
  const [writtenTestimonials, setWrittenTestimonials] = useState<
    WrittenTestimonial[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "written">("video");

  const testimonialsFirestore = useFirestore({
    collectionName: "testimonials",
  });
  const { logDelete, logError } = useLogger();

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const allData = (await testimonialsFirestore.getAll()) || [];

        // Filter by type
        const videoData = allData.filter(
          (t: any) => t.type === "video"
        ) as VideoTestimonial[];
        const writtenData = allData.filter(
          (t: any) => t.type === "written"
        ) as WrittenTestimonial[];

        setVideoTestimonials(videoData);
        setWrittenTestimonials(writtenData);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const handleDeleteVideo = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      const videoToDelete = videoTestimonials.find((t) => t.id === id);
      const documentTitle = videoToDelete
        ? `Video: ${videoToDelete.title} - ${videoToDelete.graduateName}`
        : id;

      await testimonialsFirestore.remove(id);
      await logDelete("testimonials", id, documentTitle);
      setVideoTestimonials(videoTestimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete video:", error);
      await logError(
        "testimonials",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const handleDeleteWritten = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      const writtenToDelete = writtenTestimonials.find((t) => t.id === id);
      const documentTitle = writtenToDelete
        ? `Written: ${writtenToDelete.graduateName} - ${writtenToDelete.jobRole}`
        : id;

      await testimonialsFirestore.remove(id);
      await logDelete("testimonials", id, documentTitle);
      setWrittenTestimonials(writtenTestimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      await logError(
        "testimonials",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const videoColumns = [
    { key: "title", label: "Title" },
    { key: "graduateName", label: "Graduate" },
    { key: "company", label: "Company" },
    { key: "yearlySalary", label: "Salary" },
    { key: "isActive", label: "Active" },
  ];

  const writtenColumns = [
    { key: "graduateName", label: "Name" },
    { key: "jobRole", label: "Role" },
    { key: "company", label: "Company" },
    { key: "rating", label: "Rating" },
    { key: "isActive", label: "Active" },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage video and written testimonials"
      >
        <Link
          href={`/mgt/testimonials/${
            activeTab === "video" ? "video" : "written"
          }/new`}
        >
          <Button className="gap-2">
            <Plus size={18} />
            Add {activeTab === "video" ? "Video" : "Written"}
          </Button>
        </Link>
      </PageHeader>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("video")}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === "video"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Video Testimonials ({videoTestimonials.length})
        </button>
        <button
          onClick={() => setActiveTab("written")}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === "written"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Written Testimonials ({writtenTestimonials.length})
        </button>
      </div>

      {activeTab === "video" ? (
        videoTestimonials.length === 0 ? (
          <Alert
            type="info"
            title="No Video Testimonials"
            message="Add your first video testimonial to showcase graduate success stories."
          />
        ) : (
          <DataTable
            columns={videoColumns}
            data={videoTestimonials}
            actions={(row) => (
              <div className="flex gap-2">
                <Link href={`/mgt/testimonials/video/${row.id}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit2 size={14} />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                  onClick={() => handleDeleteVideo(row.id)}
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            )}
          />
        )
      ) : writtenTestimonials.length === 0 ? (
        <Alert
          type="info"
          title="No Written Testimonials"
          message="Add your first written testimonial to showcase graduate success stories."
        />
      ) : (
        <DataTable
          columns={writtenColumns}
          data={writtenTestimonials}
          actions={(row) => (
            <div className="flex gap-2">
              <Link href={`/mgt/testimonials/written/${row.id}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit2 size={14} />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1"
                onClick={() => handleDeleteWritten(row.id)}
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
