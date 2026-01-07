"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { useLogger } from "@/app/mgt/hooks/useLogger";
import { PageHeader, Alert } from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import type { Pricing, Class } from "@/app/mgt/lib/types";

const CURRENCIES = ["USD", "EUR", "GBP", "CAD"];

export default function PricingFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const pricingFirestore = useFirestore({ collectionName: "pricing" });
  const classesFirestore = useFirestore({ collectionName: "classes" });
  const { logCreate, logUpdate, logError } = useLogger();

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [originalData, setOriginalData] = useState<Partial<Pricing> | null>(
    null
  );

  const [formData, setFormData] = useState<Partial<Pricing>>({
    classId: "",
    basePrice: 0,
    currency: "USD",
    installmentAmount: 0,
    isRefundable: false,
  });

  useEffect(() => {
    // Load classes for the select dropdown
    const loadClasses = async () => {
      try {
        const data = await classesFirestore.getAll();
        setClasses((data as Class[]) || []);
      } catch (err) {
        console.error("Failed to load classes:", err);
      } finally {
        setLoadingClasses(false);
      }
    };

    loadClasses();
  }, []);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const loadPricing = async () => {
      try {
        const data = await pricingFirestore.getById(id);
        if (data) {
          setFormData(data as Partial<Pricing>);
          setOriginalData(data as Partial<Pricing>);
        }
      } catch (err) {
        setError("Failed to load pricing data");
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (!formData.classId) {
        throw new Error("Class ID is required");
      }

      const selectedClass = classes.find((c) => c.id === formData.classId);
      const documentTitle = `Pricing for ${
        selectedClass?.name || formData.classId
      }`;

      if (isNew) {
        const newDocRef = await pricingFirestore.create(formData);
        await logCreate("pricing", newDocRef, documentTitle, formData);
        setSuccess("Pricing created successfully!");
      } else {
        await pricingFirestore.update(id, formData);
        if (originalData) {
          await logUpdate("pricing", id, documentTitle, originalData, formData);
        }
        setSuccess("Pricing updated successfully!");
      }

      setTimeout(() => {
        router.push("/mgt/pricing");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to save pricing. Please try again.";
      setError(errorMsg);

      // Log the error
      const selectedClass = classes.find((c) => c.id === formData.classId);
      const documentTitle = `Pricing for ${
        selectedClass?.name || formData.classId
      }`;
      await logError("pricing", isNew ? "create" : "update", errorMsg, id);
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
        title={isNew ? "Add Pricing" : "Edit Pricing"}
        description={
          isNew ? "Create a new pricing plan" : "Update pricing information"
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
          {/* Basic Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Pricing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="classId">Select Class *</Label>
                {loadingClasses ? (
                  <div className="h-10 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                ) : classes.length === 0 ? (
                  <div className="h-10 flex items-center text-sm text-slate-500">
                    No classes available. Create a class first.
                  </div>
                ) : (
                  <Select
                    value={formData.classId || ""}
                    onValueChange={(value) =>
                      handleSelectChange("classId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a class..." />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.number && classItem.name
                            ? `Class ${classItem.number} - ${classItem.name}`
                            : classItem.name || `Class ${classItem.number}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    handleSelectChange("currency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Price Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basePrice">Base Price</Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="installmentAmount">Installment Amount</Label>
                <Input
                  id="installmentAmount"
                  name="installmentAmount"
                  type="number"
                  value={formData.installmentAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isRefundable"
                checked={formData.isRefundable || false}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-slate-900 dark:text-white font-medium">
                This pricing is refundable
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
                ? "Create Pricing"
                : "Update Pricing"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/mgt/pricing")}
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
