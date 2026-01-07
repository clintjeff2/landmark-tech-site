"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import {
  PageHeader,
  StatCard,
  LoadingSpinner,
} from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CompanyMetrics } from "@/app/mgt/lib/types";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<CompanyMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const metricsFirestore = useFirestore({ collectionName: "metrics" });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await metricsFirestore.getAll();
        if (data && data.length > 0) {
          setMetrics(data[0] as CompanyMetrics);
        }
      } catch (error) {
        console.error("Failed to load metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics((prev) =>
      prev
        ? {
            ...prev,
            [name]: isNaN(Number(value)) ? value : Number(value),
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!metrics) return;

    setSaving(true);
    try {
      await metricsFirestore.update(metrics.id, metrics);
      alert("Metrics updated successfully!");
    } catch (error) {
      console.error("Failed to update metrics:", error);
      alert("Failed to update metrics");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!metrics) {
    return (
      <div>
        <PageHeader
          title="Metrics"
          description="No metrics found. Please create one first."
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Company Metrics"
        description="Update your company statistics and achievements"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Students & Graduates */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
            Students & Graduates
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalGraduates">Total Graduates *</Label>
              <Input
                id="totalGraduates"
                name="totalGraduates"
                type="number"
                value={metrics.totalGraduates}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="jobPlacementRate">Job Placement Rate (%) *</Label>
              <Input
                id="jobPlacementRate"
                name="jobPlacementRate"
                type="number"
                value={metrics.jobPlacementRate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Salary Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
            Salary Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="averageSalary">Average Salary ($) *</Label>
              <Input
                id="averageSalary"
                name="averageSalary"
                type="number"
                value={metrics.averageSalary}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="averageConsultingSalary">
                Average Consulting Salary ($)
              </Label>
              <Input
                id="averageConsultingSalary"
                name="averageConsultingSalary"
                type="number"
                value={metrics.averageConsultingSalary || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Business Metrics */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
            Business Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="enterpriseClients">Enterprise Clients *</Label>
              <Input
                id="enterpriseClients"
                name="enterpriseClients"
                type="number"
                value={metrics.enterpriseClients}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientProjectValue">
                Client Project Value ($) *
              </Label>
              <Input
                id="clientProjectValue"
                name="clientProjectValue"
                type="number"
                value={metrics.clientProjectValue}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
            Course Information
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="courseModules">Course Modules *</Label>
              <Input
                id="courseModules"
                name="courseModules"
                type="number"
                value={metrics.courseModules}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="courseDurationHours">
                Course Duration (hours) *
              </Label>
              <Input
                id="courseDurationHours"
                name="courseDurationHours"
                type="number"
                value={metrics.courseDurationHours}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="realWorldProjects">Real World Projects *</Label>
              <Input
                id="realWorldProjects"
                name="realWorldProjects"
                type="number"
                value={metrics.realWorldProjects}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
            Company Information
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="yearsInBusiness">Years in Business *</Label>
              <Input
                id="yearsInBusiness"
                name="yearsInBusiness"
                type="number"
                value={metrics.yearsInBusiness}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="countriesReached">Countries Reached *</Label>
              <Input
                id="countriesReached"
                name="countriesReached"
                type="number"
                value={metrics.countriesReached}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="studentSatisfactionRate">
                Student Satisfaction (%)
              </Label>
              <Input
                id="studentSatisfactionRate"
                name="studentSatisfactionRate"
                type="number"
                value={metrics.studentSatisfactionRate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Metrics"}
          </Button>
        </div>
      </form>
    </div>
  );
}
