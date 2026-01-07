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
import type { Pricing } from "@/app/mgt/lib/types";
import Link from "next/link";

export default function PricingPage() {
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(true);
  const pricingFirestore = useFirestore({ collectionName: "pricing" });
  const { logDelete, logError } = useLogger();

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await pricingFirestore.getAll();
        setPricing((data as Pricing[]) || []);
      } catch (error) {
        console.error("Failed to load pricing:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this pricing?")) {
      return;
    }

    try {
      const pricingToDelete = pricing.find((p) => p.id === id);
      const documentTitle = pricingToDelete
        ? `Pricing for ${pricingToDelete.classId}`
        : id;

      await pricingFirestore.remove(id);
      await logDelete("pricing", id, documentTitle);
      setPricing(pricing.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete pricing:", error);
      await logError(
        "pricing",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const columns = [
    { key: "classId", label: "Class ID" },
    { key: "basePrice", label: "Base Price" },
    { key: "currency", label: "Currency" },
    { key: "installmentAmount", label: "Installment" },
    { key: "isRefundable", label: "Refundable" },
  ];

  return (
    <div>
      <PageHeader title="Pricing" description="Manage pricing for your classes">
        <Link href="/mgt/pricing/new">
          <Button className="gap-2">
            <Plus size={18} />
            Add Pricing
          </Button>
        </Link>
      </PageHeader>

      {loading ? (
        <LoadingSpinner />
      ) : pricing.length === 0 ? (
        <Alert
          type="info"
          title="No Pricing"
          message="Create pricing for your classes."
        />
      ) : (
        <DataTable
          columns={columns}
          data={pricing}
          actions={(row) => (
            <div className="flex gap-2">
              <Link href={`/mgt/pricing/${row.id}`}>
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
