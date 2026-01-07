"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { PageHeader, LoadingSpinner, Alert } from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteConfiguration } from "@/app/mgt/lib/types";

export default function ConfigurationPage() {
  const [config, setConfig] = useState<SiteConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const configFirestore = useFirestore({ collectionName: "configuration" });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await configFirestore.getAll();
        if (data && data.length > 0) {
          setConfig(data[0] as SiteConfiguration);
        }
      } catch (error) {
        console.error("Failed to load configuration:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (!config) return;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setConfig((prev) =>
        prev
          ? {
              ...prev,
              [name]: target.checked,
            }
          : null
      );
    } else if (name.startsWith("feature_")) {
      const featureName = name.replace("feature_", "");
      setConfig((prev) =>
        prev
          ? {
              ...prev,
              features: {
                ...prev.features,
                [featureName]: (e.target as HTMLInputElement).checked,
              },
            }
          : null
      );
    } else if (name.startsWith("banner_")) {
      const bannerField = name.replace("banner_", "");
      setConfig((prev) =>
        prev
          ? {
              ...prev,
              announcementBanner: {
                ...(prev.announcementBanner || {
                  text: "",
                  backgroundColor: "#3B82F6",
                  textColor: "#FFFFFF",
                  isActive: false,
                }),
                [bannerField]: value,
              },
            }
          : null
      );
    } else {
      setConfig((prev) =>
        prev
          ? {
              ...prev,
              [name]: value,
            }
          : null
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    try {
      await configFirestore.update(config.id, config);
      alert("Configuration updated successfully!");
    } catch (error) {
      console.error("Failed to update configuration:", error);
      alert("Failed to update configuration");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!config) {
    return (
      <div>
        <PageHeader
          title="Configuration"
          description="No configuration found. Please create one first."
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Site Configuration"
        description="Manage site-wide settings and feature flags"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Maintenance Mode */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Maintenance Mode
          </h3>
          <div className="flex items-center gap-3">
            <input
              id="maintenanceMode"
              name="maintenanceMode"
              type="checkbox"
              checked={config.maintenanceMode}
              onChange={handleChange}
              className="rounded"
            />
            <Label htmlFor="maintenanceMode" className="mb-0">
              Enable maintenance mode (hides site from public)
            </Label>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Announcement Banner
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                id="bannerActive"
                name="banner_isActive"
                type="checkbox"
                checked={config.announcementBanner?.isActive || false}
                onChange={handleChange}
                className="rounded"
              />
              <Label htmlFor="bannerActive" className="mb-0">
                Show announcement banner
              </Label>
            </div>

            {config.announcementBanner?.isActive && (
              <>
                <div>
                  <Label htmlFor="bannerText">Banner Text</Label>
                  <Textarea
                    id="bannerText"
                    name="banner_text"
                    value={config.announcementBanner?.text || ""}
                    onChange={handleChange}
                    placeholder="Enter announcement message..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bannerBg">Background Color</Label>
                    <Input
                      id="bannerBg"
                      name="banner_backgroundColor"
                      type="color"
                      value={
                        config.announcementBanner?.backgroundColor || "#3B82F6"
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bannerText">Text Color</Label>
                    <Input
                      id="bannerText"
                      name="banner_textColor"
                      type="color"
                      value={config.announcementBanner?.textColor || "#FFFFFF"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feature Flags */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Features
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                id="enableRegistration"
                name="feature_enableRegistration"
                type="checkbox"
                checked={config.features?.enableRegistration || false}
                onChange={handleChange}
                className="rounded"
              />
              <Label htmlFor="enableRegistration" className="mb-0">
                Enable student registration
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="enableTestimonials"
                name="feature_enableTestimonials"
                type="checkbox"
                checked={config.features?.enableTestimonials || false}
                onChange={handleChange}
                className="rounded"
              />
              <Label htmlFor="enableTestimonials" className="mb-0">
                Show testimonials on website
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="enableConsulting"
                name="feature_enableConsultingCTA"
                type="checkbox"
                checked={config.features?.enableConsultingCTA || false}
                onChange={handleChange}
                className="rounded"
              />
              <Label htmlFor="enableConsulting" className="mb-0">
                Show consulting CTA
              </Label>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Analytics
          </h3>

          <div>
            <Label htmlFor="gaId">Google Analytics ID</Label>
            <Input
              id="gaId"
              name="googleAnalyticsId"
              value={config.googleAnalyticsId || ""}
              onChange={handleChange}
              placeholder="G-XXXXXXXXXX"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Optional: Your Google Analytics tracking ID
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Configuration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
