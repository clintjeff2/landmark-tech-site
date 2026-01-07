"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/mgt/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export type CurrentClassData = {
  id: string;
  number: number;
  name: string;
  status: string;
  startDate: any;
  endDate: any;
  startTime: string;
  endTime: string;
  timezone: string;
  daysOfWeek: string[];
  capacity: number;
  enrolled: number;
  description?: string;
  isCurrentClass: boolean;
};

export type PricingData = {
  id: string;
  classId: string;
  basePrice: number;
  currency: string;
  installmentAmount?: number;
  installmentPeriodMonths?: number;
};

export function useCurrentClass() {
  const [currentClass, setCurrentClass] = useState<CurrentClassData | null>(
    null
  );
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassAndPricing = async () => {
      try {
        // Fetch current class
        const classesRef = collection(db, "classes");
        const currentClassQuery = query(
          classesRef,
          where("isCurrentClass", "==", true)
        );
        const classSnapshot = await getDocs(currentClassQuery);

        if (!classSnapshot.empty) {
          const classDoc = classSnapshot.docs[0];
          const classData = {
            id: classDoc.id,
            ...classDoc.data(),
          } as CurrentClassData;
          setCurrentClass(classData);

          // Fetch pricing for this class
          const pricingRef = collection(db, "pricing");
          const pricingQuery = query(
            pricingRef,
            where("classId", "==", classDoc.id)
          );
          const pricingSnapshot = await getDocs(pricingQuery);

          if (!pricingSnapshot.empty) {
            const pricingDoc = pricingSnapshot.docs[0];
            const pricingData = {
              id: pricingDoc.id,
              ...pricingDoc.data(),
            } as PricingData;
            setPricing(pricingData);
          }
        } else {
          setError("No current class found");
        }
      } catch (err) {
        console.error("Error fetching class and pricing data:", err);
        setError("Failed to load class information");
      } finally {
        setLoading(false);
      }
    };

    fetchClassAndPricing();
  }, []);

  // Helper function to format dates
  const formatDate = (timestamp: any): string => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper function to format price
  const formatPrice = (): string => {
    if (!pricing) return "$3,000";
    return `$${pricing.basePrice.toLocaleString()} ${pricing.currency}`;
  };

  // Helper function to get price value
  const getPriceValue = (): number => {
    return pricing?.basePrice || 3000;
  };

  return {
    currentClass,
    pricing,
    loading,
    error,
    formatDate,
    formatPrice,
    getPriceValue,
  };
}
