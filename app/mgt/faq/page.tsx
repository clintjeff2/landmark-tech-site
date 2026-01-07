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
import type { FAQItem, FAQCategory } from "@/app/mgt/lib/types";
import Link from "next/link";

export default function FAQPage() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [items, setItems] = useState<FAQItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const categoriesFirestore = useFirestore({
    collectionName: "faq_categories",
  });
  const itemsFirestore = useFirestore({ collectionName: "faq_items" });
  const { logDelete, logError } = useLogger();

  useEffect(() => {
    const loadFAQ = async () => {
      try {
        const [catData, itemData] = await Promise.all([
          categoriesFirestore.getAll(),
          itemsFirestore.getAll(),
        ]);

        const cats = (catData as FAQCategory[]) || [];
        setCategories(cats);
        setItems((itemData as FAQItem[]) || []);

        if (cats.length > 0) {
          setSelectedCategory(cats[0].id);
        }
      } catch (error) {
        console.error("Failed to load FAQ:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQ();
  }, []);

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const itemToDelete = items.find((i) => i.id === id);
      const category = categories.find(
        (c) => c.id === itemToDelete?.categoryId
      );
      const documentTitle = itemToDelete
        ? `${category?.name} - ${itemToDelete.question}`
        : id;

      await itemsFirestore.remove(id);
      await logDelete("faq_items", id, documentTitle);
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
      await logError(
        "faq_items",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const categoryToDelete = categories.find((c) => c.id === id);
      const documentTitle = categoryToDelete
        ? `FAQ Category: ${categoryToDelete.name}`
        : id;

      await categoriesFirestore.remove(id);
      await logDelete("faq_categories", id, documentTitle);
      setCategories(categories.filter((c) => c.id !== id));
      if (selectedCategory === id) {
        setSelectedCategory(categories[0]?.id || "");
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      await logError(
        "faq_categories",
        "delete",
        error instanceof Error ? error.message : "Unknown error",
        id
      );
    }
  };

  const filteredItems = items.filter(
    (item) => item.categoryId === selectedCategory
  );

  const itemColumns = [
    { key: "question", label: "Question", width: "flex-1" },
    { key: "isActive", label: "Active" },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title="FAQ"
        description="Manage frequently asked questions and answers"
      >
        <Link href="/mgt/faq/new-item">
          <Button className="gap-2">
            <Plus size={18} />
            Add Question
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sticky top-4">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Categories
            </h3>
            <div className="space-y-2 mb-4">
              {categories.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No categories yet
                </p>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex-1 text-left text-sm py-1 px-2 rounded transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {cat.name}
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <Link href="/mgt/faq/new-category">
              <Button variant="outline" size="sm" className="w-full gap-1">
                <Plus size={14} />
                Add Category
              </Button>
            </Link>
          </div>
        </div>

        {/* Items */}
        <div className="lg:col-span-3">
          {selectedCategory ? (
            filteredItems.length === 0 ? (
              <Alert
                type="info"
                title="No Questions"
                message="Add your first FAQ question to this category."
              />
            ) : (
              <DataTable
                columns={itemColumns}
                data={filteredItems}
                actions={(row) => (
                  <div className="flex gap-2">
                    <Link href={`/mgt/faq/${row.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit2 size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleDeleteItem(row.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                )}
              />
            )
          ) : (
            <Alert
              type="info"
              title="No Category Selected"
              message="Select or create a category to manage questions."
            />
          )}
        </div>
      </div>
    </div>
  );
}
