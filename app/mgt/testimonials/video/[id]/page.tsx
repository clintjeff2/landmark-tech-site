"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { useLogger } from "@/app/mgt/hooks/useLogger";
import { PageHeader, Alert } from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import type { VideoTestimonial } from "@/app/mgt/lib/types";

export default function VideoTestimonialFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const videoFirestore = useFirestore({
    collectionName: "testimonials",
  });
  const { logCreate, logUpdate, logError } = useLogger();

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [originalData, setOriginalData] =
    useState<Partial<VideoTestimonial> | null>(null);

  const [formData, setFormData] = useState<Partial<VideoTestimonial>>({
    youtubeId: "",
    title: "",
    description: "",
    graduateName: "",
    position: "",
    company: "",
    yearlySalary: "",
    order: 0,
    isActive: true,
    featuredOnHomepage: false,
  });

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const loadTestimonial = async () => {
      try {
        const data = await videoFirestore.getById(id);
        if (data) {
          setFormData(data as Partial<VideoTestimonial>);
          setOriginalData(data as Partial<VideoTestimonial>);
        }
      } catch (err) {
        setError("Failed to load testimonial data");
      } finally {
        setLoading(false);
      }
    };

    loadTestimonial();
  }, [id, isNew]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (!formData.youtubeId || !formData.title) {
        throw new Error("YouTube ID and title are required");
      }

      // Add type field to indicate this is a video testimonial
      const dataToSave = {
        ...formData,
        type: "video",
      };

      const documentTitle = `Video: ${formData.title} - ${formData.graduateName}`;

      if (isNew) {
        const newDocRef = await videoFirestore.create(dataToSave);
        await logCreate("testimonials", newDocRef, documentTitle, dataToSave);
        setSuccess("Video testimonial created successfully!");
      } else {
        await videoFirestore.update(id, dataToSave);
        if (originalData) {
          await logUpdate(
            "testimonials",
            id,
            documentTitle,
            originalData,
            dataToSave
          );
        }
        setSuccess("Video testimonial updated successfully!");
      }

      setTimeout(() => {
        router.push("/mgt/testimonials");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to save testimonial. Please try again.";
      setError(errorMsg);

      // Log the error
      await logError(
        "testimonials",
        isNew ? "create" : "update",
        errorMsg,
        isNew ? undefined : id
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isNew ? "Add Video Testimonial" : "Edit Video Testimonial"}
        description={
          isNew
            ? "Create a new video testimonial"
            : "Update testimonial information"
        }
      />

      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-6 gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </Button>

      <div className="max-w-2xl">
        {error && <Alert type="error" title="Error" message={error} />}
        {success && <Alert type="success" title="Success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Video Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="youtubeId">YouTube Video ID *</Label>
                <Input
                  id="youtubeId"
                  name="youtubeId"
                  value={formData.youtubeId}
                  onChange={handleChange}
                  placeholder="e.g., dQw4w9WgXcQ"
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Video title"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Video description"
                rows={3}
              />
            </div>
          </div>

          {/* Graduate Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Graduate Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="graduateName">Graduate Name</Label>
                <Input
                  id="graduateName"
                  name="graduateName"
                  value={formData.graduateName}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Job title"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="yearlySalary">Yearly Salary</Label>
                <Input
                  id="yearlySalary"
                  name="yearlySalary"
                  value={formData.yearlySalary}
                  onChange={handleChange}
                  placeholder="e.g., $120,000"
                />
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Display Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive || false}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-900 dark:text-white font-medium">
                  Active
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featuredOnHomepage"
                  checked={formData.featuredOnHomepage || false}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-900 dark:text-white font-medium">
                  Featured on Homepage
                </span>
              </label>
            </div>
          </div>

          {/* Order */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2"
              size="lg"
            >
              {submitting
                ? "Saving..."
                : isNew
                ? "Create Testimonial"
                : "Update Testimonial"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/mgt/testimonials")}
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
