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
import type { WrittenTestimonial } from "@/app/mgt/lib/types";

const RATINGS = ["1", "2", "3", "4", "5"];

export default function WrittenTestimonialFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const writtenFirestore = useFirestore({
    collectionName: "testimonials",
  });
  const { logCreate, logUpdate, logError } = useLogger();

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [originalData, setOriginalData] =
    useState<Partial<WrittenTestimonial> | null>(null);

  const [formData, setFormData] = useState<Partial<WrittenTestimonial>>({
    graduateName: "",
    jobRole: "",
    company: "",
    testimonialText: "",
    yearlySalary: "",
    rating: 5,
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
        const data = await writtenFirestore.getById(id);
        if (data) {
          setFormData(data as Partial<WrittenTestimonial>);
          setOriginalData(data as Partial<WrittenTestimonial>);
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (
        !formData.graduateName ||
        !formData.jobRole ||
        !formData.company ||
        !formData.testimonialText
      ) {
        throw new Error("All required fields must be filled");
      }

      // Add type field to indicate this is a written testimonial
      const dataToSave = {
        ...formData,
        type: "written",
      };

      const documentTitle = `Written: ${formData.graduateName} - ${formData.jobRole} at ${formData.company}`;

      if (isNew) {
        const newDocRef = await writtenFirestore.create(dataToSave);
        await logCreate("testimonials", newDocRef, documentTitle, dataToSave);
        setSuccess("Written testimonial created successfully!");
      } else {
        await writtenFirestore.update(id, dataToSave);
        if (originalData) {
          await logUpdate(
            "testimonials",
            id,
            documentTitle,
            originalData,
            dataToSave
          );
        }
        setSuccess("Written testimonial updated successfully!");
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
        title={isNew ? "Add Written Testimonial" : "Edit Written Testimonial"}
        description={
          isNew
            ? "Create a new written testimonial"
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
          {/* Graduate Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Graduate Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="graduateName">Graduate Name *</Label>
                <Input
                  id="graduateName"
                  name="graduateName"
                  value={formData.graduateName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="jobRole">Job Role *</Label>
                <Input
                  id="jobRole"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  placeholder="Job title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
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

          {/* Testimonial Text */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Testimonial
            </h3>
            <Label htmlFor="testimonialText">Testimonial Text *</Label>
            <Textarea
              id="testimonialText"
              name="testimonialText"
              value={formData.testimonialText}
              onChange={handleChange}
              placeholder="Write the testimonial here..."
              rows={5}
              required
            />
          </div>

          {/* Rating & Display */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Rating & Display
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Select
                  value={String(formData.rating)}
                  onValueChange={(value) => handleSelectChange("rating", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RATINGS.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating} ⭐
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
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
            </div>

            <div className="space-y-3 mt-4">
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
