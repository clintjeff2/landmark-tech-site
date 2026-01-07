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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import type { Class } from "@/app/mgt/lib/types";

const TIMEZONES = ["EST", "CST", "MST", "PST", "GMT"];
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CLASS_STATUS = ["upcoming", "ongoing", "completed", "cancelled"];

export default function ClassFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const classesFirestore = useFirestore({ collectionName: "classes" });
  const { logCreate, logUpdate, logError } = useLogger();

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<Partial<Class> | null>(null);

  const [formData, setFormData] = useState<Partial<Class>>({
    number: 0,
    name: "",
    status: "upcoming",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "EST",
    daysOfWeek: [],
    capacity: 0,
    enrolled: 0,
    description: "",
    isCurrentClass: false,
  });

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const loadClass = async () => {
      try {
        const data = await classesFirestore.getById(id);
        if (data) {
          setFormData(data as Partial<Class>);
          setOriginalData(data as Partial<Class>);
          setSelectedDays(
            (data as unknown as { daysOfWeek?: string[] }).daysOfWeek || []
          );
        }
      } catch (err) {
        setError("Failed to load class data");
      } finally {
        setLoading(false);
      }
    };

    loadClass();
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => {
      const updated = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      setFormData((f) => ({ ...f, daysOfWeek: updated }));
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      // Validation
      if (!formData.number || !formData.name) {
        throw new Error("Class number and name are required");
      }

      const dataToSave = {
        ...formData,
        daysOfWeek: selectedDays,
      };

      // If this class is being set as current, unset all other classes
      if (dataToSave.isCurrentClass) {
        const allClasses = await classesFirestore.getAll();
        const updatePromises = allClasses
          .filter((cls: any) => cls.id !== id && cls.isCurrentClass === true)
          .map((cls: any) =>
            classesFirestore.update(cls.id, { isCurrentClass: false })
          );
        await Promise.all(updatePromises);
      }

      const documentTitle = `${dataToSave.name} (Class ${dataToSave.number})`;

      if (isNew) {
        const newDocRef = await classesFirestore.create(dataToSave);
        await logCreate("classes", newDocRef, documentTitle, dataToSave);
        setSuccess("Class created successfully!");
      } else {
        await classesFirestore.update(id, dataToSave);
        if (originalData) {
          await logUpdate(
            "classes",
            id,
            documentTitle,
            originalData,
            dataToSave
          );
        }
        setSuccess("Class updated successfully!");
      }

      setTimeout(() => {
        router.push("/mgt/classes");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to save class. Please try again.";
      setError(errorMsg);

      // Log the error
      await logError(
        "classes",
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
        title={isNew ? "Add Class" : "Edit Class"}
        description={isNew ? "Create a new class" : "Update class information"}
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
          {/* Basic Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Class Number</Label>
                <Input
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="e.g., 41"
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., DevOps Engineering"
                  required
                />
              </div>
            </div>
          </div>

          {/* Status & Schedule */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Schedule & Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_STATUS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) =>
                    handleSelectChange("timezone", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={
                    formData.startDate instanceof Date
                      ? formData.startDate.toISOString().split("T")[0]
                      : formData.startDate || ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={
                    formData.endDate instanceof Date
                      ? formData.endDate.toISOString().split("T")[0]
                      : formData.endDate || ""
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Days of Week */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Days of Week
            </h3>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDays.includes(day)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Capacity & Enrollment */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Capacity & Enrollment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="enrolled">Current Enrollment</Label>
                <Input
                  id="enrolled"
                  name="enrolled"
                  type="number"
                  value={formData.enrolled}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Description
            </h3>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter class description"
              rows={4}
            />
          </div>

          {/* Additional Options */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isCurrentClass"
                checked={formData.isCurrentClass || false}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-slate-900 dark:text-white font-medium">
                Mark as Current Class
              </span>
            </label>
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
                ? "Create Class"
                : "Update Class"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/mgt/classes")}
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
