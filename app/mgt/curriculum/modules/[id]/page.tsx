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
import type { CourseModule } from "@/app/mgt/lib/types";

export default function ModuleFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const modulesFirestore = useFirestore({
    collectionName: "curriculum/modules",
  });
  const { logCreate, logUpdate, logError } = useLogger();

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [originalData, setOriginalData] =
    useState<Partial<CourseModule> | null>(null);

  const [formData, setFormData] = useState<Partial<CourseModule>>({
    number: 0,
    title: "",
    duration: "",
    durationHours: 0,
    description: "",
    topics: [],
    order: 0,
    isActive: true,
  });

  const [topicInput, setTopicInput] = useState("");

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const loadModule = async () => {
      try {
        const data = await modulesFirestore.getById(id);
        if (data) {
          setFormData(data as Partial<CourseModule>);
          setOriginalData(data as Partial<CourseModule>);
        }
      } catch (err) {
        setError("Failed to load module data");
      } finally {
        setLoading(false);
      }
    };

    loadModule();
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

  const addTopic = () => {
    if (topicInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        topics: [...(prev.topics || []), topicInput],
      }));
      setTopicInput("");
    }
  };

  const removeTopic = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      topics: (prev.topics || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (!formData.title || !formData.duration) {
        throw new Error("Title and duration are required");
      }

      const documentTitle = `Module ${formData.number}: ${formData.title}`;

      if (isNew) {
        const newDocRef = await modulesFirestore.create(formData);
        await logCreate(
          "curriculum/modules",
          newDocRef,
          documentTitle,
          formData
        );
        setSuccess("Module created successfully!");
      } else {
        await modulesFirestore.update(id, formData);
        if (originalData) {
          await logUpdate(
            "curriculum/modules",
            id,
            documentTitle,
            originalData,
            formData
          );
        }
        setSuccess("Module updated successfully!");
      }

      setTimeout(() => {
        router.push("/mgt/curriculum");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to save module. Please try again.";
      setError(errorMsg);

      // Log the error
      await logError(
        "curriculum/modules",
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
        title={isNew ? "Add Module" : "Edit Module"}
        description={
          isNew ? "Create a new module" : "Update module information"
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
          {/* Module Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Module Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Module Number</Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="1"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Module title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (e.g., "4 weeks") *</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 4 weeks"
                  required
                />
              </div>
              <div>
                <Label htmlFor="durationHours">Duration (Hours)</Label>
                <Input
                  id="durationHours"
                  name="durationHours"
                  type="number"
                  value={formData.durationHours}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
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
                placeholder="Module description"
                rows={3}
              />
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Topics Covered
            </h3>
            <div className="flex gap-2 mb-4">
              <Input
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Add a topic"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTopic();
                  }
                }}
              />
              <Button type="button" onClick={addTopic} variant="outline">
                Add
              </Button>
            </div>

            {(formData.topics || []).length > 0 && (
              <div className="space-y-2">
                {(formData.topics || []).map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-3 rounded"
                  >
                    <span className="text-slate-900 dark:text-white">
                      {topic}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Display Options */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
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
                ? "Create Module"
                : "Update Module"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/mgt/curriculum")}
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
