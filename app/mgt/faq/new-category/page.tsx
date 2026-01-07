"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { useLogger } from "@/app/mgt/hooks/useLogger";
import { PageHeader, Alert } from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import type { FAQCategory } from "@/app/mgt/lib/types";

export default function NewFAQCategoryPage() {
  const router = useRouter();

  const categoriesFirestore = useFirestore({
    collectionName: "faq_categories",
  });
  const { logCreate, logError } = useLogger();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<Partial<FAQCategory>>({
    name: "",
    slug: "",
    description: "",
    order: 0,
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : type === "number"
            ? Number(value)
            : value,
      };

      // Auto-generate slug from name if name is being updated
      if (name === "name") {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (!formData.name) {
        throw new Error("Category name is required");
      }

      const newDocRef = await categoriesFirestore.create(formData);
      const documentTitle = `FAQ Category: ${formData.name}`;
      await logCreate("faq_categories", newDocRef, documentTitle, formData);
      setSuccess("Category created successfully!");

      setTimeout(() => {
        router.push("/mgt/faq");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to save category. Please try again.";
      setError(errorMsg);

      // Log the error
      await logError("faq_categories", "create", errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add FAQ Category"
        description="Create a new FAQ category"
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
          {/* Category Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Category Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., General Questions"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="auto-generated from name"
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Category description"
                  rows={3}
                />
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

          {/* Form Actions */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2"
              size="lg"
            >
              {submitting ? "Saving..." : "Create Category"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/mgt/faq")}
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
