"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/app/mgt/hooks/useFirestore";
import { PageHeader, LoadingSpinner, Alert } from "@/app/mgt/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import type {
  ContactPhone,
  ContactEmail,
  SocialLink,
  RegionalPaymentInfo,
} from "@/app/mgt/lib/types";

export default function ContactPage() {
  const [phones, setPhones] = useState<ContactPhone[]>([]);
  const [emails, setEmails] = useState<ContactEmail[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [regionalPayments, setRegionalPayments] = useState<
    RegionalPaymentInfo[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newPhone, setNewPhone] = useState({
    number: "",
    type: "main" as const,
  });
  const [newEmail, setNewEmail] = useState({
    email: "",
    type: "general" as const,
  });
  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });

  const phonesFirestore = useFirestore({ collectionName: "contact/phones" });
  const emailsFirestore = useFirestore({ collectionName: "contact/emails" });
  const socialsFirestore = useFirestore({ collectionName: "contact/social" });
  const paymentsFirestore = useFirestore({
    collectionName: "contact/regional_payment",
  });

  useEffect(() => {
    const loadContact = async () => {
      try {
        const [phonesData, emailsData, socialsData, paymentsData] =
          await Promise.all([
            phonesFirestore.getAll(),
            emailsFirestore.getAll(),
            socialsFirestore.getAll(),
            paymentsFirestore.getAll(),
          ]);

        setPhones((phonesData as ContactPhone[]) || []);
        setEmails((emailsData as ContactEmail[]) || []);
        setSocials((socialsData as SocialLink[]) || []);
        setRegionalPayments((paymentsData as RegionalPaymentInfo[]) || []);
      } catch (error) {
        console.error("Failed to load contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const addPhone = async () => {
    if (!newPhone.number) return;
    try {
      await phonesFirestore.create(newPhone);
      const updated = await phonesFirestore.getAll();
      setPhones((updated as ContactPhone[]) || []);
      setNewPhone({ number: "", type: "main" });
    } catch (error) {
      console.error("Failed to add phone:", error);
    }
  };

  const addEmail = async () => {
    if (!newEmail.email) return;
    try {
      await emailsFirestore.create(newEmail);
      const updated = await emailsFirestore.getAll();
      setEmails((updated as ContactEmail[]) || []);
      setNewEmail({ email: "", type: "general" });
    } catch (error) {
      console.error("Failed to add email:", error);
    }
  };

  const addSocial = async () => {
    if (!newSocial.platform || !newSocial.url) return;
    try {
      await socialsFirestore.create(newSocial);
      const updated = await socialsFirestore.getAll();
      setSocials((updated as SocialLink[]) || []);
      setNewSocial({ platform: "", url: "" });
    } catch (error) {
      console.error("Failed to add social link:", error);
    }
  };

  const deletePhone = async (id: string) => {
    try {
      await phonesFirestore.remove(id);
      setPhones(phones.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete phone:", error);
    }
  };

  const deleteEmail = async (id: string) => {
    try {
      await emailsFirestore.remove(id);
      setEmails(emails.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Failed to delete email:", error);
    }
  };

  const deleteSocial = async (id: string) => {
    try {
      await socialsFirestore.remove(id);
      setSocials(socials.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete social link:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Information"
        description="Manage your business contact details"
      />

      {/* Phone Numbers */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
          Phone Numbers
        </h3>
        <div className="space-y-4">
          {phones.map((phone) => (
            <div
              key={phone.id}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {phone.number}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {phone.type}
                </p>
              </div>
              <button
                onClick={() => deletePhone(phone.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Add New Phone */}
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="+1-XXX-XXX-XXXX"
              value={newPhone.number}
              onChange={(e) =>
                setNewPhone((prev) => ({ ...prev, number: e.target.value }))
              }
            />
            <select
              value={newPhone.type}
              onChange={(e) =>
                setNewPhone((prev) => ({
                  ...prev,
                  type: e.target.value as any,
                }))
              }
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="main">Main</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="support">Support</option>
            </select>
            <Button onClick={addPhone} className="gap-1">
              <Plus size={16} />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Email Addresses */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
          Email Addresses
        </h3>
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {email.email}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {email.type}
                </p>
              </div>
              <button
                onClick={() => deleteEmail(email.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Add New Email */}
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="email@landmark.com"
              type="email"
              value={newEmail.email}
              onChange={(e) =>
                setNewEmail((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <select
              value={newEmail.type}
              onChange={(e) =>
                setNewEmail((prev) => ({
                  ...prev,
                  type: e.target.value as any,
                }))
              }
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="general">General</option>
              <option value="support">Support</option>
              <option value="billing">Billing</option>
              <option value="partnerships">Partnerships</option>
            </select>
            <Button onClick={addEmail} className="gap-1">
              <Plus size={16} />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
          Social Media Links
        </h3>
        <div className="space-y-4">
          {socials.map((social) => (
            <div
              key={social.id}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {social.platform}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                  {social.url}
                </p>
              </div>
              <button
                onClick={() => deleteSocial(social.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Add New Social */}
          <div className="space-y-2 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="youtube, linkedin, facebook..."
                value={newSocial.platform}
                onChange={(e) =>
                  setNewSocial((prev) => ({
                    ...prev,
                    platform: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={newSocial.url}
                onChange={(e) =>
                  setNewSocial((prev) => ({ ...prev, url: e.target.value }))
                }
              />
              <Button onClick={addSocial} className="gap-1">
                <Plus size={16} />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
