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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import type { FAQItem, FAQCategory } from "@/app/mgt/lib/types";

export default function NewFAQItemPage() {
  const router = useRouter();
  const { logCreate, logError } = useLogger();

  const itemsFirestore = useFirestore({ collectionName: "faq_items" });
  const categoriesFirestore = useFirestore({
    collectionName: "faq_categories",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState<FAQCategory[]>([]);

  const [formData, setFormData] = useState<Partial<FAQItem>>({
    categoryId: "",
    question: "",
    answer: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = (await categoriesFirestore.getAll()) || [];
        setCategories((cats as FAQCategory[]) || []);
      } catch (err) {
        setError("Failed to load categories");
        await logError(
          "faq_items",
          "loadCategories",
          err instanceof Error ? err.message : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (!formData.categoryId || !formData.question || !formData.answer) {
        throw new Error("Category, question, and answer are required");
      }

      // Find the category name for the document title
      const category = categories.find((c) => c.id === formData.categoryId);
      const documentTitle = `${category?.name} - ${formData.question}`;

      const docRef = await itemsFirestore.create(formData);
      setSuccess("FAQ item created successfully!");

      // Log the creation
      await logCreate("faq_items", docRef, documentTitle, formData);

      setTimeout(() => {
        router.push("/mgt/faq");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to save FAQ item. Please try again.";
      setError(errorMessage);
      await logError("faq_items", "create", errorMessage);
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
      <PageHeader title="Add FAQ Item" description="Create a new FAQ item" />

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
          {/* Category & Question */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Question Information
            </h3>
            <div>
              <Label htmlFor="categoryId">Category *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  handleSelectChange("categoryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4">
              <Label htmlFor="question">Question *</Label>
              <Input
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter the FAQ question"
                required
              />
            </div>
          </div>

          {/* Answer */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Answer
            </h3>
            <Label htmlFor="answer">Answer *</Label>
            <Textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter the FAQ answer"
              rows={5}
              required
            />
          </div>

          {/* Display Options */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Display Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <label className="flex items-center gap-3 cursor-pointer mt-4">
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
              {submitting ? "Saving..." : "Create Item"}
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
